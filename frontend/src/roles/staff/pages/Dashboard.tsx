import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { UserRole } from '../../../constants/routes';
import './Dashboard.css';

// Mock data for demonstration
const mockStats = (date: string) => ({
    total: 12,
    pending: 4,
    readyToShip: 3,
    shipped: 5,
});
const mockOrders = [
    { id: 'ORD-1001', customer: 'John Smith', date: '2025-06-23', status: 'pending', items: 3 },
    { id: 'ORD-1002', customer: 'Sarah Johnson', date: '2025-06-23', status: 'pending', items: 2 },
    { id: 'ORD-1003', customer: 'Michael Brown', date: '2025-06-23', status: 'readyToShip', items: 1 },
    { id: 'ORD-1004', customer: 'Emily Davis', date: '2025-06-23', status: 'readyToShip', items: 4 },
    { id: 'ORD-1005', customer: 'David Wilson', date: '2025-06-23', status: 'shipped', items: 2 },
    { id: 'ORD-1006', customer: 'Jessica Taylor', date: '2025-06-23', status: 'shipped', items: 1 },
];
const mockActivity = [
    { time: '09:45', desc: 'Xác nhận đơn #1001' },
    { time: '10:15', desc: 'Hủy đơn #1007' },
    { time: '11:00', desc: 'Bàn giao đơn #1005 cho vận chuyển' },
];

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [searchText, setSearchText] = useState('');
    const stats = mockStats(selectedDate);

    // Click handler for stat cards
    const handleStatClick = (type: string) => {
        switch (type) {
            case 'pending':
                navigate('/staff/orders/pending?status=pending');
                break;
            case 'readyToShip':
                navigate('/staff/orders/ready-to-ship?status=readyToShip');
                break;
            case 'shipped':
                navigate('/staff/orders/shipped?status=shipped');
                break;
            default:
                navigate('/staff/orders');
        }
    };

    // Filter orders by date
    const ordersToday = mockOrders.filter(o => o.date === selectedDate);
    const filteredOrdersToday = ordersToday.filter(order =>
        order.id.toLowerCase().includes(searchText.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchText.toLowerCase())
    );

    if (!user || user.role !== UserRole.STAFF_ORDER) {
        return <div className="staff-dashboard">Unauthorized or not staff order role.</div>;
    }

    return (
        <div className="staff-dashboard order-dashboard">
            <div className="dashboard-header">
                <h2>Bảng điều khiển đơn hàng</h2>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="date-picker"
                />
            </div>
            <div className="stat-cards-row">
                <div className="stat-card" onClick={() => handleStatClick('total')}>
                    <div className="stat-label">Tổng đơn nhận</div>
                    <div className="stat-value">{stats.total}</div>
                </div>
                <div className="stat-card clickable" onClick={() => handleStatClick('pending')}>
                    <div className="stat-label">Chờ xác nhận</div>
                    <div className="stat-value">{stats.pending}</div>
                </div>
                <div className="stat-card clickable" onClick={() => handleStatClick('readyToShip')}>
                    <div className="stat-label">Chờ bàn giao vận chuyển</div>
                    <div className="stat-value">{stats.readyToShip}</div>
                </div>
                <div className="stat-card clickable" onClick={() => handleStatClick('shipped')}>
                    <div className="stat-label">Đã bàn giao vận chuyển</div>
                    <div className="stat-value">{stats.shipped}</div>
                </div>
            </div>
            <div className="dashboard-lists">
                <div className="orders-list-block">
                    <div className="orders-list-search-row">
                        <input
                            type="text"
                            placeholder="Tìm kiếm đơn hàng..."
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            className="orders-list-search-input"
                        />
                    </div>
                    <h3>Danh sách đơn đã nhận ({filteredOrdersToday.length})</h3>
                    <ul className="order-list">
                        {filteredOrdersToday.map(order => (
                            <li key={order.id} className="order-card">
                                <div>
                                    <b>{order.id}</b> - {order.customer} ({order.items} sản phẩm)
                                    <span className={`order-status-badge status-${order.status}`}>{order.status === 'pending' ? 'Chờ xác nhận' : order.status === 'readyToShip' ? 'Chờ bàn giao' : order.status === 'shipped' ? 'Đã bàn giao' : order.status}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="activity-block">
                    <h3>Nhật ký hoạt động</h3>
                    <ul className="activity-list">
                        {mockActivity.map((a, idx) => (
                            <li key={idx}><span className="activity-time">{a.time}</span> {a.desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
