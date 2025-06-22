const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/orders
// @desc    Get all orders (for admin/staff) or user orders (for regular users)
// @access  Private
router.get('/', auth(), async (req, res) => {
    try {
        const { status, search, sort, limit = 10, page = 1 } = req.query;
        const skip = (page - 1) * limit;

        // Build filter object
        let filter = {};

        // Regular users can only see their own orders
        if (req.user.role === 'user') {
            filter.user = req.user.id;
        }

        // Filter by status if provided
        if (status) filter.status = status;

        // Search by tracking number or order ID
        if (search) {
            if (search.match(/^[0-9a-fA-F]{24}$/)) {
                // If search is a valid MongoDB ObjectId, search by ID
                filter = { ...filter, _id: search };
            } else {
                // Otherwise search by tracking number
                filter = { ...filter, trackingNumber: { $regex: search, $options: 'i' } };
            }
        }

        // Build sort object
        let sortOption = {};
        if (sort === 'newest') sortOption = { createdAt: -1 };
        else if (sort === 'oldest') sortOption = { createdAt: 1 };
        else sortOption = { createdAt: -1 }; // Default sort

        // Get orders with pagination and populate user and product details
        const orders = await Order.find(filter)
            .populate('user', 'username email')
            .populate('products.product', 'name imageUrl price')
            .sort(sortOption)
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const total = await Order.countDocuments(filter);

        res.json({
            orders,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth(), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'username email')
            .populate('products.product', 'name imageUrl price description');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Regular users can only see their own orders
        if (req.user.role === 'user' && order.user._id.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth(), async (req, res) => {
    try {
        const { products, shippingAddress, paymentMethod } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'Products are required' });
        }

        // Validate products and calculate total
        const orderProducts = [];
        let totalAmount = 0;

        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }

            // Add product to order
            orderProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            totalAmount += product.price * item.quantity;

            // Update product stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Calculate shipping fee (example: $5 flat fee)
        const shippingFee = 5;

        // Create new order
        const newOrder = new Order({
            user: req.user.id,
            products: orderProducts,
            totalAmount: totalAmount + shippingFee,
            shippingAddress,
            paymentMethod,
            shippingFee
        });

        const order = await newOrder.save();

        // Populate product details for response
        await order.populate('products.product', 'name imageUrl');

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin/Staff
router.put('/:id/status', auth(['admin', 'staff', 'staff_warehouse', 'staff_shipping']), async (req, res) => {
    try {
        const { status, trackingNumber, notes } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        // Validate status based on role
        const validStatuses = {
            admin: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            staff: ['pending', 'processing', 'shipped', 'delivered'],
            staff_warehouse: ['processing'],
            staff_shipping: ['shipped', 'delivered']
        };

        const userRole = req.user.role === 'admin' ? 'admin' :
            req.user.role === 'staff' ? 'staff' :
                req.user.role;

        if (!validStatuses[userRole].includes(status)) {
            return res.status(403).json({ message: `You are not authorized to set order status to ${status}` });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update order fields
        order.status = status;
        if (trackingNumber) order.trackingNumber = trackingNumber;
        if (notes) order.notes = notes;

        // If order is cancelled, restock the products
        if (status === 'cancelled' && order.status !== 'cancelled') {
            for (const item of order.products) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock += item.quantity;
                    await product.save();
                }
            }
        }

        await order.save();

        res.json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/orders/:id/payment
// @desc    Update payment status
// @access  Private/Admin
router.put('/:id/payment', auth(['admin']), async (req, res) => {
    try {
        const { paymentStatus } = req.body;

        if (!paymentStatus) {
            return res.status(400).json({ message: 'Payment status is required' });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.paymentStatus = paymentStatus;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error('Error updating payment status:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/orders/user/stats
// @desc    Get order statistics for a user
// @access  Private
router.get('/user/stats', auth(), async (req, res) => {
    try {
        const userId = req.user.id;

        // Get total number of orders by status
        const orderStats = await Order.aggregate([
            { $match: { user: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        // Format results
        const stats = {
            total: 0,
            pending: 0,
            processing: 0,
            shipped: 0,
            delivered: 0,
            cancelled: 0
        };

        orderStats.forEach(stat => {
            stats[stat._id] = stat.count;
            stats.total += stat.count;
        });

        res.json(stats);
    } catch (error) {
        console.error('Error getting order statistics:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
