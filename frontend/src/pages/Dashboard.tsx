import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome to Dashboard</h1>
                <button className="btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="dashboard-content">                <div className="user-info">                <h2>User Information</h2>
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
                    <h2>Blank Dashboard</h2>
                    <p>This is a blank dashboard page. You can add your content here.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
