import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout title="Admin Dashboard">
            <div className="admin-dashboard-container">
                <div className="dashboard-section admin-info">
                    <h2>Admin Information</h2>
                    <div className="info-card">
                        <p>
                            <strong>Name:</strong> {user?.name || user?.displayName}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <p>
                            <strong>Role:</strong> {user?.role}
                        </p>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Admin Control Panel</h2>
                    <div className="content-card">
                        <p>Welcome to the admin control panel. Here you can manage users, system settings, and view reports.</p>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>System Management</h2>
                    <div className="admin-actions">
                        <button className="admin-action-btn">Manage Users</button>
                        <button className="admin-action-btn">System Settings</button>
                        <button className="admin-action-btn">View Reports</button>
                        <button className="admin-action-btn">Security</button>
                        <button className="admin-action-btn">API Management</button>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>System Overview</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Users</h3>
                            <p className="stat-value">127</p>
                        </div>
                        <div className="stat-card">
                            <h3>Active Sessions</h3>
                            <p className="stat-value">24</p>
                        </div>
                        <div className="stat-card">
                            <h3>Admins</h3>
                            <p className="stat-value">3</p>
                        </div>
                        <div className="stat-card">
                            <h3>System Status</h3>
                            <p className="stat-value status-ok">Online</p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>);
};

export default AdminDashboard;
