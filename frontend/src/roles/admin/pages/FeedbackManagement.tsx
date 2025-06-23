import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const FeedbackManagement: React.FC = () => {
    // TODO: Replace with real feedback management logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Quản lý phản hồi (Feedback)" />
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <h3>Danh sách feedback</h3>
                {/* TODO: Add feedback table, filter, tag, report */}
            </div>
        </div>
    );
};
export default FeedbackManagement;
