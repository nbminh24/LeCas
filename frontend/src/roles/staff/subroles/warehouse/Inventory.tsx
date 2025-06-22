import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';

interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: string;
    inStock: number;
    reserved: number;
    available: number;
    lowStockThreshold: number;
}

const Inventory: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [stockFilter, setStockFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        // Simulate API call to fetch inventory
        setTimeout(() => {
            const mockInventory: InventoryItem[] = [
                { id: '1', name: 'Classic T-Shirt', sku: 'TS-001', category: 'Shirts', inStock: 120, reserved: 15, available: 105, lowStockThreshold: 20 },
                { id: '2', name: 'Slim Fit Jeans', sku: 'JN-001', category: 'Pants', inStock: 85, reserved: 10, available: 75, lowStockThreshold: 15 },
                { id: '3', name: 'Winter Jacket', sku: 'JK-001', category: 'Outerwear', inStock: 50, reserved: 8, available: 42, lowStockThreshold: 10 },
                { id: '4', name: 'Running Shoes', sku: 'SH-001', category: 'Footwear', inStock: 65, reserved: 12, available: 53, lowStockThreshold: 15 },
                { id: '5', name: 'Baseball Cap', sku: 'AC-001', category: 'Accessories', inStock: 95, reserved: 5, available: 90, lowStockThreshold: 20 },
                { id: '6', name: 'Leather Belt', sku: 'AC-002', category: 'Accessories', inStock: 70, reserved: 3, available: 67, lowStockThreshold: 15 },
                { id: '7', name: 'Wool Sweater', sku: 'SW-001', category: 'Outerwear', inStock: 45, reserved: 7, available: 38, lowStockThreshold: 10 },
                { id: '8', name: 'Casual Shirt', sku: 'TS-002', category: 'Shirts', inStock: 8, reserved: 3, available: 5, lowStockThreshold: 15 },
            ];

            setInventory(mockInventory);
            setLoading(false);
        }, 500);
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryFilter(e.target.value);
    };

    const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStockFilter(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Apply filters to inventory
    const filteredInventory = inventory
        .filter(item => categoryFilter ? item.category === categoryFilter : true)
        .filter(item => {
            if (stockFilter === 'low') {
                return item.available <= item.lowStockThreshold;
            } else if (stockFilter === 'out') {
                return item.available === 0;
            }
            return true;
        })
        .filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const getStockStatusClass = (item: InventoryItem) => {
        if (item.available === 0) {
            return 'out-of-stock';
        } else if (item.available <= item.lowStockThreshold) {
            return 'low-stock';
        } else {
            return 'in-stock';
        }
    };

    if (loading) {
        return <div className="loading">Loading inventory data...</div>;
    }

    return (
        <div className="warehouse-page">
            <div className="warehouse-header">
                <h1>Inventory Management</h1>
                <div className="header-actions">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search by product name or SKU"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            <div className="filter-bar">
                <div className="filter-group">
                    <label>Category:</label>
                    <select value={categoryFilter} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Pants">Pants</option>
                        <option value="Outerwear">Outerwear</option>
                        <option value="Footwear">Footwear</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Stock Status:</label>
                    <select value={stockFilter} onChange={handleStockChange}>
                        <option value="all">All Items</option>
                        <option value="low">Low Stock</option>
                        <option value="out">Out of Stock</option>
                    </select>
                </div>
            </div>

            <div className="inventory-stats">
                <div className="stat-card">
                    <span className="stat-value">{inventory.length}</span>
                    <span className="stat-label">Total Products</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {inventory.filter(item => item.available <= item.lowStockThreshold && item.available > 0).length}
                    </span>
                    <span className="stat-label">Low Stock</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value">
                        {inventory.filter(item => item.available === 0).length}
                    </span>
                    <span className="stat-label">Out of Stock</span>
                </div>
            </div>

            {filteredInventory.length === 0 ? (
                <div className="no-items">
                    <p>No inventory items match your current filters.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>In Stock</th>
                                <th>Reserved</th>
                                <th>Available</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventory.map(item => (
                                <tr key={item.id}>
                                    <td>{item.sku}</td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{item.inStock}</td>
                                    <td>{item.reserved}</td>
                                    <td>{item.available}</td>
                                    <td>
                                        <span className={`stock-status ${getStockStatusClass(item)}`}>
                                            {item.available === 0 ? 'Out of Stock' :
                                                item.available <= item.lowStockThreshold ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <Link to={`/staff/warehouse/inventory/${item.id}`} className="btn-view">View</Link>
                                        <Link to={`/staff/warehouse/update-stock/${item.id}`} className="btn-edit">Update Stock</Link>
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

export default Inventory;
