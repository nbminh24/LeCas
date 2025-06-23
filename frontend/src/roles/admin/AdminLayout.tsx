import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './AdminLayout.css';
import '../../styles/modern-ecommerce.css';

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const { user, isAuthenticated, logout, activeRole } = useAuth();

    useEffect(() => {
        console.log("AdminLayout mounted");
        console.log("Auth state in AdminLayout:", {
            isAuthenticated,
            user,
            activeRole,
            currentPath: location.pathname
        });

        // Debug user details if available
        if (user) {
            console.log("Admin user details:", {
                id: user.id,
                email: user.email,
                role: user.role,
                displayName: user.displayName
            });
        } else {
            console.error("No user data in AdminLayout");
        }
    }, [isAuthenticated, user, activeRole, location.pathname]);

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <div className="admin-logo">Modern E-Commerce</div>
                <nav className="admin-nav">
                    <ul>
                        <li><Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>Dashboard</Link></li>
                        <li><Link to="/admin/products" className={isActive('/admin/products')}>Products</Link></li>
                        <li><Link to="/admin/categories" className={isActive('/admin/categories')}>Categories</Link></li>
                        <li><Link to="/admin/orders" className={isActive('/admin/orders')}>Orders</Link></li>
                        <li><Link to="/admin/users" className={isActive('/admin/users')}>Users</Link></li>
                        <li><Link to="/admin/staff" className={isActive('/admin/staff')}>Staff Management</Link></li>
                        <li><Link to="/admin/reports" className={isActive('/admin/reports')}>Reports</Link></li>
                        <li><Link to="/admin/feedback" className={isActive('/admin/feedback')}>Feedback</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="admin-content">                <header className="admin-header">
                <div className="admin-search">
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>
                <div className="admin-user">
                    <div className="admin-notifications">
                        <span className="material-icons">notifications</span>
                    </div>                    <div className="admin-profile">
                        <img
                            src={user?.avatar || "https://via.placeholder.com/40?text=Admin"}
                            alt={user?.displayName || "Admin"}
                        />
                        <span>{user?.displayName || "Admin User"}</span>
                        <button
                            onClick={() => {
                                console.log("Logging out admin user");
                                logout('admin');
                            }}
                            style={{
                                marginLeft: '15px',
                                background: 'var(--off-white)',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer'
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
                <main className="admin-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
