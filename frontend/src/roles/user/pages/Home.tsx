import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            {/* Hero Banner */}
            <div className="banner">
                <div className="banner-content">
                    <h1 className="banner-title">Summer Collection 2023</h1>
                    <p className="banner-subtitle">Discover the latest trends in fashion</p>
                    <a href="/products" className="btn btn-primary">Shop Now</a>
                </div>
                <img src="https://via.placeholder.com/800x500" alt="Summer Collection" className="banner-image" />
            </div>            {/* Featured Categories */}
            <div className="container section">
                <h2 className="section-title">Shop by Category</h2>
                <div className="grid grid-4">
                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Men's Clothing" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Men's Clothing</h3>
                            <a href="/products/category/men" className="btn btn-outline">View All</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Women's Clothing" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Women's Clothing</h3>
                            <a href="/products/category/women" className="btn btn-outline">View All</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Accessories" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Accessories</h3>
                            <a href="/products/category/accessories" className="btn btn-outline">View All</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Shoes" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Shoes</h3>
                            <a href="/products/category/shoes" className="btn btn-outline">View All</a>
                        </div>
                    </div>
                </div>
            </div>            {/* Featured Products */}
            <div className="container section">
                <h2 className="section-title">Featured Products</h2>
                <div className="products-grid">
                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Premium Black T-Shirt" />
                        </div>                        <div className="card-content">
                            <h3 className="card-title">Premium Black T-Shirt</h3>
                            <span className="card-price">$29.99</span>
                            <div className="rating">
                                <span className="rating-value">4.7</span>
                                <span className="stars">★★★★★</span>
                            </div>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Women's Summer Dress" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Women's Summer Dress</h3>
                            <div>
                                <span className="card-price">$39.99</span>
                                <span className="card-original-price">$59.99</span>
                            </div>
                            <div className="rating">
                                <span className="rating-value">5.0</span>
                                <span className="stars">★★★★★</span>
                            </div>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Leather Wallet" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Leather Wallet</h3>
                            <span className="card-price">$45.50</span>
                            <div className="rating">
                                <span className="rating-value">4.2</span>
                                <span className="stars">★★★★☆</span>
                            </div>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>                    <div className="card">
                        <div className="card-image">
                            <img src="https://via.placeholder.com/500x500" alt="Running Shoes" />
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">Running Shoes</h3>
                            <span className="card-price">$89.99</span>
                            <div className="rating">
                                <span className="rating-value">4.5</span>
                                <span className="stars">★★★★☆</span>
                            </div>
                            <button className="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="text-center mb-xl">
                    <a href="/products" className="btn btn-outline">View All Products</a>
                </div>
            </div>            {/* Promotional Banners */}
            <div className="container section">
                <div className="grid grid-2">
                    <div className="card">
                        <div className="card-content text-center">
                            <h2>Free Shipping</h2>
                            <p className="mb-md">On all orders over $50</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-content text-center">
                            <h2>Summer Sale</h2>
                            <p className="mb-md">Up to 50% off</p>
                            <a href="/products" className="btn btn-outline">Shop Now</a>
                        </div>
                    </div>
                </div>
            </div>            {/* Newsletter Signup */}
            <div className="container section">
                <div className="card">
                    <div className="card-content text-center">
                        <h2 className="mb-md">Join Our Newsletter</h2>
                        <p className="mb-lg">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <div className="newsletter-form">                            <input type="email" placeholder="Enter your email" className="mb-md" style={{ padding: '12px', maxWidth: '400px' }} />
                            <div>
                                <button className="btn btn-primary">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
