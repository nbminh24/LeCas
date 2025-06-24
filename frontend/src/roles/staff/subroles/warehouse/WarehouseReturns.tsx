import React, { useState } from 'react';
import '../../pages/Dashboard.css';

interface ReturnOrder {
    id: string;
    product: string;
    sku: string;
    quantity: number;
    reason: string;
    status: 'pending' | 'restocked';
}

const mockReturnOrders: ReturnOrder[] = [
    { id: 'RET-001', product: 'Áo thun nam basic', sku: 'TSHIRT-001', quantity: 2, reason: 'Khách trả hàng', status: 'pending' },
    { id: 'RET-002', product: 'Quần short kaki', sku: 'SHORT-002', quantity: 1, reason: 'Lỗi sản phẩm', status: 'pending' },
    { id: 'RET-003', product: 'Áo sơ mi linen', sku: 'SHIRT-003', quantity: 1, reason: 'Không vừa size', status: 'restocked' },
];

const WarehouseReturns: React.FC = () => {
    const [orders, setOrders] = useState<ReturnOrder[]>(mockReturnOrders);

    const handleRestock = (id: string) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'restocked' } : o));
        // TODO: Gọi API cập nhật kho thực tế
    };

    return (
        <div className="warehouse-returns">
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr style={{ background: '#fafafa' }}>
                            <th style={{ padding: '12px 8px' }}>Mã đơn</th>
                            <th style={{ padding: '12px 8px' }}>Sản phẩm</th>
                            <th style={{ padding: '12px 8px' }}>SKU</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center' }}>Số lượng</th>
                            <th style={{ padding: '12px 8px' }}>Lý do</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center' }}>Trạng thái</th>
                            <th style={{ padding: '12px 8px', textAlign: 'center' }}>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center' }}>Không có đơn đổi/trả nào</td></tr>
                        ) : orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.product}</td>
                                <td>{order.sku}</td>
                                <td style={{ textAlign: 'center' }}>{order.quantity}</td>
                                <td>{order.reason}</td>
                                <td style={{ textAlign: 'center' }}>{order.status === 'restocked' ? 'Đã hoàn kho' : 'Chờ hoàn kho'}</td>
                                <td style={{ textAlign: 'center' }}>
                                    {order.status === 'pending' ? (
                                        <button onClick={() => handleRestock(order.id)} style={{ borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', padding: '6px 18px', fontWeight: 500, fontSize: 15, color: '#222', cursor: 'pointer' }}>Hoàn kho</button>
                                    ) : (
                                        <span style={{ color: '#16a34a', fontWeight: 500 }}>Đã hoàn kho</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseReturns;
