import React from 'react';

const ShippingOrderDetail: React.FC = () => {
    // TODO: Kết nối API lấy chi tiết đơn giao vận thực tế
    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Chi tiết đơn giao vận</h2>
            <div style={{ textAlign: 'center', color: '#888' }}>
                Thông tin chi tiết đơn hàng, tracking, timeline, log... sẽ hiển thị ở đây.
            </div>
        </div>
    );
};

export default ShippingOrderDetail;
