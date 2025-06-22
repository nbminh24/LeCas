import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Dashboard.css';

interface OrderItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    total: number;
    imageUrl: string;
}

interface OrderDetail {
    id: string;
    customerName: string;
    customerEmail: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    paymentMethod: string;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
    notes: string;
    tracking?: string;
}

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState<string>('');
    const [trackingNumber, setTrackingNumber] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    useEffect(() => {
        // Simulate API call to fetch order details
        setTimeout(() => {
            const mockOrder: OrderDetail = {
                id: id || 'ORD-1001',
                customerName: 'John Smith',
                customerEmail: 'johnsmith@example.com',
                date: '2023-06-15T14:30:00',
                status: 'processing',
                shippingAddress: {
                    street: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    zip: '90210',
                    country: 'USA'
                },
                paymentMethod: 'Credit Card (VISA ****1234)',
                items: [
                    {
                        id: 'ITEM-001',
                        productName: 'Classic T-Shirt',
                        price: 19.99,
                        quantity: 2,
                        total: 39.98,
                        imageUrl: 'https://via.placeholder.com/80'
                    },
                    {
                        id: 'ITEM-002',
                        productName: 'Slim Fit Jeans',
                        price: 49.99,
                        quantity: 1,
                        total: 49.99,
                        imageUrl: 'https://via.placeholder.com/80'
                    }
                ],
                subtotal: 89.97,
                tax: 7.20,
                shipping: 5.99,
                total: 103.16,
                notes: 'Customer requested gift wrapping',
                tracking: 'TRK123456789US'
            };

            setOrder(mockOrder);
            setNewStatus(mockOrder.status);
            setTrackingNumber(mockOrder.tracking || '');
            setNotes(mockOrder.notes);
            setLoading(false);
        }, 500);
    }, [id]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewStatus(e.target.value);
    };

    const handleTrackingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingNumber(e.target.value);
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const handleUpdateOrder = () => {
        // Simulate API call to update order
        console.log('Updating order with:', {
            id,
            status: newStatus,
            tracking: trackingNumber,
            notes
        });

        // In a real application, you would make an API call here
        // and then update the local state after success
        if (order) {
            setOrder({
                ...order,
                status: newStatus as any,
                tracking: trackingNumber,
                notes
            });
        }
    };

    const getStatusClass = (status: OrderDetail['status']) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    if (loading) {
        return <div className="loading">Loading order details...</div>;
    }

    if (!order) {
        return <div className="error">Order not found</div>;
    }

    return (
        <div className="staff-page">
            <div className="staff-header">
                <h1>Order Details: {order.id}</h1>
                <div className="header-actions">
                    <Link to="/staff/orders" className="btn-secondary">Back to Orders</Link>
                    <button className="btn-print" onClick={() => window.print()}>Print Order</button>
                </div>
            </div>

            <div className="order-detail-container">
                <div className="order-section order-info">
                    <div className="order-meta">
                        <div className="meta-group">
                            <h3>Order Information</h3>
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                            <p>
                                <strong>Status:</strong>
                                <span className={`status-badge ${getStatusClass(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </p>
                            {order.tracking && (
                                <p><strong>Tracking:</strong> {order.tracking}</p>
                            )}
                        </div>

                        <div className="meta-group">
                            <h3>Customer Information</h3>
                            <p><strong>Name:</strong> {order.customerName}</p>
                            <p><strong>Email:</strong> {order.customerEmail}</p>
                        </div>
                    </div>

                    <div className="address-payment">
                        <div className="meta-group">
                            <h3>Shipping Address</h3>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>

                        <div className="meta-group">
                            <h3>Payment Method</h3>
                            <p>{order.paymentMethod}</p>
                        </div>
                    </div>
                </div>

                <div className="order-section order-items">
                    <h3>Order Items</h3>
                    <table className="items-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map(item => (
                                <tr key={item.id}>
                                    <td className="product-cell">
                                        <img src={item.imageUrl} alt={item.productName} className="product-thumbnail" />
                                        <span className="product-name">{item.productName}</span>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>${order.shipping.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="order-section order-update">
                    <h3>Update Order</h3>
                    <div className="update-form">
                        <div className="form-group">
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                value={newStatus}
                                onChange={handleStatusChange}
                                className="status-select"
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tracking">Tracking Number:</label>
                            <input
                                type="text"
                                id="tracking"
                                value={trackingNumber}
                                onChange={handleTrackingChange}
                                placeholder="Enter tracking number"
                                className="tracking-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Notes:</label>
                            <textarea
                                id="notes"
                                value={notes}
                                onChange={handleNotesChange}
                                rows={3}
                                placeholder="Add notes about this order"
                                className="notes-input"
                            />
                        </div>

                        <button
                            onClick={handleUpdateOrder}
                            className="btn-primary update-btn"
                        >
                            Update Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
