import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../constants/routes';
import './StaffLayout.css';
import '../../styles/modern-ecommerce.css';

const StaffLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const isActive = (path: string) => {
        return location.pathname.startsWith(path) ? 'active' : '';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const renderNavigation = () => {
        if (!user) return null;

        switch (user.role) {
            case UserRole.STAFF_ORDER:
                return (
                    <ul>
                        <li><Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>Bảng điều khiển</Link></li>
                        <li><Link to="/staff/orders/pending" className={isActive('/staff/orders/pending')}>Cần xử lý</Link></li>
                        <li><Link to="/staff/orders/confirmed" className={isActive('/staff/orders/confirmed')}>Đã xác nhận</Link></li>
                    </ul>
                );

            case UserRole.STAFF_WAREHOUSE:
                return (
                    <ul>
                        <li><Link to="/staff/warehouse/inventory" className={isActive('/staff/warehouse/inventory')}>Quản lý kho hàng</Link></li>
                        <li><Link to="/staff/warehouse/orders" className={isActive('/staff/warehouse/orders')}>Đơn cần xử lý</Link></li>
                        <li><Link to="/staff/warehouse/packed" className={isActive('/staff/warehouse/packed')}>Đơn đã đóng gói</Link></li>
                        <li><Link to="/staff/warehouse/import" className={isActive('/staff/warehouse/import')}>Nhập hàng</Link></li>
                        <li><Link to="/staff/warehouse/returns" className={isActive('/staff/warehouse/returns')}>Đổi/Trả hàng</Link></li>
                        <li><Link to="/staff/warehouse/reports" className={isActive('/staff/warehouse/reports')}>Báo cáo kho</Link></li>
                    </ul>
                );

            case UserRole.STAFF_SHIPPING:
                return (
                    <ul>
                        <li><Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>Bảng điều khiển</Link></li>
                        <li><Link to="/staff/shipping/orders/pending" className={isActive('/staff/shipping/orders/pending')}>Đơn chờ giao</Link></li>
                        <li><Link to="/staff/shipping/orders/created" className={isActive('/staff/shipping/orders/created')}>Đã tạo vận đơn</Link></li>
                        <li><Link to="/staff/shipping/orders/delivered" className={isActive('/staff/shipping/orders/delivered')}>Đã giao thành công</Link></li>
                        <li><Link to="/staff/shipping/orders/failed" className={isActive('/staff/shipping/orders/failed')}>Giao thất bại</Link></li>
                        <li><Link to="/staff/shipping/orders/cancelled" className={isActive('/staff/shipping/orders/cancelled')}>Đã hủy vận đơn</Link></li>
                    </ul>
                );
            default:
                return null;
        }
    };

    if (!user) {
        return <div className="loading-screen">Loading...</div>;
    }

    const roleDisplay = user.role.replace('staff_', '').charAt(0).toUpperCase() +
        user.role.replace('staff_', '').slice(1);

    return (
        <div className="staff-layout modern-layout">
            <aside className="staff-sidebar admin-sidebar">
                <div className="sidebar-header admin-logo">
                    <span className="logo-icon">🏢</span>
                    <h2>Quản lý đơn hàng</h2>
                </div>
                <nav className="staff-nav admin-nav">
                    {renderNavigation()}
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="icon">🚪</span>
                        Đăng xuất
                    </button>
                </div>
            </aside>
            <div className="staff-content admin-content">
                <header className="staff-header admin-header">
                    <div className="staff-user admin-user">
                        <div className="staff-profile admin-profile">
                            <img
                                src={user.avatar || '/default-avatar.png'}
                                alt={user.displayName || user.email}
                            />
                            <span>{user.displayName || user.email}</span>
                        </div>
                    </div>
                </header>
                <main className="staff-main admin-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StaffLayout;
