import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface SearchFilters {
    orderId: string;
    customerName: string;
    dateFrom: string;
    dateTo: string;
    status: string;
}

interface Order {
    id: string;
    customerName: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
}

const SearchOrders: React.FC = () => {
    const [filters, setFilters] = useState<SearchFilters>({
        orderId: '',
        customerName: '',
        dateFrom: '',
        dateTo: '',
        status: ''
    });

    const [searchResults, setSearchResults] = useState<Order[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setHasSearched(true);

        // Simulate API call with search parameters
        setTimeout(() => {
            // Mock results - in a real app this would come from an API
            const mockResults: Order[] = [
                { id: 'ORD-1001', customerName: 'John Smith', date: '2023-06-15', status: 'pending', total: 89.97, items: 3 },
                { id: 'ORD-1008', customerName: 'John Williams', date: '2023-06-08', status: 'shipped', total: 64.99, items: 1 },
            ];

            setSearchResults(mockResults);
            setIsSearching(false);
        }, 800);
    };

    const handleReset = () => {
        setFilters({
            orderId: '',
            customerName: '',
            dateFrom: '',
            dateTo: '',
            status: ''
        });
        setHasSearched(false);
        setSearchResults([]);
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

    return (
        <div className="staff-page">
            <div className="staff-header">
                <h1>Search Orders</h1>
            </div>

            <div className="search-container">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-fields">
                        <div className="form-group">
                            <label htmlFor="orderId">Order ID</label>
                            <input
                                type="text"
                                id="orderId"
                                name="orderId"
                                value={filters.orderId}
                                onChange={handleInputChange}
                                placeholder="e.g. ORD-1001"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="customerName">Customer Name</label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={filters.customerName}
                                onChange={handleInputChange}
                                placeholder="e.g. John Smith"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="dateFrom">Date From</label>
                                <input
                                    type="date"
                                    id="dateFrom"
                                    name="dateFrom"
                                    value={filters.dateFrom}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="dateTo">Date To</label>
                                <input
                                    type="date"
                                    id="dateTo"
                                    name="dateTo"
                                    value={filters.dateTo}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={filters.status}
                                onChange={handleInputChange}
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={isSearching}>
                            {isSearching ? 'Searching...' : 'Search Orders'}
                        </button>
                        <button type="button" className="btn-secondary" onClick={handleReset}>
                            Reset Filters
                        </button>
                    </div>
                </form>
            </div>

            {hasSearched && (
                <div className="search-results">
                    <h2>Search Results</h2>

                    {isSearching ? (
                        <div className="loading">Searching for orders...</div>
                    ) : searchResults.length === 0 ? (
                        <div className="no-results">
                            <p>No orders found matching your search criteria.</p>
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
                                    {searchResults.map(order => (
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
                                                <Link to={`/staff/orders/update/${order.id}`} className="btn-edit">Update</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchOrders;
