import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { UserRole } from '../../../constants/routes';
import './Dashboard.css';

// Mock data for demonstration
const mockActivity = [
    { time: '09:45', desc: 'Xác nhận đơn #1001' },
    { time: '10:15', desc: 'Hủy đơn #1007' },
    { time: '11:00', desc: 'Bàn giao đơn #1005 cho vận chuyển' },
];

const mockOrders = [
    { id: '1001', customer: 'Nguyễn Văn A', date: '2023-10-10', status: 'pending', items: 3 },
    { id: '1002', customer: 'Trần Thị B', date: '2023-10-11', status: 'readyToShip', items: 1 },
    { id: '1003', customer: 'Lê Văn C', date: '2023-10-10', status: 'shipped', items: 2 },
    { id: '1004', customer: 'Phạm Thị D', date: '2023-10-12', status: 'pending', items: 5 },
];

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [searchText, setSearchText] = useState('');

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

    // Lọc đơn chưa xử lý (pending) của ngày hôm đó
    const ordersToday = mockOrders.filter(o => o.date === selectedDate && o.status === 'pending');
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
                <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="date-picker"
                />
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
                    <h3>Danh sách đơn chưa xử lý ({filteredOrdersToday.length})</h3>
                    <ul className="order-list">
                        {filteredOrdersToday.map(order => (
                            <li key={order.id} className="order-card">
                                <div>
                                    <b>{order.id}</b> - {order.customer} ({order.items} sản phẩm)
                                    <span className={`order-status-badge status-${order.status}`}>Chờ xác nhận</span>
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
