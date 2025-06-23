import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './UserLayout.css';

const UserLayout: React.FC = () => {
    // Admin portal secret key press counter
    const [adminKeyPresses, setAdminKeyPresses] = useState(0);
    const [showAdminLink, setShowAdminLink] = useState(false);

    // Reset key press counter after some time
    useEffect(() => {
        if (adminKeyPresses > 0) {
            const timer = setTimeout(() => {
                setAdminKeyPresses(0);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [adminKeyPresses]);

    // Secret key press detection for admin portal
    const handleFooterClick = () => {
        setAdminKeyPresses(prev => {
            const newCount = prev + 1;
            if (newCount >= 5) {
                setShowAdminLink(true);
                setTimeout(() => setShowAdminLink(false), 3000);
                return 0;
            }
            return newCount;
        });
    };

    return (
        <div className="user-layout">
            <header className="user-header">
                <div className="user-logo">
                    <a href="/">E-Commerce</a>
                </div>
                <nav className="user-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/cart">Cart</a></li>
                        <li><a href="/orders">Orders</a></li>
                        <li><a href="/wishlist">Wishlist</a></li>
                    </ul>
                </nav>
                <div className="user-actions">
                    <div className="user-search">
                        <input type="text" placeholder="Search products..." />
                        <button>Search</button>
                    </div>
                    <div className="user-cart">
                        <a href="/cart">
                            <span className="cart-icon">🛒</span>
                            <span className="cart-count">3</span>
                        </a>
                    </div>
                    <div className="user-profile">
                        <img src="https://via.placeholder.com/40" alt="User" />
                        <div className="user-dropdown">
                            <span className="user-name">John Doe</span>
                            <ul className="dropdown-menu">
                                <li><a href="/profile">Profile</a></li>
                                <li><a href="/orders">My Orders</a></li>
                                <li><a href="/wishlist">Wishlist</a></li>
                                <li><a href="/login">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <main className="user-main">
                <Outlet />
            </main>
            <footer className="user-footer" onClick={handleFooterClick}>
                <div className="footer-section">
                    <h3>Shop</h3>
                    <ul>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/products?category=clothes">Clothes</a></li>
                        <li><a href="/products?category=shoes">Shoes</a></li>
                        <li><a href="/products?category=accessories">Accessories</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Information</h3>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/terms">Terms & Conditions</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>My Account</h3>
                    <ul>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/orders">My Orders</a></li>
                        <li><a href="/wishlist">Wishlist</a></li>
                        <li><a href="/cart">Cart</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Subscribe to our newsletter to get updates on our latest offers!</p>
                    <div className="newsletter-form">
                        <input type="email" placeholder="Enter your email" />
                        <button className="btn-primary">Subscribe</button>
                    </div>
                </div>
            </footer>

            {/* Copyright section with hidden admin access */}
            <div className="copyright-section" onClick={handleFooterClick}>
                <p>&copy; {new Date().getFullYear()} Modern E-Commerce. All rights reserved.</p>
                {showAdminLink && (
                    <div className="admin-portal-hint">
                        <Link to="/login?portal=admin">Admin Portal</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLayout;
