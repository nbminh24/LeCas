import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Dashboard.css';

interface Order {
    id: string;
    customerName: string;
    date: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
}

const mockOrders: Order[] = [
    { id: 'ORD-1001', customerName: 'John Smith', date: '2025-06-24', status: 'pending', total: 89.97, items: 3 },
    { id: 'ORD-1002', customerName: 'Sarah Johnson', date: '2025-06-24', status: 'confirmed', total: 124.95, items: 2 },
    { id: 'ORD-1003', customerName: 'Michael Brown', date: '2025-06-24', status: 'pending', total: 59.99, items: 1 },
    { id: 'ORD-1004', customerName: 'Emily Davis', date: '2025-06-24', status: 'confirmed', total: 149.98, items: 4 },
];

const WarehouseOrdersPending: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setOrders(mockOrders);
    }, []);

    const filteredOrders = orders.filter(order => order.status === 'pending')
        .filter(order =>
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.customerName.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="orders-tabs">
            <div className="orders-list-search-row">
                <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="orders-list-search-input"
                />
            </div>
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Ngày</th>
                            <th>Trạng thái</th>
                            <th>Số SP</th>
                            <th>Tổng tiền</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center' }}>Không có đơn phù hợp</td></tr>
                        ) : filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.date}</td>
                                <td>Chờ xác nhận</td>
                                <td>{order.items}</td>
                                <td>{order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td style={{ display: 'flex', gap: 8 }}>
                                    <Link to={`/staff/warehouse/orders/${order.id}`} className="btn-view">Xem chi tiết</Link>
                                    <button className="btn-view" style={{ marginLeft: 8 }} onClick={() => alert(`Xác nhận đơn ${order.id}`)}>Xác nhận đơn</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseOrdersPending;
