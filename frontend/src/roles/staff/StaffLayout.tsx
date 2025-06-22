import React from 'react';
import { Outlet } from 'react-router-dom';
import './StaffLayout.css';

const StaffLayout: React.FC = () => {
    return (
        <div className="staff-layout">
            <div className="staff-sidebar">
                <div className="staff-logo">Staff Portal</div>
                <nav className="staff-nav">
                    <ul>
                        <li><a href="/staff/dashboard">Dashboard</a></li>
                        <li><a href="/staff/orders">Orders</a></li>
                        <li><a href="/staff/search">Search Orders</a></li>
                        <li className="staff-nav-subtitle">Warehouse</li>
                        <li><a href="/staff/warehouse/inventory">Inventory</a></li>
                        <li className="staff-nav-subtitle">Shipping</li>
                        <li><a href="/staff/shipping/shipments">Shipments</a></li>
                    </ul>
                </nav>
            </div>
            <div className="staff-content">
                <header className="staff-header">
                    <div className="staff-search">
                        <input type="text" placeholder="Search orders..." />
                        <button>Search</button>
                    </div>
                    <div className="staff-user">
                        <div className="staff-notifications">
                            <span>3</span>
                        </div>
                        <div className="staff-profile">
                            <img src="https://via.placeholder.com/40" alt="Staff" />
                            <span>Staff User</span>
                        </div>
                    </div>
                </header>
                <main className="staff-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StaffLayout;
