import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrdersList.css';

// Define the Order type
interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
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
}

const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching orders from API
        const fetchOrders = async () => {
            setLoading(true);
            try {
                // This would be replaced with an actual API call
                // const response = await api.get('/orders');
                // setOrders(response.data);

                // Mock data for demonstration
                setTimeout(() => {
                    const mockOrders: Order[] = [
                        {
                            _id: '1',
                            orderNumber: 'ORD-2023-001',
                            date: '2023-11-15T10:30:00Z',
                            status: 'delivered',
                            total: 134.99,
                            items: [
                                { productId: 'p1', name: 'Wireless Headphones', price: 79.99, quantity: 1 },
                                { productId: 'p2', name: 'Phone Case', price: 24.99, quantity: 1 },
                                { productId: 'p3', name: 'USB-C Cable', price: 14.99, quantity: 2 }
                            ],
                            shippingAddress: {
                                street: '123 Main St',
                                city: 'Anytown',
                                state: 'CA',
                                zipCode: '90210',
                                country: 'USA'
                            }
                        },
                        {
                            _id: '2',
                            orderNumber: 'ORD-2023-002',
                            date: '2023-11-20T15:45:00Z',
                            status: 'processing',
                            total: 249.98,
                            items: [
                                { productId: 'p4', name: 'Smart Watch', price: 199.99, quantity: 1 },
                                { productId: 'p5', name: 'Watch Band', price: 49.99, quantity: 1 }
                            ],
                            shippingAddress: {
                                street: '456 Oak Ave',
                                city: 'Somewhere',
                                state: 'NY',
                                zipCode: '10001',
                                country: 'USA'
                            }
                        },
                        {
                            _id: '3',
                            orderNumber: 'ORD-2023-003',
                            date: '2023-12-05T09:15:00Z',
                            status: 'shipped',
                            total: 599.99,
                            items: [
                                { productId: 'p6', name: 'Laptop', price: 599.99, quantity: 1 }
                            ],
                            shippingAddress: {
                                street: '789 Pine Blvd',
                                city: 'Elsewhere',
                                state: 'TX',
                                zipCode: '75001',
                                country: 'USA'
                            }
                        }
                    ];

                    setOrders(mockOrders);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Function to format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
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

    return (
        <div className="orders-container">
            <h1>My Orders</h1>

            {loading ? (
                <div className="loading-indicator">Loading orders...</div>
            ) : orders.length === 0 ? (
                <div className="no-orders">
                    <p>You haven't placed any orders yet.</p>
                    <Link to="/user/products" className="shop-now-btn">Shop Now</Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <div>
                                    <h3>Order #{order.orderNumber}</h3>
                                    <p className="order-date">{formatDate(order.date)}</p>
                                </div>
                                <div className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.slice(0, 2).map((item, index) => (
                                    <div key={index} className="order-item">
                                        <p className="item-name">{item.name}</p>
                                        <p className="item-details">
                                            ${item.price.toFixed(2)} × {item.quantity}
                                        </p>
                                    </div>
                                ))}
                                {order.items.length > 2 && (
                                    <p className="more-items">+{order.items.length - 2} more items</p>
                                )}
                            </div>

                            <div className="order-footer">
                                <p className="order-total">Total: <span>${order.total.toFixed(2)}</span></p>
                                <Link to={`/user/orders/${order._id}`} className="view-order-btn">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
