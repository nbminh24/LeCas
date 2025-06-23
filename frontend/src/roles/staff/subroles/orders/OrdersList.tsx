import React, { useState } from 'react';
import { PageHeader } from '../../../../components/shared/PageHeader';
import { DataGrid } from '../../../../components/shared/DataGrid';
import './OrdersList.css';

// Mock data - replace with actual API data
const mockOrders = [
    {
        id: 'ORD-001',
        customerName: 'John Doe',
        date: '2024-01-15',
        status: 'Pending',
        total: 299.99
    },
    {
        id: 'ORD-002',
        customerName: 'Jane Smith',
        date: '2024-01-14',
        status: 'Processing',
        total: 149.50
    },
    // Add more mock orders as needed
];

const OrdersList: React.FC = () => {
    const [orders] = useState(mockOrders);
    const columns = [
        { key: 'id', title: 'Order ID' },
        { key: 'customerName', title: 'Customer' },
        { key: 'date', title: 'Order Date' },
        { key: 'status', title: 'Status' },
        {
            key: 'total', title: 'Total',
            render: (value: number) => `$${value.toFixed(2)}`
        }
    ];

    return (
        <div className="orders-list-container">
            <PageHeader
                title="Order Management"
                subtitle="View and manage customer orders"
                actions={
                    <button className="primary-button">Export Orders</button>
                }
            />
            <div className="orders-grid">        <DataGrid
                columns={columns}
                data={orders}
                actions={(record) => (
                    <button onClick={() => console.log('View order:', record)} className="link-button">
                        View
                    </button>
                )}
            />
            </div>
        </div>
    );
};

export default OrdersList;
