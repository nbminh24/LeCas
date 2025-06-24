import React from 'react';
import * as XLSX from 'xlsx';
import '../../pages/Dashboard.css';

const reportData = [
    {
        name: 'Áo thun basic',
        sku: 'TSHIRT-001',
        opening: 100,
        import: 50,
        export: 30,
        closing: 120,
    },
    {
        name: 'Quần kaki',
        sku: 'PANTS-002',
        opening: 80,
        import: 10,
        export: 40,
        closing: 50,
    },
];

const WarehouseReports: React.FC = () => {
    const [reportFilter, setReportFilter] = React.useState<'day' | 'week' | 'month' | 'quarter' | 'year'>('day');

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(reportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Báo cáo kho');
        XLSX.writeFile(wb, 'bao_cao_kho.xlsx');
    };

    return (
        <div className="warehouse-reports">
            <h2 style={{ marginBottom: 16 }}>Báo cáo xuất – nhập – tồn</h2>
            <div style={{ margin: '8px 0 16px 0', display: 'flex', gap: 12, alignItems: 'center' }}>
                <select value={reportFilter} onChange={e => setReportFilter(e.target.value as any)} style={{ width: 140, height: 32, borderRadius: 8, border: '1px solid #e5e7eb', padding: '0 8px', fontSize: 15 }}>
                    <option value="day">Theo ngày</option>
                    <option value="week">Theo tuần</option>
                    <option value="month">Theo tháng</option>
                    <option value="quarter">Theo quý</option>
                    <option value="year">Theo năm</option>
                </select>
                <button onClick={handleExportExcel} style={{ height: 32, borderRadius: 8, border: '1.5px solid #222', background: '#fff', padding: '0 16px', fontWeight: 500, fontSize: 15, color: '#222', cursor: 'pointer' }}>Export Excel</button>
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr style={{ background: '#fafafa' }}>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>Sản phẩm</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'left' }}>SKU</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Tồn đầu</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Nhập</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Xuất</th>
                            <th style={{ padding: '12px 8px', fontWeight: 500, fontSize: 15, textAlign: 'center' }}>Tồn cuối</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map(item => (
                            <tr key={item.sku}>
                                <td style={{ padding: '12px 8px' }}>{item.name}</td>
                                <td style={{ padding: '12px 8px' }}>{item.sku}</td>
                                <td style={{ padding: '12px 8px', textAlign: 'center' }}>{item.opening}</td>
                                <td style={{ padding: '12px 8px', textAlign: 'center' }}>{item.import}</td>
                                <td style={{ padding: '12px 8px', textAlign: 'center' }}>{item.export}</td>
                                <td style={{ padding: '12px 8px', textAlign: 'center' }}>{item.closing}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseReports;
