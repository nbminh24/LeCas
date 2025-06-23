import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderDetail.css';
import '../../../styles/modern-ecommerce.css';

// Define the Order type based on our backend model
interface OrderItem {
    product: {
        id: string;
        name: string;
        imageUrl: string;
    };
    price: number;
    quantity: number;
}

interface Order {
    _id: string;
    orderNumber: string;
    createdAt: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    totalAmount: number;
    products: OrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    trackingNumber?: string;
    shippingFee: number;
    notes?: string;
}

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching order details from API
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                // This would be replaced with an actual API call
                // const response = await api.get(`/orders/${id}`);
                // setOrder(response.data);

                // Mock data for demonstration based on our backend model
                setTimeout(() => {
                    const mockOrder: Order = {
                        _id: id || '1',
                        orderNumber: `ORD-${id?.substring(0, 8)}`,
                        createdAt: new Date().toISOString(),
                        status: 'processing',
                        totalAmount: 289.97,
                        products: [
                            {
                                product: {
                                    id: 'p1',
                                    name: 'Elegant Black Coat',
                                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Coat'
                                },
                                price: 75.00,
                                quantity: 1
                            },
                            {
                                product: {
                                    id: 'p2',
                                    name: 'Modern Black Dress',
                                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Dress'
                                },
                                price: 90.00,
                                quantity: 1
                            },
                            {
                                product: {
                                    id: 'p3',
                                    name: 'Premium White Shirt',
                                    imageUrl: 'https://via.placeholder.com/500x700?text=White+Shirt'
                                },
                                price: 70.00,
                                quantity: 1
                            },
                            {
                                product: {
                                    id: 'p4',
                                    name: 'Black Leather Jacket',
                                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Leather+Jacket'
                                },
                                price: 54.97,
                                quantity: 1
                            }
                        ],
                        shippingAddress: {
                            street: '123 Elegant Street',
                            city: 'Fashion City',
                            state: 'FC',
                            zipCode: '90210',
                            country: 'United States'
                        },
                        paymentMethod: 'credit_card',
                        paymentStatus: 'paid',
                        trackingNumber: 'TRK' + Math.floor(Math.random() * 10000000),
                        shippingFee: 0
                    };

                    setOrder(mockOrder);
                    setLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching order details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchOrderDetails();
        }
    }, [id]);

    // Function to format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Function to get status badge class
    const getStatusBadgeClass = (status: Order['status']): string => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    // Function to format payment method display
    const formatPaymentMethod = (method: string): string => {
        switch (method) {
            case 'credit_card': return 'Credit Card';
            case 'paypal': return 'PayPal';
            case 'bank_transfer': return 'Bank Transfer';
            default: return method;
        }
    };

    // Function to get estimated delivery date
    const getEstimatedDelivery = (status: Order['status'], createdAt: string): string => {
        const orderDate = new Date(createdAt);

        // Add days based on status
        switch (status) {
            case 'pending':
                orderDate.setDate(orderDate.getDate() + 7);
                break;
            case 'processing':
                orderDate.setDate(orderDate.getDate() + 5);
                break;
            case 'shipped':
                orderDate.setDate(orderDate.getDate() + 3);
                break;
            case 'delivered':
                return 'Delivered';
            case 'cancelled':
                return 'Cancelled';
        }

        return formatDate(orderDate.toISOString());
    };

    if (loading) {
        return <div className="order-loading">Loading order details...</div>;
    }

    if (!order) {
        return (
            <div className="order-not-found">
                <h2>Order Not Found</h2>
                <p>We couldn't find the order you're looking for. Please check your order number and try again.</p>
                <Link to="/orders" className="btn-outline">Back to Orders</Link>
            </div>
        );
    }

    // Calculate subtotal (total - shipping)
    const subtotal = order.totalAmount - order.shippingFee;
    // Assuming tax is 10% of subtotal for demonstration purposes
    const tax = subtotal * 0.1;

    return (
        <div className="order-detail-container">
            <div className="order-detail-header">
                <div className="order-title">
                    <h1>Order #{order.orderNumber}</h1>
                    <p>Placed on {formatDate(order.createdAt)}</p>
                </div>
                <Link to="/orders" className="btn-outline">Back to Orders</Link>
            </div>

            <div className="order-status-panel">
                <div className="status-section">
                    <div className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </div>
                    <div className="status-info">
                        <div className="status-detail">
                            <span>Payment Status</span>
                            <span className={`payment-status ${order.paymentStatus}`}>
                                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </span>
                        </div>
                        <div className="status-detail">
                            <span>Estimated Delivery</span>
                            <span>{getEstimatedDelivery(order.status, order.createdAt)}</span>
                        </div>
                        {order.trackingNumber && (order.status === 'shipped' || order.status === 'delivered') && (
                            <div className="status-detail">
                                <span>Tracking Number</span>
                                <span className="tracking-number">{order.trackingNumber}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="order-timeline">
                    <div className={`timeline-step ${order.status !== 'cancelled' ? 'completed' : 'cancelled'}`}>
                        <div className="step-marker"></div>
                        <div className="step-label">Order Placed</div>
                    </div>
                    <div className={`timeline-step ${order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? 'completed' : (order.status === 'cancelled' ? 'cancelled' : '')}`}>
                        <div className="step-marker"></div>
                        <div className="step-label">Processing</div>
                    </div>
                    <div className={`timeline-step ${order.status === 'shipped' || order.status === 'delivered' ? 'completed' : (order.status === 'cancelled' ? 'cancelled' : '')}`}>
                        <div className="step-marker"></div>
                        <div className="step-label">Shipped</div>
                    </div>
                    <div className={`timeline-step ${order.status === 'delivered' ? 'completed' : (order.status === 'cancelled' ? 'cancelled' : '')}`}>
                        <div className="step-marker"></div>
                        <div className="step-label">Delivered</div>
                    </div>
                </div>
            </div>

            <div className="order-content">
                <div className="order-details">
                    <div className="order-items">
                        <h2>Order Items</h2>
                        <div className="items-list">
                            {order.products.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="item-image">
                                        <img src={item.product.imageUrl} alt={item.product.name} />
                                    </div>
                                    <div className="item-details">
                                        <h3>{item.product.name}</h3>
                                        <div className="item-meta">
                                            <span className="item-price">${item.price.toFixed(2)}</span>
                                            <span className="item-quantity">Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-info-panels">
                        <div className="info-panel">
                            <h2>Shipping Address</h2>
                            <div className="address-info">
                                <p>{order.shippingAddress.street}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </div>
                        </div>

                        <div className="info-panel">
                            <h2>Payment Method</h2>
                            <div className="payment-info">
                                <p>{formatPaymentMethod(order.paymentMethod)}</p>
                                {order.paymentStatus === 'paid' && (
                                    <span className="payment-badge paid">Paid</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="summary-details">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{order.shippingFee > 0 ? `$${order.shippingFee.toFixed(2)}` : 'Free'}</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-actions">
                {(order.status === 'pending' || order.status === 'processing') && (
                    <button className="btn-danger">Cancel Order</button>
                )}
                <button className="btn-secondary">Contact Support</button>
                {order.status === 'delivered' && (
                    <button className="btn-primary">Write a Review</button>
                )}
                {(order.status === 'shipped' || order.status === 'delivered') && (
                    <button className="btn-primary">Track Shipment</button>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
