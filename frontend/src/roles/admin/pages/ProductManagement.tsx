import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const ProductManagement: React.FC = () => {
    // TODO: Replace with real product CRUD logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Quản lý sản phẩm" />
            <div style={{ marginBottom: 24 }}>
                <button className="primary-button">Thêm sản phẩm</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <h3>Danh sách sản phẩm</h3>
                {/* TODO: Add product table, edit/delete actions, upload images */}
            </div>
        </div>
    );
};
export default ProductManagement;
