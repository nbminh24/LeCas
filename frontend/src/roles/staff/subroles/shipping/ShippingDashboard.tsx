import React, { useEffect, useState } from 'react';

// Giả lập API lấy log
const mockLogs = [
    { by: 'staff_shipping_01', action: 'Tạo vận đơn', result: 'Thành công', tracking_number: 'VT123456789VN', timestamp: '2025-06-24T10:30:00' },
    { by: 'staff_shipping_02', action: 'Lấy trạng thái', result: 'Thành công', tracking_number: 'VT987654321VN', timestamp: '2025-06-24T09:10:00' },
    { by: 'staff_shipping_01', action: 'Hủy vận đơn', result: 'Thành công', tracking_number: 'VT111222333VN', timestamp: '2025-06-23T16:00:00' },
];

const ShippingDashboard: React.FC = () => {
    const [logs] = useState(mockLogs);

    return (
        <div style={{ padding: 16 }}>
            <div className="orders-grid" style={{ marginTop: 0 }}>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Nhân viên</th>
                            <th style={{ textAlign: 'center' }}>Hành động</th>
                            <th style={{ textAlign: 'center' }}>Kết quả</th>
                            <th style={{ textAlign: 'center' }}>Mã vận đơn</th>
                            <th style={{ textAlign: 'center' }}>Thời gian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center', color: '#888' }}>Chưa có log nào</td></tr>
                        ) : (
                            logs.map((log, idx) => (
                                <tr key={idx}>
                                    <td style={{ textAlign: 'center' }}>{log.by}</td>
                                    <td style={{ textAlign: 'center' }}>{log.action}</td>
                                    <td style={{ textAlign: 'center' }}>{log.result}</td>
                                    <td style={{ textAlign: 'center' }}>{log.tracking_number}</td>
                                    <td style={{ textAlign: 'center' }}>{new Date(log.timestamp).toLocaleString('vi-VN')}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShippingDashboard;
