import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface Order {
    id: string;
    customerName: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
}

const OrdersList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Simulate API call to fetch orders
        setTimeout(() => {
            const mockOrders: Order[] = [
                { id: 'ORD-1001', customerName: 'John Smith', date: '2023-06-15', status: 'pending', total: 89.97, items: 3 },
                { id: 'ORD-1002', customerName: 'Sarah Johnson', date: '2023-06-14', status: 'processing', total: 124.95, items: 2 },
                { id: 'ORD-1003', customerName: 'Michael Brown', date: '2023-06-13', status: 'shipped', total: 59.99, items: 1 },
                { id: 'ORD-1004', customerName: 'Emily Davis', date: '2023-06-12', status: 'delivered', total: 149.98, items: 4 },
                { id: 'ORD-1005', customerName: 'David Wilson', date: '2023-06-11', status: 'cancelled', total: 34.99, items: 1 },
                { id: 'ORD-1006', customerName: 'Jessica Taylor', date: '2023-06-10', status: 'pending', total: 74.97, items: 2 },
                { id: 'ORD-1007', customerName: 'Robert Martin', date: '2023-06-09', status: 'processing', total: 199.95, items: 3 },
                { id: 'ORD-1008', customerName: 'Lisa Anderson', date: '2023-06-08', status: 'shipped', total: 64.99, items: 1 },
            ];

            setOrders(mockOrders);
            setLoading(false);
        }, 500);
    }, []);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const getStatusClass = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    };

    const filteredOrders = orders
        .filter(order => statusFilter === 'all' || order.status === statusFilter)
        .filter(order =>
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (loading) {
        return <div className="loading">Loading orders...</div>;
    }

    return (
        <div className="staff-page">
            <div className="staff-header">
                <h1>Orders List</h1>
                <div className="header-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by order ID or customer name"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                    <div className="filter-box">
                        <select
                            value={statusFilter}
                            onChange={handleStatusChange}
                            className="status-filter"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="no-orders">
                    <p>No orders match your current filters.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>{order.items}</td>
                                    <td>${order.total.toFixed(2)}</td>
                                    <td className="actions">
                                        <Link to={`/staff/orders/${order.id}`} className="btn-view">View Details</Link>
                                        <Link to={`/staff/orders/update/${order.id}`} className="btn-edit">Update Status</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="pagination">
                <button disabled className="page-btn">Previous</button>
                <span className="page-indicator">Page 1 of 3</span>
                <button className="page-btn">Next</button>
            </div>
        </div>
    );
};

export default OrdersList;
