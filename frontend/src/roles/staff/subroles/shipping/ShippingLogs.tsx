import React from 'react';

const ShippingLogs: React.FC = () => {
    // TODO: Kết nối API lấy log thực tế
    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Nhật ký xử lý giao hàng</h2>
            <div style={{ textAlign: 'center', color: '#888' }}>
                Danh sách log thao tác của staff_shipping sẽ hiển thị ở đây.
            </div>
        </div>
    );
};

export default ShippingLogs;
