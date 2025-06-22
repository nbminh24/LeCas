import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateShipment.css';

// Mock shipment data (would typically be fetched)
const mockShipment = {
    id: 'ship123',
    orderId: 'order456',
    customerName: 'John Smith',
    trackingNumber: 'TRK789012345',
    carrier: 'Express Shipping',
    status: 'in_transit',
    estimatedDelivery: '2025-06-25',
    shippedDate: '2025-06-20',
    items: [
        { id: 'item1', productName: 'Wireless Headphones', quantity: 1 },
        { id: 'item2', productName: 'Smart Watch', quantity: 1 }
    ]
};

const UpdateShipment: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [shipment, setShipment] = useState(mockShipment);

    // Form state
    const [status, setStatus] = useState(shipment.status);
    const [trackingNumber, setTrackingNumber] = useState(shipment.trackingNumber);
    const [carrier, setCarrier] = useState(shipment.carrier);
    const [estimatedDelivery, setEstimatedDelivery] = useState(shipment.estimatedDelivery);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSuccess('Shipment updated successfully');

            // Update local state (in a real app, this would be from the API response)
            setShipment({
                ...shipment,
                status,
                trackingNumber,
                carrier,
                estimatedDelivery
            });

            // Navigate back after a delay
            setTimeout(() => {
                navigate(`/staff/shipping/shipments/${id}`);
            }, 1500);
        }, 1000);
    };

    return (
        <div className="update-shipment-container">
            <div className="update-shipment-header">
                <h1>Update Shipment</h1>
                <div className="shipment-info">
                    <span>Order ID: {shipment.orderId}</span>
                    <span>Customer: {shipment.customerName}</span>
                </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form className="update-shipment-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2>Shipment Details</h2>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="form-control"
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="in_transit">In Transit</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="failed">Failed Delivery</option>
                            <option value="returned">Returned</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="trackingNumber">Tracking Number</label>
                        <input
                            type="text"
                            id="trackingNumber"
                            value={trackingNumber}
                            onChange={e => setTrackingNumber(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="carrier">Carrier</label>
                        <input
                            type="text"
                            id="carrier"
                            value={carrier}
                            onChange={e => setCarrier(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="estimatedDelivery">Estimated Delivery Date</label>
                        <input
                            type="date"
                            id="estimatedDelivery"
                            value={estimatedDelivery}
                            onChange={e => setEstimatedDelivery(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h2>Items in Shipment</h2>
                    <div className="shipment-items">
                        {shipment.items.map(item => (
                            <div key={item.id} className="shipment-item">
                                <span className="item-name">{item.productName}</span>
                                <span className="item-quantity">Quantity: {item.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h2>Additional Information</h2>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="form-control"
                            rows={4}
                            placeholder="Add any additional notes about this shipment update"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(`/staff/shipping/shipments/${id}`)}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Update Shipment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateShipment;
