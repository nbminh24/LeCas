import React from 'react';
import PageHeader from '../../../../components/shared/PageHeader';

const ShipmentNote: React.FC = () => {
    // TODO: Replace with real data and logic
    return (
        <div style={{ padding: 24 }}>
            <PageHeader title="Ghi chú nội bộ cho đơn giao" />
            <div style={{ maxWidth: 400, margin: '0 auto' }}>
                <label>Ghi chú:</label>
                <textarea style={{ width: '100%', minHeight: 80, marginBottom: 16 }} />
                <button className="primary-button" style={{ width: '100%' }}>Lưu ghi chú</button>
            </div>
        </div>
    );
};
export default ShipmentNote;
