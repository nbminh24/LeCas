import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Dashboard.css';

interface Order {
    id: string;
    customerName: string;
    date: string;
    status: 'pending' | 'confirmed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: number;
}

// Danh sách đơn đã đóng gói (mock, sẽ cập nhật từ localStorage hoặc props trong tương lai)
const getPackedOrders = (): Order[] => {
    const packed = localStorage.getItem('warehouse_packed_orders');
    if (packed) return JSON.parse(packed);
    return [];
};

const WarehouseOrdersPacked: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setOrders(getPackedOrders());
        // Lắng nghe sự thay đổi của localStorage (nếu có nhiều tab)
        const onStorage = () => setOrders(getPackedOrders());
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const filteredOrders = orders.filter(order =>
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
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr><td colSpan={7} style={{ textAlign: 'center' }}>Không có đơn đã đóng gói</td></tr>
                        ) : filteredOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customerName}</td>
                                <td>{order.date}</td>
                                <td>Đã đóng gói</td>
                                <td>{order.items}</td>
                                <td>{order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td>
                                    <Link to={`/staff/warehouse/orders/${order.id}`} className="btn-view">Xem chi tiết</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WarehouseOrdersPacked;
