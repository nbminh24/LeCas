import React from 'react';
import { useParams } from 'react-router-dom';
import './ShipmentDetail.css';

// Mock shipment data
const mockShipment = {
    id: 'ship123',
    orderId: 'order456',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
    },
    trackingNumber: 'TRK789012345',
    carrier: 'Express Shipping',
    status: 'in_transit',
    estimatedDelivery: '2025-06-25',
    shippedDate: '2025-06-20',
    items: [
        {
            id: 'item1',
            productName: 'Wireless Headphones',
            sku: 'WH-123',
            quantity: 1
        },
        {
            id: 'item2',
            productName: 'Smart Watch',
            sku: 'SW-456',
            quantity: 1
        }
    ],
    notes: 'Customer requested delivery to front door',
    events: [
        {
            date: '2025-06-20T14:30:00Z',
            status: 'shipped',
            location: 'Warehouse NYC',
            description: 'Package has left the warehouse'
        },
        {
            date: '2025-06-21T09:15:00Z',
            status: 'in_transit',
            location: 'Sorting Facility',
            description: 'Package is in transit'
        },
        {
            date: '2025-06-22T07:45:00Z',
            status: 'out_for_delivery',
            location: 'Local Distribution Center',
            description: 'Package is out for delivery'
        }
    ]
};

const ShipmentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const shipment = mockShipment; // In a real app, fetch based on ID

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'shipped': return 'Shipped';
            case 'in_transit': return 'In Transit';
            case 'out_for_delivery': return 'Out for Delivery';
            case 'delivered': return 'Delivered';
            case 'failed': return 'Failed Delivery';
            case 'returned': return 'Returned';
            default: return status;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'shipped': return 'status-shipped';
            case 'in_transit': return 'status-in-transit';
            case 'out_for_delivery': return 'status-out-for-delivery';
            case 'delivered': return 'status-delivered';
            case 'failed': return 'status-failed';
            case 'returned': return 'status-returned';
            default: return '';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="shipment-detail-container">
            <div className="shipment-header">
                <h1>Shipment Details</h1>
                <span className={`shipment-status ${getStatusClass(shipment.status)}`}>
                    {getStatusLabel(shipment.status)}
                </span>
            </div>

            <div className="shipment-sections">
                <div className="shipment-section">
                    <h2>Shipment Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Shipment ID:</span>
                            <span className="info-value">{shipment.id}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Order ID:</span>
                            <span className="info-value">{shipment.orderId}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Tracking Number:</span>
                            <span className="info-value highlight">{shipment.trackingNumber}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Carrier:</span>
                            <span className="info-value">{shipment.carrier}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Shipped Date:</span>
                            <span className="info-value">{new Date(shipment.shippedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Estimated Delivery:</span>
                            <span className="info-value">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="shipment-section">
                    <h2>Customer Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{shipment.customerName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email:</span>
                            <span className="info-value">{shipment.customerEmail}</span>
                        </div>
                    </div>
                </div>

                <div className="shipment-section">
                    <h2>Shipping Address</h2>
                    <div className="address-block">
                        <p>{shipment.shippingAddress.street}</p>
                        <p>{shipment.shippingAddress.city}, {shipment.shippingAddress.state} {shipment.shippingAddress.zipCode}</p>
                        <p>{shipment.shippingAddress.country}</p>
                    </div>
                </div>

                <div className="shipment-section">
                    <h2>Items</h2>
                    <div className="items-table">
                        <div className="items-header">
                            <div className="item-cell">Product</div>
                            <div className="item-cell">SKU</div>
                            <div className="item-cell">Quantity</div>
                        </div>
                        {shipment.items.map(item => (
                            <div key={item.id} className="items-row">
                                <div className="item-cell">{item.productName}</div>
                                <div className="item-cell">{item.sku}</div>
                                <div className="item-cell">{item.quantity}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="shipment-section">
                    <h2>Tracking History</h2>
                    <div className="tracking-timeline">
                        {shipment.events.map((event, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">{formatDate(event.date)}</div>
                                    <div className={`timeline-status ${getStatusClass(event.status)}`}>
                                        {getStatusLabel(event.status)}
                                    </div>
                                    <div className="timeline-location">{event.location}</div>
                                    <div className="timeline-description">{event.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {shipment.notes && (
                    <div className="shipment-section">
                        <h2>Notes</h2>
                        <div className="notes-block">
                            <p>{shipment.notes}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="shipment-actions">
                <button className="action-button primary">Update Status</button>
                <button className="action-button secondary">Print Label</button>
                <button className="action-button">Send Notification</button>
            </div>
        </div>
    );
};

export default ShipmentDetail;
