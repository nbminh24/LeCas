import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderDetail.css';

// Define the Order type
interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

interface Order {
    _id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: {
        cardType: string;
        lastFourDigits: string;
    };
    trackingNumber?: string;
    estimatedDelivery?: string;
}

// Helper function to generate tracking info based on status
const getTrackingInfo = (status: Order['status']) => {
    switch (status) {
        case 'shipped':
            return {
                trackingNumber: 'TRK12345678',
                estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
                carrier: 'FedEx'
            };
        case 'delivered':
            return {
                trackingNumber: 'TRK87654321',
                deliveredDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                carrier: 'UPS'
            };
        default:
            return null;
    }
};

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

                // Mock data for demonstration
                setTimeout(() => {
                    // Create a mock order based on the id parameter
                    const mockOrder: Order = {
                        _id: id || '1',
                        orderNumber: `ORD-2023-${id}`,
                        date: '2023-11-15T10:30:00Z',
                        status: 'shipped',
                        total: 134.99,
                        items: [
                            {
                                productId: 'p1',
                                name: 'Wireless Headphones',
                                price: 79.99,
                                quantity: 1,
                                imageUrl: 'https://via.placeholder.com/150'
                            },
                            {
                                productId: 'p2',
                                name: 'Phone Case',
                                price: 24.99,
                                quantity: 1,
                                imageUrl: 'https://via.placeholder.com/150'
                            },
                            {
                                productId: 'p3',
                                name: 'USB-C Cable',
                                price: 14.99,
                                quantity: 2,
                                imageUrl: 'https://via.placeholder.com/150'
                            }
                        ],
                        shippingAddress: {
                            street: '123 Main St',
                            city: 'Anytown',
                            state: 'CA',
                            zipCode: '90210',
                            country: 'USA'
                        },
                        paymentMethod: {
                            cardType: 'Visa',
                            lastFourDigits: '4242'
                        },
                        ...getTrackingInfo('shipped')
                    };

                    setOrder(mockOrder);
                    setLoading(false);
                }, 1000);
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

    if (loading) {
        return <div className="loading-indicator">Loading order details...</div>;
    }

    if (!order) {
        return (
            <div className="error-container">
                <h2>Order Not Found</h2>
                <p>We couldn't find the order you're looking for. Please check your order number and try again.</p>
                <Link to="/user/orders" className="back-button">Back to Orders</Link>
            </div>
        );
    }

    return (
        <div className="order-detail-container">
            <div className="order-detail-header">
                <div>
                    <h1>Order #{order.orderNumber}</h1>
                    <p className="order-date">Placed on {formatDate(order.date)}</p>
                </div>
                <Link to="/user/orders" className="back-button">Back to Orders</Link>
            </div>

            <div className="order-status-section">
                <div className={`status-badge large ${getStatusBadgeClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
                {(order.status === 'shipped' || order.status === 'delivered') && (
                    <div className="tracking-info">
                        <p>
                            <strong>Tracking Number:</strong> {order.trackingNumber}
                            {order.status === 'shipped' && (
                                <span> (Estimated delivery: {
                                    formatDate(order.estimatedDelivery || '')
                                })</span>
                            )}
                        </p>
                    </div>
                )}
            </div>

            <div className="order-sections-grid">
                <div className="order-items-section">
                    <h2>Items</h2>
                    <div className="order-items-list">
                        {order.items.map((item, index) => (
                            <div key={index} className="order-detail-item">
                                <div className="item-image">
                                    <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                    <p className="item-quantity">Quantity: {item.quantity}</p>
                                </div>
                                <div className="item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="order-info-sections">
                    <div className="order-info-section">
                        <h2>Shipping Address</h2>
                        <div className="address-info">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                    </div>

                    <div className="order-info-section">
                        <h2>Payment Information</h2>
                        <div className="payment-info">
                            <p>{order.paymentMethod.cardType} ending in {order.paymentMethod.lastFourDigits}</p>
                        </div>
                    </div>

                    <div className="order-info-section">
                        <h2>Order Summary</h2>
                        <div className="order-summary">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${(order.total * 0.9).toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${(order.total * 0.1).toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="order-actions">
                <button className="action-button secondary">Need Help?</button>
                {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <button className="action-button danger">Cancel Order</button>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
