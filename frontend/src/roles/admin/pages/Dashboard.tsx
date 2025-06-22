import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p className="stat-value">145</p>
                    <p className="stat-change positive">+12% from last month</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p className="stat-value">$12,456</p>
                    <p className="stat-change positive">+8.3% from last month</p>
                </div>
                <div className="stat-card">
                    <h3>Active Users</h3>
                    <p className="stat-value">1,245</p>
                    <p className="stat-change positive">+5.7% from last month</p>
                </div>
                <div className="stat-card">
                    <h3>Products Sold</h3>
                    <p className="stat-value">327</p>
                    <p className="stat-change negative">-2.3% from last month</p>
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
                                <th>Status</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-5271</td>
                                <td>John Smith</td>
                                <td><span className="order-status completed">Completed</span></td>
                                <td>2023-06-20</td>
                                <td>$125.00</td>
                            </tr>
                            <tr>
                                <td>#ORD-5270</td>
                                <td>Lisa Johnson</td>
                                <td><span className="order-status processing">Processing</span></td>
                                <td>2023-06-20</td>
                                <td>$85.50</td>
                            </tr>
                            <tr>
                                <td>#ORD-5269</td>
                                <td>Michael Brown</td>
                                <td><span className="order-status completed">Completed</span></td>
                                <td>2023-06-19</td>
                                <td>$220.75</td>
                            </tr>
                            <tr>
                                <td>#ORD-5268</td>
                                <td>Emma Wilson</td>
                                <td><span className="order-status pending">Pending</span></td>
                                <td>2023-06-19</td>
                                <td>$45.25</td>
                            </tr>
                            <tr>
                                <td>#ORD-5267</td>
                                <td>James Taylor</td>
                                <td><span className="order-status cancelled">Cancelled</span></td>
                                <td>2023-06-18</td>
                                <td>$130.00</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="view-all">
                        <a href="/admin/orders">View All Orders</a>
                    </div>
                </div>

                <div className="dashboard-section">
                    <h2>Top Selling Products</h2>
                    <div className="product-list">
                        <div className="product-item">
                            <div className="product-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="product-details">
                                <h4>Men's Casual T-Shirt</h4>
                                <p>52 sold</p>
                                <p className="product-price">$29.99</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="product-details">
                                <h4>Women's Running Shoes</h4>
                                <p>43 sold</p>
                                <p className="product-price">$89.99</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="product-details">
                                <h4>Leather Wallet</h4>
                                <p>38 sold</p>
                                <p className="product-price">$45.50</p>
                            </div>
                        </div>
                        <div className="product-item">
                            <div className="product-image">
                                <img src="https://via.placeholder.com/50" alt="Product" />
                            </div>
                            <div className="product-details">
                                <h4>Wireless Headphones</h4>
                                <p>35 sold</p>
                                <p className="product-price">$129.99</p>
                            </div>
                        </div>
                    </div>
                    <div className="view-all">
                        <a href="/admin/products">View All Products</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
