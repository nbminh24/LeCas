import React, { useState } from 'react';
import { PageHeader } from '@components/shared/PageHeader';
import { DataGrid } from '@components/shared/DataGrid';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';

const mockData = [
    {
        sku: 'TS-001',
        name: 'Classic T-Shirt',
        category: 'Shirts',
        inStock: 120,
        reserved: 15,
        available: 105,
        status: 'In Stock'
    },
    {
        sku: 'JN-001',
        name: 'Slim Fit Jeans',
        category: 'Pants',
        inStock: 85,
        reserved: 10,
        available: 75,
        status: 'In Stock'
    },
    {
        sku: 'JK-001',
        name: 'Winter Jacket',
        category: 'Outerwear',
        inStock: 50,
        reserved: 8,
        available: 42,
        status: 'In Stock'
    }
];

const Inventory: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const columns = [
        { key: 'sku', title: 'SKU' },
        { key: 'name', title: 'Product Name' },
        { key: 'category', title: 'Category' },
        { key: 'inStock', title: 'In Stock' },
        { key: 'reserved', title: 'Reserved' },
        { key: 'available', title: 'Available' },
        {
            key: 'status',
            title: 'Status',
            render: (value: string) => (
                <span className={`status-tag status-tag-${value === 'In Stock' ? 'success' : 'warning'}`}>
                    {value}
                </span>
            )
        }
    ];

    const handleViewDetails = (record: any) => {
        navigate(`/staff/warehouse/inventory/${record.sku}`);
    };

    const handleUpdateStock = (record: any) => {
        navigate(`/staff/warehouse/update-stock/${record.sku}`);
    };

    const actions = (record: any) => (
        <>
            <button className="button button-secondary" onClick={() => handleViewDetails(record)}>
                View
            </button>
            <button className="button button-primary" onClick={() => handleUpdateStock(record)}>
                Update Stock
            </button>
        </>
    );

    const statsCards = [
        {
            title: 'Total Products',
            value: '8',
            description: 'All products in inventory'
        },
        {
            title: 'Low Stock',
            value: '1',
            description: 'Products needing restock'
        },
        {
            title: 'Out of Stock',
            value: '0',
            description: 'Currently unavailable'
        }
    ];

    return (
        <div className="inventory-page">
            <PageHeader
                title="Inventory Management"
                subtitle="Manage and track your product inventory"
                actions={
                    <button className="button button-primary">
                        Export Inventory
                    </button>
                }
            />

            <div className="stats-grid">
                {statsCards.map((card, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-card-title">{card.title}</div>
                        <div className="stat-card-value">{card.value}</div>
                        <div className="stat-card-description">{card.description}</div>
                    </div>
                ))}
            </div>

            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Search by product name or SKU"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option>All Categories</option>
                    <option>Shirts</option>
                    <option>Pants</option>
                    <option>Outerwear</option>
                </select>
            </div>

            <DataGrid
                columns={columns}
                data={mockData}
                actions={actions}
            />
        </div>
    );
};

export default Inventory;
