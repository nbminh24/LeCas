import React, { useState } from 'react';
import { PageHeader } from '../../../../components/shared/PageHeader';
import { DataGrid } from '../../../../components/shared/DataGrid';
import './OrderDetails.css';

interface OrderItem {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

interface OrderDetails {
    id: string;
    customerName: string;
    email: string;
    date: string;
    status: string;
    total: number;
    items: OrderItem[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
}

// Mock data - replace with actual API data
const mockOrderDetails: OrderDetails = {
    id: 'ORD-001',
    customerName: 'John Doe',
    email: 'john.doe@example.com',
    date: '2024-01-15',
    status: 'Pending',
    total: 299.99,
    items: [
        {
            id: 'ITEM-1',
            productName: 'Product 1',
            quantity: 2,
            unitPrice: 99.99,
            total: 199.98
        },
        {
            id: 'ITEM-2',
            productName: 'Product 2',
            quantity: 1,
            unitPrice: 100.01,
            total: 100.01
        }
    ],
    shippingAddress: {
        street: '123 Main St',
        city: 'Springfield',
        state: 'IL',
        zip: '62701'
    }
};

const OrderDetails: React.FC = () => {
    const [order] = useState<OrderDetails>(mockOrderDetails);

    const columns = [
        { key: 'productName', title: 'Product' },
        { key: 'quantity', title: 'Quantity' },
        {
            key: 'unitPrice', title: 'Unit Price',
            render: (value: number) => `$${value.toFixed(2)}`
        },
        {
            key: 'total', title: 'Total',
            render: (value: number) => `$${value.toFixed(2)}`
        }
    ];

    return (
        <div className="order-details-container">
            <PageHeader
                title={`Order ${order.id}`}
                subtitle={`${order.customerName} - ${order.date}`}
                actions={
                    <div className="order-actions">
                        <button className="secondary-button">Update Status</button>
                        <button className="primary-button">Process Order</button>
                    </div>
                }
            />

            <div className="order-info-grid">
                <div className="order-info-section">
                    <h3>Customer Information</h3>
                    <div className="info-group">
                        <p><strong>Name:</strong> {order.customerName}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                    </div>
                </div>

                <div className="order-info-section">
                    <h3>Shipping Address</h3>
                    <div className="info-group">
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                    </div>
                </div>

                <div className="order-info-section">
                    <h3>Order Summary</h3>
                    <div className="info-group">
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="order-items">
                <h3>Order Items</h3>
                <DataGrid
                    columns={columns}
                    data={order.items}
                />
            </div>
        </div>
    );
};

export default OrderDetails;
