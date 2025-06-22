import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
    return (
        <div className="admin-layout">
            <div className="admin-sidebar">
                <div className="admin-logo">E-Commerce Admin</div>
                <nav className="admin-nav">
                    <ul>
                        <li><a href="/admin/dashboard">Dashboard</a></li>
                        <li><a href="/admin/products">Products</a></li>
                        <li><a href="/admin/categories">Categories</a></li>
                        <li><a href="/admin/orders">Orders</a></li>
                        <li><a href="/admin/users">Users</a></li>
                        <li><a href="/admin/staff">Staff Management</a></li>
                        <li><a href="/admin/reports">Reports</a></li>
                        <li><a href="/admin/feedback">Feedback</a></li>
                    </ul>
                </nav>
            </div>
            <div className="admin-content">
                <header className="admin-header">
                    <div className="admin-search">
                        <input type="text" placeholder="Search..." />
                        <button>Search</button>
                    </div>
                    <div className="admin-user">
                        <div className="admin-notifications">
                            <span>5</span>
                        </div>
                        <div className="admin-profile">
                            <img src="https://via.placeholder.com/40" alt="Admin" />
                            <span>Admin User</span>
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
