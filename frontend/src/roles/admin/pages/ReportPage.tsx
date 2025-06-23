import React from 'react';
import PageHeader from '../../../components/shared/PageHeader';

const ReportPage: React.FC = () => {
    // TODO: Replace with real report logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Báo cáo tổng hợp" />
            <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
                <h3>Bộ lọc & xuất file</h3>
                {/* TODO: Add filters, export PDF/Excel, statistics */}
            </div>
        </div>
    );
};
export default ReportPage;
