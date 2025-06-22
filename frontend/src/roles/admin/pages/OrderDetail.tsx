import React from 'react';
import { useParams } from 'react-router-dom';
import './OrderDetail.css';

// Mock order data
const mockOrder = {
    id: 'order123',
    customer: {
        id: 'cust456',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567'
    },
    orderDate: '2025-06-18T14:30:00Z',
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'credit_card',
    shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
    },
    items: [
        {
            id: 'item1',
            productId: 'prod1',
            name: 'Wireless Headphones',
            sku: 'WH-123',
            price: 129.99,
            quantity: 1,
            subtotal: 129.99,
            imageUrl: 'https://placehold.co/600x400?text=Headphones'
        },
        {
            id: 'item2',
            productId: 'prod2',
            name: 'Smart Watch',
            sku: 'SW-456',
            price: 249.99,
            quantity: 1,
            subtotal: 249.99,
            imageUrl: 'https://placehold.co/600x400?text=Smart+Watch'
        }
    ],
    subtotal: 379.98,
    shippingFee: 10.00,
    tax: 30.40,
    totalAmount: 420.38,
    notes: 'Customer requested gift wrapping',
    trackingNumber: 'TRK789012345',
    history: [
        {
            date: '2025-06-18T14:30:00Z',
            status: 'pending',
            description: 'Order placed'
        },
        {
            date: '2025-06-18T14:35:00Z',
            status: 'processing',
            description: 'Payment received'
        },
        {
            date: '2025-06-18T15:20:00Z',
            status: 'processing',
            description: 'Order processing started'
        }
    ]
};

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const order = mockOrder; // In a real app, fetch based on ID

    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleString();
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'processing': return 'Processing';
            case 'shipped': return 'Shipped';
            case 'delivered': return 'Delivered';
            case 'cancelled': return 'Cancelled';
            default: return status;
        }
    };

    const getStatusClass = (status: string): string => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    return (
        <div className="order-detail-container">
            <div className="order-header">
                <h1>Order #{order.id}</h1>
                <div className="order-meta">
                    <span className="order-date">Placed on {formatDate(order.orderDate)}</span>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                        {getStatusLabel(order.status)}
                    </span>
                </div>
            </div>

            <div className="order-sections">
                <div className="order-section">
                    <h2>Customer Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{order.customer.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{order.customer.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone:</span>
                            <span className="info-value">{order.customer.phone}</span>
                        </div>
                    </div>
                </div>

                <div className="order-section">
                    <h2>Shipping Address</h2>
                    <div className="address-block">
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                        <p>{order.shippingAddress.country}</p>
                    </div>
                </div>

                <div className="order-section">
                    <h2>Payment Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Payment Method:</span>
                            <span className="info-value">
                                {order.paymentMethod === 'credit_card' ? 'Credit Card' :
                                    order.paymentMethod === 'paypal' ? 'PayPal' :
                                        order.paymentMethod}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Payment Status:</span>
                            <span className={`info-value payment-status-${order.paymentStatus}`}>
                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="order-section">
                    <h2>Order Items</h2>
                    <div className="order-items">
                        {order.items.map(item => (
                            <div key={item.id} className="order-item">
                                <div className="item-image">
                                    <img src={item.imageUrl} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-sku">SKU: {item.sku}</p>
                                    <div className="item-price-qty">
                                        <span>{formatCurrency(item.price)} × {item.quantity}</span>
                                    </div>
                                </div>
                                <div className="item-subtotal">
                                    <span>{formatCurrency(item.subtotal)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-section">
                    <h2>Order Summary</h2>
                    <div className="order-summary">
                        <div className="summary-item">
                            <span>Subtotal</span>
                            <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        <div className="summary-item">
                            <span>Shipping</span>
                            <span>{formatCurrency(order.shippingFee)}</span>
                        </div>
                        <div className="summary-item">
                            <span>Tax</span>
                            <span>{formatCurrency(order.tax)}</span>
                        </div>
                        <div className="summary-item total">
                            <span>Total</span>
                            <span>{formatCurrency(order.totalAmount)}</span>
                        </div>
                    </div>
                </div>

                {order.trackingNumber && (
                    <div className="order-section">
                        <h2>Shipping Information</h2>
                        <div className="tracking-info">
                            <div className="info-item">
                                <span className="info-label">Tracking Number:</span>
                                <span className="info-value highlight">{order.trackingNumber}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="order-section">
                    <h2>Order History</h2>
                    <div className="order-timeline">
                        {order.history.map((event, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">{formatDate(event.date)}</div>
                                    <div className={`timeline-status ${getStatusClass(event.status)}`}>
                                        {getStatusLabel(event.status)}
                                    </div>
                                    <div className="timeline-description">{event.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {order.notes && (
                    <div className="order-section">
                        <h2>Notes</h2>
                        <div className="notes-block">
                            <p>{order.notes}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="order-actions">
                <button className="action-button primary">Update Status</button>
                <button className="action-button secondary">Print Invoice</button>
                <button className="action-button">Contact Customer</button>
            </div>
        </div>
    );
};

export default OrderDetail;
