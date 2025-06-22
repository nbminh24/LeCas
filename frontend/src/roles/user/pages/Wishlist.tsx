import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';

// Mock data for wishlist items
const mockWishlistItems = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 129.99,
        imageUrl: 'https://placehold.co/600x400?text=Headphones',
        inStock: true
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 249.99,
        imageUrl: 'https://placehold.co/600x400?text=Smart+Watch',
        inStock: true
    },
    {
        id: '3',
        name: 'Bluetooth Speaker',
        price: 79.99,
        imageUrl: 'https://placehold.co/600x400?text=Speaker',
        inStock: false
    },
    {
        id: '4',
        name: 'Laptop Backpack',
        price: 59.99,
        imageUrl: 'https://placehold.co/600x400?text=Backpack',
        inStock: true
    }
];

const Wishlist: React.FC = () => {
    const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

    const removeFromWishlist = (id: string) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
    };

    return (
        <div className="wishlist-container">
            <h1 className="wishlist-title">My Wishlist</h1>

            {wishlistItems.length === 0 ? (
                <div className="empty-wishlist">
                    <p>Your wishlist is empty.</p>
                    <Link to="/products" className="browse-products-btn">Browse Products</Link>
                </div>
            ) : (
                <>
                    <div className="wishlist-grid">
                        {wishlistItems.map(item => (
                            <div key={item.id} className="wishlist-item">
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromWishlist(item.id)}
                                    aria-label="Remove from wishlist"
                                >
                                    &times;
                                </button>

                                <div className="wishlist-item-image">
                                    <img src={item.imageUrl} alt={item.name} />
                                </div>

                                <div className="wishlist-item-details">
                                    <h3><Link to={`/products/${item.id}`}>{item.name}</Link></h3>
                                    <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                                    <p className={`stock-status ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                </div>

                                <div className="wishlist-item-actions">
                                    {item.inStock ? (
                                        <button className="add-to-cart-btn">Add to Cart</button>
                                    ) : (
                                        <button className="notify-btn">Notify When Available</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="wishlist-actions">
                        <Link to="/products" className="continue-shopping-btn">Continue Shopping</Link>
                        <button className="clear-wishlist-btn" onClick={() => setWishlistItems([])}>
                            Clear Wishlist
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Wishlist;
