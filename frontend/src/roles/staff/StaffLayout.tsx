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
                        <li><Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>Dashboard</Link></li>
                        <li><Link to="/staff/orders" className={isActive('/staff/orders')}>Orders</Link></li>
                    </ul>
                );

            case UserRole.STAFF_WAREHOUSE:
                return (
                    <ul>
                        <li><Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>Dashboard</Link></li>
                        <li><Link to="/staff/warehouse/inventory" className={isActive('/staff/warehouse/inventory')}>Inventory</Link></li>
                        <li><Link to="/staff/warehouse/reports" className={isActive('/staff/warehouse/reports')}>Stock Reports</Link></li>
                    </ul>
                );

            case UserRole.STAFF_SHIPPING:
                return (
                    <ul>
                        <li><Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>Dashboard</Link></li>
                        <li><Link to="/staff/shipping/shipments" className={isActive('/staff/shipping/shipments')}>Shipments</Link></li>
                        <li><Link to="/staff/shipping/tracking" className={isActive('/staff/shipping/tracking')}>Tracking</Link></li>
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
                    <h2>{roleDisplay} Portal</h2>
                </div>
                <div className="user-info admin-profile">
                    <img
                        src={user.avatar || '/default-avatar.png'}
                        alt={user.displayName || user.email}
                        className="user-avatar"
                    />
                    <div className="user-details">
                        <span className="user-name">{user.displayName || user.email}</span>
                        <span className="user-role">{roleDisplay}</span>
                    </div>
                </div>
                <nav className="staff-nav admin-nav">
                    {renderNavigation()}
                </nav>
                <div className="sidebar-footer">
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
