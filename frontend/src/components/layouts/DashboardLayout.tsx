import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './DashboardLayout.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

/**
 * A reusable dashboard layout component that includes header, navigation and content area
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>{title}</h1>
                </div>
                <div className="header-right">
                    <div className="user-info-mini">
                        <span className="user-name">{user?.name || user?.displayName}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-body">
                <aside className="dashboard-sidebar">
                    <nav className="dashboard-nav">
                        <ul>
                            <li>
                                <a href="/user/dashboard" className={window.location.pathname === '/user/dashboard' ? 'active' : ''}>
                                    Dashboard
                                </a>
                            </li>
                            {user?.role === 'admin' && (
                                <li>
                                    <a href="/admin/dashboard" className={window.location.pathname === '/admin/dashboard' ? 'active' : ''}>
                                        Admin Dashboard
                                    </a>
                                </li>
                            )}
                            <li>
                                <a href="#profile">Profile</a>
                            </li>
                            <li>
                                <a href="#settings">Settings</a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <main className="dashboard-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
