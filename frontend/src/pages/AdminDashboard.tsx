import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button className="btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="dashboard-content">
                <div className="user-info">
                    <h2>Admin Information</h2>
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
                <div className="dashboard-body">
                    <h2>Admin Control Panel</h2>
                    <p>This is the admin dashboard with special administrative features.</p>
                    <div className="admin-actions">
                        <button className="admin-action-btn">Manage Users</button>
                        <button className="admin-action-btn">System Settings</button>
                        <button className="admin-action-btn">View Reports</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
