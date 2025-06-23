import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const UserManagement: React.FC = () => {
    // TODO: Replace with real user management logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Quản lý người dùng" />
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <h3>Danh sách user</h3>
                {/* TODO: Add user table, lock/unlock, view order history */}
            </div>
        </div>
    );
};
export default UserManagement;
