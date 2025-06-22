import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageOrders.css';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    orderNumber: string;
    date: string;
    customerId: string;
    customerName: string;
    email: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: OrderItem[];
    paymentStatus: 'paid' | 'refunded' | 'failed';
    shippingMethod: string;
}

const ManageOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [dateFilter, setDateFilter] = useState<string>('all');

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
                            id: '1',
                            orderNumber: 'ORD-2023-001',
                            date: '2023-12-01T10:30:00Z',
                            customerId: 'cust1',
                            customerName: 'John Doe',
                            email: 'john@example.com',
                            status: 'delivered',
                            total: 134.99,
                            items: [
                                { productId: 'p1', name: 'Wireless Headphones', price: 79.99, quantity: 1 },
                                { productId: 'p2', name: 'Phone Case', price: 24.99, quantity: 1 },
                                { productId: 'p3', name: 'USB Cable', price: 14.99, quantity: 2 }
                            ],
                            paymentStatus: 'paid',
                            shippingMethod: 'Standard Shipping'
                        },
                        {
                            id: '2',
                            orderNumber: 'ORD-2023-002',
                            date: '2023-12-02T14:45:00Z',
                            customerId: 'cust2',
                            customerName: 'Jane Smith',
                            email: 'jane@example.com',
                            status: 'processing',
                            total: 249.99,
                            items: [
                                { productId: 'p4', name: 'Smart Watch', price: 199.99, quantity: 1 },
                                { productId: 'p5', name: 'Watch Band', price: 49.99, quantity: 1 }
                            ],
                            paymentStatus: 'paid',
                            shippingMethod: 'Express Shipping'
                        },
                        {
                            id: '3',
                            orderNumber: 'ORD-2023-003',
                            date: '2023-12-03T09:15:00Z',
                            customerId: 'cust3',
                            customerName: 'Bob Johnson',
                            email: 'bob@example.com',
                            status: 'pending',
                            total: 599.99,
                            items: [
                                { productId: 'p6', name: 'Laptop', price: 599.99, quantity: 1 }
                            ],
                            paymentStatus: 'paid',
                            shippingMethod: 'Standard Shipping'
                        },
                        {
                            id: '4',
                            orderNumber: 'ORD-2023-004',
                            date: '2023-11-28T11:20:00Z',
                            customerId: 'cust4',
                            customerName: 'Alice Williams',
                            email: 'alice@example.com',
                            status: 'shipped',
                            total: 89.98,
                            items: [
                                { productId: 'p7', name: 'Bluetooth Speaker', price: 69.99, quantity: 1 },
                                { productId: 'p8', name: 'Charging Cable', price: 19.99, quantity: 1 }
                            ],
                            paymentStatus: 'paid',
                            shippingMethod: 'Express Shipping'
                        },
                        {
                            id: '5',
                            orderNumber: 'ORD-2023-005',
                            date: '2023-11-25T15:30:00Z',
                            customerId: 'cust5',
                            customerName: 'Charlie Brown',
                            email: 'charlie@example.com',
                            status: 'cancelled',
                            total: 149.99,
                            items: [
                                { productId: 'p9', name: 'Wireless Earbuds', price: 149.99, quantity: 1 }
                            ],
                            paymentStatus: 'refunded',
                            shippingMethod: 'Standard Shipping'
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

    // Filter orders based on search term, status, and date
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        let matchesDate = true;
        const orderDate = new Date(order.date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        if (dateFilter === 'today') {
            matchesDate = orderDate.toDateString() === today.toDateString();
        } else if (dateFilter === 'yesterday') {
            matchesDate = orderDate.toDateString() === yesterday.toDateString();
        } else if (dateFilter === 'last7days') {
            matchesDate = orderDate >= lastWeek;
        } else if (dateFilter === 'last30days') {
            matchesDate = orderDate >= lastMonth;
        }

        return matchesSearch && matchesStatus && matchesDate;
    });

    // Function to format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
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

    // Function to get payment status badge class
    const getPaymentStatusBadgeClass = (status: Order['paymentStatus']): string => {
        switch (status) {
            case 'paid': return 'payment-paid';
            case 'refunded': return 'payment-refunded';
            case 'failed': return 'payment-failed';
            default: return '';
        }
    };

    return (
        <div className="manage-orders-container">
            <div className="page-header">
                <h1>Order Management</h1>
                <div className="export-button">
                    <button className="export-btn">Export Orders</button>
                </div>
            </div>

            <div className="filters-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by order #, customer name, or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-options">
                    <div className="filter-group">
                        <label htmlFor="statusFilter">Status:</label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="dateFilter">Date:</label>
                        <select
                            id="dateFilter"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="last30days">Last 30 Days</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-indicator">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
                <div className="no-results">
                    <p>No orders found matching your filters.</p>
                </div>
            ) : (
                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order #</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id}>
                                    <td className="order-number-cell">
                                        <Link to={`/admin/orders/${order.id}`}>
                                            {order.orderNumber}
                                        </Link>
                                    </td>
                                    <td>{formatDate(order.date)}</td>
                                    <td className="customer-cell">
                                        <div>{order.customerName}</div>
                                        <div className="customer-email">{order.email}</div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`payment-badge ${getPaymentStatusBadgeClass(order.paymentStatus)}`}>
                                            {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                                        </span>
                                    </td>
                                    <td className="total-cell">${order.total.toFixed(2)}</td>
                                    <td className="actions-cell">
                                        <Link to={`/admin/orders/${order.id}`} className="view-btn">
                                            View
                                        </Link>
                                        <Link to={`/admin/orders/${order.id}/edit`} className="edit-btn">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageOrders;
