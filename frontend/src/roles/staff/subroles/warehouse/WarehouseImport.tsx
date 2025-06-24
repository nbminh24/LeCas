import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Dashboard.css';

interface ImportReceipt {
    id: string;
    supplier: string;
    date: string;
    status: 'pending' | 'confirmed';
    total: number;
    items: number;
}

const mockReceipts: ImportReceipt[] = [
    { id: 'PNK-001', supplier: 'Công ty Vải ABC', date: '2025-06-24', status: 'pending', total: 5000000, items: 3 },
    { id: 'PNK-002', supplier: 'Công ty May XYZ', date: '2025-06-23', status: 'pending', total: 3200000, items: 2 },
    { id: 'PNK-003', supplier: 'Công ty Sợi DEF', date: '2025-06-22', status: 'confirmed', total: 2100000, items: 1 },
];

const WarehouseImport: React.FC = () => {
    const [receipts, setReceipts] = useState<ImportReceipt[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setReceipts(mockReceipts);
    }, []);

    const handleConfirm = (id: string) => {
        setReceipts(prev => prev.map(r => r.id === id ? { ...r, status: 'confirmed' } : r));
        // TODO: Gọi API xác nhận nhập kho thực tế
    };

    const filteredReceipts = receipts.filter(receipt =>
        receipt.status === 'pending' &&
        (receipt.id.toLowerCase().includes(search.toLowerCase()) ||
            receipt.supplier.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="orders-tabs">
            <div className="orders-list-search-row">
                <input
                    type="text"
                    placeholder="Tìm kiếm phiếu nhập..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="orders-list-search-input"
                />
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Mã phiếu</th>
                            <th>Nhà cung cấp</th>
                            <th>Ngày nhập</th>
                            <th>Số mặt hàng</th>
                            <th>Tổng tiền</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReceipts.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Không có phiếu nhập cần xử lý</td></tr>
                        ) : filteredReceipts.map(receipt => (
                            <tr key={receipt.id}>
                                <td>{receipt.id}</td>
                                <td>{receipt.supplier}</td>
                                <td>{receipt.date}</td>
                                <td>{receipt.items}</td>
                                <td>{receipt.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td style={{ display: 'flex', gap: 8 }}>
                                    <Link to={`/staff/warehouse/import/${receipt.id}`} className="btn-view">Xem chi tiết</Link>
                                    <button className="btn-view" style={{ marginLeft: 8 }} onClick={() => handleConfirm(receipt.id)}>Xác nhận nhập kho</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseImport;
