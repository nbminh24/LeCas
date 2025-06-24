import React from 'react';

interface ShippingTrackingProps {
    trackingNumber: string;
}

const ShippingTracking: React.FC<ShippingTrackingProps> = ({ trackingNumber }) => {
    // TODO: Kết nối API tracking thực tế
    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Theo dõi vận đơn</h2>
            <div style={{ textAlign: 'center', color: '#888' }}>
                Trạng thái vận đơn {trackingNumber} sẽ hiển thị ở đây.
            </div>
        </div>
    );
};

export default ShippingTracking;
