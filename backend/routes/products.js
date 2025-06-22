const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search, sort, limit = 10, page = 1 } = req.query;
        const skip = (page - 1) * limit;

        // Build filter object
        const filter = { isActive: true };
        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: 'i' };

        // Build sort object
        let sortOption = {};
        if (sort === 'price_asc') sortOption = { price: 1 };
        else if (sort === 'price_desc') sortOption = { price: -1 };
        else if (sort === 'newest') sortOption = { createdAt: -1 };
        else if (sort === 'rating') sortOption = { averageRating: -1 };
        else sortOption = { createdAt: -1 }; // Default sort

        // Get products with pagination
        const products = await Product.find(filter)
            .sort(sortOption)
            .limit(parseInt(limit))
            .skip(skip);

        // Get total count for pagination
        const total = await Product.countDocuments(filter);

        res.json({
            products,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', auth(['admin']), async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock, sku } = req.body;

        // Check if product with same SKU exists
        const existingProduct = await Product.findOne({ sku });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this SKU already exists' });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            sku
        });

        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', auth(['admin']), async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, stock, sku, isActive } = req.body;

        // Build product object
        const productFields = {};
        if (name) productFields.name = name;
        if (description) productFields.description = description;
        if (price) productFields.price = price;
        if (category) productFields.category = category;
        if (imageUrl) productFields.imageUrl = imageUrl;
        if (stock !== undefined) productFields.stock = stock;
        if (sku) productFields.sku = sku;
        if (isActive !== undefined) productFields.isActive = isActive;

        // Update product
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If SKU is being changed, make sure it's unique
        if (sku && sku !== product.sku) {
            const existingProduct = await Product.findOne({ sku });
            if (existingProduct) {
                return res.status(400).json({ message: 'Product with this SKU already exists' });
            }
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: productFields },
            { new: true }
        );

        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', auth(['admin']), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: 'Product removed' });
    } catch (error) {
        console.error('Error deleting product:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/products/:id/ratings
// @desc    Add a rating to a product
// @access  Private
router.post('/:id/ratings', auth(), async (req, res) => {
    try {
        const { rating, review } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: 'Rating must be between 1 and 5' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if user already rated this product
        const alreadyRated = product.ratings.find(
            r => r.userId.toString() === req.user.id
        );

        if (alreadyRated) {
            // Update existing rating
            product.ratings = product.ratings.map(r =>
                r.userId.toString() === req.user.id
                    ? { userId: req.user.id, rating, review, createdAt: Date.now() }
                    : r
            );
        } else {
            // Add new rating
            product.ratings.push({
                userId: req.user.id,
                rating,
                review,
                createdAt: Date.now()
            });
        }

        // Calculate average rating
        if (product.ratings.length > 0) {
            product.averageRating = product.ratings.reduce((acc, item) => acc + item.rating, 0) / product.ratings.length;
        }

        await product.save();

        res.json(product);
    } catch (error) {
        console.error('Error adding rating:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/products/:id/stock
// @desc    Update product stock
// @access  Private/Staff
router.put('/:id/stock', auth(['admin', 'staff_warehouse']), async (req, res) => {
    try {
        const { stock } = req.body;

        if (stock === undefined) {
            return res.status(400).json({ message: 'Stock value is required' });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.stock = stock;
        await product.save();

        res.json(product);
    } catch (error) {
        console.error('Error updating stock:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
