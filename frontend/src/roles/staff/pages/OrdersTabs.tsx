import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

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

const OrdersTabs: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // Cải thiện xác định tab theo path
    const getTabFromPath = () => {
        if (location.pathname.includes('/confirmed')) return 'confirmed';
        if (location.pathname.includes('/pending')) return 'pending';
        return 'pending';
    };
    const [tab, setTab] = useState<'pending' | 'confirmed'>(getTabFromPath());
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        setOrders(mockOrders);
    }, []);

    // Khi path thay đổi (ví dụ: do chuyển tab từ sidebar), cập nhật tab tương ứng
    useEffect(() => {
        setTab(getTabFromPath());
    }, [location.pathname]);

    // Khi click tab, setTab và navigate luôn
    const handleTabClick = (newTab: 'pending' | 'confirmed') => {
        setTab(newTab);
        if (newTab === 'pending') {
            navigate('/staff/orders/pending');
        } else {
            navigate('/staff/orders/confirmed');
        }
    };

    const filteredOrders = orders.filter(order => {
        if (tab === 'pending') return order.status === 'pending';
        if (tab === 'confirmed') return order.status === 'confirmed';
        return false;
    }).filter(order =>
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="orders-tabs">
            <div className="tabs-row">
                <button className={tab === 'pending' ? 'tab-active' : ''} onClick={() => handleTabClick('pending')}>Cần xử lý</button>
                <button className={tab === 'confirmed' ? 'tab-active' : ''} onClick={() => handleTabClick('confirmed')}>Đã xác nhận</button>
            </div>
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
                            <th>Thao tác</th>
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
                                <td>{order.status === 'pending' ? 'Chờ xác nhận' : 'Đã xác nhận'}</td>
                                <td>{order.items}</td>
                                <td>{order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                                <td style={{ display: 'flex', gap: 8 }}>
                                    <Link to={`/staff/orders/${order.id}`} className="btn-view">Xem chi tiết</Link>
                                    {tab === 'pending' && (
                                        <button className="btn-view" style={{ marginLeft: 8 }} onClick={() => alert(`Xác nhận đơn ${order.id}`)}>Xác nhận đơn</button>
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

export default OrdersTabs;
