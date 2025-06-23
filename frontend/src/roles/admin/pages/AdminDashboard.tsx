import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const AdminDashboard: React.FC = () => {
    // TODO: Replace with real data and charts
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Admin Dashboard" subtitle="Tổng quan doanh thu, đơn hàng, feedback, sản phẩm sắp hết hàng" />
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 300, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                    <h3>Doanh thu hôm nay</h3>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>₫12,000,000</div>
                </div>
                <div style={{ flex: 1, minWidth: 300, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                    <h3>Đơn hàng mới</h3>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>25</div>
                </div>
                <div style={{ flex: 1, minWidth: 300, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                    <h3>Feedback nổi bật</h3>
                    <ul>
                        <li>"Shop giao hàng rất nhanh!"</li>
                        <li>"Áo chất lượng tốt."</li>
                    </ul>
                </div>
            </div>
            {/* TODO: Add charts, product low stock, etc. */}
        </div>
    );
};
export default AdminDashboard;
