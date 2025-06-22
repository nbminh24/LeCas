import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout title="User Dashboard">
            <div className="dashboard-container">
                <div className="dashboard-section user-info">
                    <h2>User Information</h2>
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
                    <h2>Welcome to Your Dashboard</h2>
                    <div className="content-card">
                        <p>This is your personalized dashboard. You can customize this space with widgets and information relevant to your needs.</p>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons">
                        <button className="action-button">View Profile</button>
                        <button className="action-button">Edit Settings</button>
                        <button className="action-button">View Help</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>);
};

export default Dashboard;
