import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../constants/routes';
import './StaffLayout.css';

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
                    <nav className="staff-nav">
                        <div className="nav-section">
                            <h3>Order Management</h3>
                            <ul>
                                <li>
                                    <Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>
                                        <span className="icon">📊</span>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/orders" className={isActive('/staff/orders')}>
                                        <span className="icon">📦</span>
                                        Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/search" className={isActive('/staff/search')}>
                                        <span className="icon">🔍</span>
                                        Search Orders
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                );

            case UserRole.STAFF_WAREHOUSE:
                return (
                    <nav className="staff-nav">
                        <div className="nav-section">
                            <h3>Warehouse Management</h3>
                            <ul>
                                <li>
                                    <Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>
                                        <span className="icon">📊</span>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/warehouse/inventory" className={isActive('/staff/warehouse/inventory')}>
                                        <span className="icon">📦</span>
                                        Inventory
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/warehouse/reports" className={isActive('/staff/warehouse/reports')}>
                                        <span className="icon">📋</span>
                                        Stock Reports
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                );

            case UserRole.STAFF_SHIPPING:
                return (
                    <nav className="staff-nav">
                        <div className="nav-section">
                            <h3>Shipping Management</h3>
                            <ul>
                                <li>
                                    <Link to="/staff/dashboard" className={isActive('/staff/dashboard')}>
                                        <span className="icon">📊</span>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/shipping/shipments" className={isActive('/staff/shipping/shipments')}>
                                        <span className="icon">🚚</span>
                                        Shipments
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/shipping/tracking" className={isActive('/staff/shipping/tracking')}>
                                        <span className="icon">📍</span>
                                        Tracking
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
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
        <div className="staff-layout">
            <aside className="staff-sidebar">
                <div className="sidebar-header">
                    <div className="staff-logo">
                        <span className="logo-icon">🏢</span>
                        <h2>{roleDisplay} Portal</h2>
                    </div>
                    <div className="user-info">
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
                </div>

                {renderNavigation()}

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="icon">🚪</span>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="staff-content">
                <header className="content-header">
                    <div className="header-actions">
                        <button className="icon-button">
                            <span className="icon">🔔</span>
                            <span className="badge">3</span>
                        </button>
                        <button className="icon-button">
                            <span className="icon">⚙️</span>
                        </button>
                    </div>
                </header>

                <div className="content-main">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default StaffLayout;
