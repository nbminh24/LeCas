import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const CategoryManagement: React.FC = () => {
    // TODO: Replace with real category CRUD logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Quản lý danh mục" />
            <div style={{ marginBottom: 24 }}>
                <button className="primary-button">Thêm danh mục</button>
            </div>
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <h3>Danh sách danh mục</h3>
                {/* TODO: Add category table, edit/delete actions */}
            </div>
        </div>
    );
};
export default CategoryManagement;
