import React from 'react';
import PageHeader from '../../../../components/shared/PageHeader';

const OrderStatusUpdate: React.FC = () => {
    // TODO: Replace with real data and logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Cập nhật trạng thái đơn hàng" />
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
                <label>Trạng thái mới:</label>
                <select style={{ width: '100%', marginBottom: 16 }}>
                    <option>Đã xác nhận</option>
                    <option>Đang đóng gói</option>
                    <option>Giao cho vận chuyển</option>
                </select>
                <button className="primary-button" style={{ width: '100%' }}>Cập nhật</button>
            </div>
        </div>
    );
};
export default OrderStatusUpdate;
