import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shipments.css';

interface Shipment {
    id: string;
    orderId: string;
    customerName: string;
    shippingAddress: string;
    carrier: string;
    trackingNumber: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'failed';
    createdDate: string;
    estimatedDelivery: string;
}

const Shipments: React.FC = () => {
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Simulate API call to fetch shipments
        setTimeout(() => {
            const mockShipments: Shipment[] = [
                {
                    id: 'SHP-1001',
                    orderId: 'ORD-1001',
                    customerName: 'John Smith',
                    shippingAddress: '123 Main St, Anytown, CA 90210',
                    carrier: 'FedEx',
                    trackingNumber: 'FDX123456789',
                    status: 'processing',
                    createdDate: '2023-06-15',
                    estimatedDelivery: '2023-06-18'
                },
                {
                    id: 'SHP-1002',
                    orderId: 'ORD-1002',
                    customerName: 'Sarah Johnson',
                    shippingAddress: '456 Oak Ave, Somecity, NY 10001',
                    carrier: 'UPS',
                    trackingNumber: 'UPS987654321',
                    status: 'shipped',
                    createdDate: '2023-06-14',
                    estimatedDelivery: '2023-06-17'
                },
                {
                    id: 'SHP-1003',
                    orderId: 'ORD-1003',
                    customerName: 'Michael Brown',
                    shippingAddress: '789 Pine St, Anothercity, TX 75001',
                    carrier: 'USPS',
                    trackingNumber: 'USPS123789456',
                    status: 'delivered',
                    createdDate: '2023-06-12',
                    estimatedDelivery: '2023-06-15'
                },
                {
                    id: 'SHP-1004',
                    orderId: 'ORD-1004',
                    customerName: 'Emily Davis',
                    shippingAddress: '101 Maple Dr, Lastcity, FL 33101',
                    carrier: 'DHL',
                    trackingNumber: 'DHL456123789',
                    status: 'pending',
                    createdDate: '2023-06-16',
                    estimatedDelivery: '2023-06-19'
                },
                {
                    id: 'SHP-1005',
                    orderId: 'ORD-1005',
                    customerName: 'David Wilson',
                    shippingAddress: '202 Cedar Ln, Somewhere, WA 98001',
                    carrier: 'FedEx',
                    trackingNumber: 'FDX987321654',
                    status: 'failed',
                    createdDate: '2023-06-13',
                    estimatedDelivery: '2023-06-16'
                },
            ];

            setShipments(mockShipments);
            setLoading(false);
        }, 500);
    }, []);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFilter(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const getStatusClass = (status: Shipment['status']) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'shipped': return 'status-shipped';
            case 'delivered': return 'status-delivered';
            case 'failed': return 'status-failed';
            default: return '';
        }
    };

    // Apply filters to shipments
    const filteredShipments = shipments
        .filter(shipment => statusFilter === 'all' || shipment.status === statusFilter)
        .filter(shipment =>
            shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shipment.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shipment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase())
        );

    if (loading) {
        return <div className="loading">Loading shipments data...</div>;
    }

    return (
        <div className="shipping-page">
            <div className="shipping-header">
                <h1>Shipments Management</h1>
                <div className="header-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by shipment ID, order ID, customer name or tracking number"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="filter-group">
                    <label>Status:</label>
                    <select value={statusFilter} onChange={handleStatusChange}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            <div className="shipment-stats">
                <div className="stat-card">
                    <span className="stat-value">
                        {shipments.filter(shipment => shipment.status === 'pending').length}
                    </span>
                    <span className="stat-label">Pending</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {shipments.filter(shipment => shipment.status === 'processing').length}
                    </span>
                    <span className="stat-label">Processing</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {shipments.filter(shipment => shipment.status === 'shipped').length}
                    </span>
                    <span className="stat-label">Shipped</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {shipments.filter(shipment => shipment.status === 'delivered').length}
                    </span>
                    <span className="stat-label">Delivered</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {shipments.filter(shipment => shipment.status === 'failed').length}
                    </span>
                    <span className="stat-label">Failed</span>
                </div>
            </div>

            {filteredShipments.length === 0 ? (
                <div className="no-shipments">
                    <p>No shipments match your current filters.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Shipment ID</th>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Carrier</th>
                                <th>Tracking Number</th>
                                <th>Status</th>
                                <th>Est. Delivery</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShipments.map(shipment => (
                                <tr key={shipment.id}>
                                    <td>{shipment.id}</td>
                                    <td>
                                        <Link to={`/staff/orders/${shipment.orderId}`}>{shipment.orderId}</Link>
                                    </td>
                                    <td>{shipment.customerName}</td>
                                    <td>{shipment.carrier}</td>
                                    <td>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(`https://example.com/track?number=${shipment.trackingNumber}`, '_blank');
                                            }}
                                            className="tracking-link"
                                        >
                                            {shipment.trackingNumber}
                                        </a>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusClass(shipment.status)}`}>
                                            {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>{new Date(shipment.estimatedDelivery).toLocaleDateString()}</td>
                                    <td className="actions">
                                        <Link to={`/staff/shipping/shipments/${shipment.id}`} className="btn-view">View Details</Link>
                                        <Link to={`/staff/shipping/shipments/update/${shipment.id}`} className="btn-edit">Update Status</Link>
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

export default Shipments;
