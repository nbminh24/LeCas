import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { UserRole } from '../../../constants/routes';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    const renderDashboardContent = () => {
        if (!user) return null;

        switch (user.role) {
            case UserRole.STAFF_ORDER:
                return (
                    <div className="dashboard-grid">
                        <div className="stat-card">
                            <h3>Pending Orders</h3>
                            <div className="stat-value">23</div>
                            <div className="stat-label">Needs Processing</div>
                        </div>
                        <div className="stat-card">
                            <h3>Processing</h3>
                            <div className="stat-value">15</div>
                            <div className="stat-label">In Progress</div>
                        </div>
                        <div className="stat-card">
                            <h3>Completed Today</h3>
                            <div className="stat-value">45</div>
                            <div className="stat-label">Orders Processed</div>
                        </div>
                        <div className="stat-card">
                            <h3>Customer Queries</h3>
                            <div className="stat-value">7</div>
                            <div className="stat-label">Need Response</div>
                        </div>
                    </div>
                );

            case UserRole.STAFF_WAREHOUSE:
                return (
                    <div className="dashboard-grid">
                        <div className="stat-card">
                            <h3>Low Stock Items</h3>
                            <div className="stat-value">12</div>
                            <div className="stat-label">Need Restock</div>
                        </div>
                        <div className="stat-card">
                            <h3>Pending Deliveries</h3>
                            <div className="stat-value">8</div>
                            <div className="stat-label">Arriving Today</div>
                        </div>
                        <div className="stat-card">
                            <h3>Stock Updates</h3>
                            <div className="stat-value">34</div>
                            <div className="stat-label">Items Updated</div>
                        </div>
                        <div className="stat-card">
                            <h3>Storage Usage</h3>
                            <div className="stat-value">78%</div>
                            <div className="stat-label">Capacity</div>
                        </div>
                    </div>
                );

            case UserRole.STAFF_SHIPPING:
                return (
                    <div className="dashboard-grid">
                        <div className="stat-card">
                            <h3>Pending Shipments</h3>
                            <div className="stat-value">18</div>
                            <div className="stat-label">To Process</div>
                        </div>
                        <div className="stat-card">
                            <h3>In Transit</h3>
                            <div className="stat-value">42</div>
                            <div className="stat-label">Active Deliveries</div>
                        </div>
                        <div className="stat-card">
                            <h3>Delivered Today</h3>
                            <div className="stat-value">27</div>
                            <div className="stat-label">Completed</div>
                        </div>
                        <div className="stat-card">
                            <h3>Issues</h3>
                            <div className="stat-value">3</div>
                            <div className="stat-label">Need Attention</div>
                        </div>
                    </div>
                );

            default:
                return <div>Invalid staff role</div>;
        }
    };

    return (
        <div className="staff-dashboard">
            {renderDashboardContent()}
            <div className="dashboard-charts">
                <div className="chart-container">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="activity-time">09:45 AM</span>
                            <span className="activity-description">New order #12345 received</span>
                        </div>
                        <div className="activity-item">
                            <span className="activity-time">10:15 AM</span>
                            <span className="activity-description">Updated inventory for SKU-789</span>
                        </div>
                        <div className="activity-item">
                            <span className="activity-time">11:30 AM</span>
                            <span className="activity-description">Shipment #54321 marked as delivered</span>
                        </div>
                    </div>
                </div>
                <div className="chart-container">
                    <h3>Tasks</h3>
                    <div className="task-list">
                        <div className="task-item">
                            <input type="checkbox" id="task1" />
                            <label htmlFor="task1">Process pending orders</label>
                        </div>
                        <div className="task-item">
                            <input type="checkbox" id="task2" />
                            <label htmlFor="task2">Update shipping status</label>
                        </div>
                        <div className="task-item">
                            <input type="checkbox" id="task3" />
                            <label htmlFor="task3">Review inventory reports</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
