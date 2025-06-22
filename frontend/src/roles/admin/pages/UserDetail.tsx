import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetail.css';

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'staff' | 'user';
    status: 'active' | 'inactive' | 'suspended';
    lastLogin: string;
    dateJoined: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    phone?: string;
    avatar?: string;
    orders?: {
        count: number;
        recent: Array<{
            id: string;
            orderNumber: string;
            date: string;
            total: number;
            status: string;
        }>;
    };
}

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching user data from API
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                // This would be replaced with an actual API call
                // const response = await api.get(`/users/${id}`);
                // setUser(response.data);

                // Mock data for demonstration
                setTimeout(() => {
                    const mockUser: User = {
                        id: id || '1',
                        username: 'customer1',
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'johndoe@example.com',
                        role: 'user',
                        status: 'active',
                        lastLogin: '2023-12-02T16:10:00Z',
                        dateJoined: '2023-06-18T00:00:00Z',
                        address: {
                            street: '123 Main Street',
                            city: 'Anytown',
                            state: 'CA',
                            zipCode: '90210',
                            country: 'USA'
                        },
                        phone: '(555) 123-4567',
                        avatar: 'https://via.placeholder.com/150',
                        orders: {
                            count: 5,
                            recent: [
                                {
                                    id: 'ord1',
                                    orderNumber: 'ORD-2023-001',
                                    date: '2023-11-28T10:30:00Z',
                                    total: 134.99,
                                    status: 'delivered'
                                },
                                {
                                    id: 'ord2',
                                    orderNumber: 'ORD-2023-002',
                                    date: '2023-10-15T14:45:00Z',
                                    total: 79.99,
                                    status: 'delivered'
                                },
                                {
                                    id: 'ord3',
                                    orderNumber: 'ORD-2023-003',
                                    date: '2023-12-01T09:20:00Z',
                                    total: 249.99,
                                    status: 'processing'
                                }
                            ]
                        }
                    };

                    setUser(mockUser);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchUserDetails();
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
    const getStatusBadgeClass = (status: User['status']): string => {
        switch (status) {
            case 'active': return 'status-active';
            case 'inactive': return 'status-inactive';
            case 'suspended': return 'status-suspended';
            default: return '';
        }
    };

    // Function to get order status badge class
    const getOrderStatusBadgeClass = (status: string): string => {
        switch (status) {
            case 'pending': return 'order-status-pending';
            case 'processing': return 'order-status-processing';
            case 'shipped': return 'order-status-shipped';
            case 'delivered': return 'order-status-delivered';
            case 'cancelled': return 'order-status-cancelled';
            default: return '';
        }
    };

    if (loading) {
        return <div className="user-detail-loading">Loading user details...</div>;
    }

    if (!user) {
        return (
            <div className="user-detail-error">
                <h2>User Not Found</h2>
                <p>The user you're looking for could not be found.</p>
                <Link to="/admin/users" className="back-link">Back to Users</Link>
            </div>
        );
    }

    return (
        <div className="user-detail-container">
            <div className="user-detail-header">
                <div className="header-content">
                    <h1>User Profile</h1>
                    <div className="user-actions">
                        <Link to={`/admin/users/${id}/edit`} className="edit-user-btn">
                            Edit User
                        </Link>
                        <button className="suspend-user-btn">
                            {user.status === 'suspended' ? 'Reactivate User' : 'Suspend User'}
                        </button>
                    </div>
                </div>
                <Link to="/admin/users" className="back-link">Back to Users</Link>
            </div>

            <div className="user-detail-grid">
                <div className="user-profile-section">
                    <div className="user-profile-card">
                        <div className="user-avatar">
                            <img src={user.avatar || 'https://via.placeholder.com/150'} alt={user.username} />
                        </div>

                        <div className="user-basic-info">
                            <h2>{user.firstName} {user.lastName}</h2>
                            <p className="username">@{user.username}</p>

                            <div className="user-status">
                                <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                </span>
                                <span className="role-badge">
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                            </div>
                        </div>

                        <div className="user-contact-info">
                            <div className="info-group">
                                <h3>Contact Information</h3>
                                <div className="info-row">
                                    <span className="info-label">Email:</span>
                                    <span className="info-value">{user.email}</span>
                                </div>
                                {user.phone && (
                                    <div className="info-row">
                                        <span className="info-label">Phone:</span>
                                        <span className="info-value">{user.phone}</span>
                                    </div>
                                )}
                            </div>

                            {user.address && (
                                <div className="info-group">
                                    <h3>Address</h3>
                                    <p className="address-line">{user.address.street}</p>
                                    <p className="address-line">{user.address.city}, {user.address.state} {user.address.zipCode}</p>
                                    <p className="address-line">{user.address.country}</p>
                                </div>
                            )}

                            <div className="info-group">
                                <h3>Account Information</h3>
                                <div className="info-row">
                                    <span className="info-label">Joined:</span>
                                    <span className="info-value">{formatDate(user.dateJoined)}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Last Login:</span>
                                    <span className="info-value">{formatDate(user.lastLogin)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="user-activity-section">
                    {user.orders && (
                        <div className="user-orders-card">
                            <div className="orders-header">
                                <h3>Order History</h3>
                                <span className="orders-count">{user.orders.count} orders</span>
                            </div>

                            {user.orders.recent.length > 0 ? (
                                <div className="recent-orders">
                                    {user.orders.recent.map(order => (
                                        <div key={order.id} className="order-item">
                                            <div className="order-details">
                                                <h4>Order #{order.orderNumber}</h4>
                                                <p className="order-date">{formatDate(order.date)}</p>
                                            </div>
                                            <div className="order-info">
                                                <span className={`order-status ${getOrderStatusBadgeClass(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                                <span className="order-total">${order.total.toFixed(2)}</span>
                                            </div>
                                            <Link to={`/admin/orders/${order.id}`} className="view-order-btn">
                                                View Order
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="no-orders">This user has no orders yet.</p>
                            )}

                            {user.orders.count > user.orders.recent.length && (
                                <div className="view-all-container">
                                    <Link to={`/admin/users/${user.id}/orders`} className="view-all-btn">
                                        View All Orders
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="admin-notes-card">
                        <h3>Admin Notes</h3>
                        <textarea
                            className="admin-notes-textarea"
                            placeholder="Add notes about this user (only visible to admins)"
                            rows={4}
                        ></textarea>
                        <button className="save-notes-btn">Save Notes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
