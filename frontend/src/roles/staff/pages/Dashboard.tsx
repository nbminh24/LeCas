import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="staff-dashboard">
            <h1>Staff Dashboard</h1>

            <div className="staff-shortcuts">
                <div className="shortcut-card">
                    <div className="shortcut-icon">📦</div>
                    <h3>New Orders</h3>
                    <p>12 orders to process</p>
                    <a href="/staff/orders" className="shortcut-btn">View Orders</a>
                </div>
                <div className="shortcut-card">
                    <div className="shortcut-icon">🚚</div>
                    <h3>Shipments</h3>
                    <p>8 shipments to track</p>
                    <a href="/staff/shipping/shipments" className="shortcut-btn">View Shipments</a>
                </div>
                <div className="shortcut-card">
                    <div className="shortcut-icon">📊</div>
                    <h3>Inventory</h3>
                    <p>5 items low on stock</p>
                    <a href="/staff/warehouse/inventory" className="shortcut-btn">Check Inventory</a>
                </div>
            </div>

            <div className="dashboard-sections">
                <div className="dashboard-section">
                    <h2>Recent Orders</h2>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Items</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-5271</td>
                                <td>John Smith</td>
                                <td>3 items</td>
                                <td><span className="order-status new">New</span></td>
                                <td>2023-06-20</td>
                                <td><a href="/staff/orders/5271" className="action-link">Process</a></td>
                            </tr>
                            <tr>
                                <td>#ORD-5270</td>
                                <td>Lisa Johnson</td>
                                <td>2 items</td>
                                <td><span className="order-status processing">Processing</span></td>
                                <td>2023-06-20</td>
                                <td><a href="/staff/orders/5270" className="action-link">Update</a></td>
                            </tr>
                            <tr>
                                <td>#ORD-5269</td>
                                <td>Michael Brown</td>
                                <td>5 items</td>
                                <td><span className="order-status shipped">Shipped</span></td>
                                <td>2023-06-19</td>
                                <td><a href="/staff/orders/5269" className="action-link">Track</a></td>
                            </tr>
                            <tr>
                                <td>#ORD-5268</td>
                                <td>Emma Wilson</td>
                                <td>1 item</td>
                                <td><span className="order-status new">New</span></td>
                                <td>2023-06-19</td>
                                <td><a href="/staff/orders/5268" className="action-link">Process</a></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="view-all">
                        <a href="/staff/orders">View All Orders</a>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Inventory Alerts</h2>
                    <div className="inventory-list">
                        <div className="inventory-item">
                            <div className="inventory-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="inventory-details">
                                <h4>Men's Casual T-Shirt (Size L)</h4>
                                <div className="inventory-status">
                                    <div className="stock-level low">
                                        <span className="stock-count">3</span> items left in stock
                                    </div>
                                    <a href="/staff/warehouse/update-stock/101" className="action-link">Restock</a>
                                </div>
                            </div>
                        </div>
                        <div className="inventory-item">
                            <div className="inventory-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="inventory-details">
                                <h4>Women's Running Shoes (Size 8)</h4>
                                <div className="inventory-status">
                                    <div className="stock-level low">
                                        <span className="stock-count">2</span> items left in stock
                                    </div>
                                    <a href="/staff/warehouse/update-stock/102" className="action-link">Restock</a>
                                </div>
                            </div>
                        </div>
                        <div className="inventory-item">
                            <div className="inventory-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="inventory-details">
                                <h4>Leather Wallet (Brown)</h4>
                                <div className="inventory-status">
                                    <div className="stock-level low">
                                        <span className="stock-count">5</span> items left in stock
                                    </div>
                                    <a href="/staff/warehouse/update-stock/103" className="action-link">Restock</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="view-all">
                        <a href="/staff/warehouse/inventory">View All Inventory</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
