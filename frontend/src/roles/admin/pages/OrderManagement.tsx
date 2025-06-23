import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const OrderManagement: React.FC = () => {
    // TODO: Replace with real order management logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Quản lý đơn hàng" />
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <h3>Danh sách đơn hàng</h3>
                {/* TODO: Add order table, assign staff, update status */}
            </div>
        </div>
    );
};
export default OrderManagement;
