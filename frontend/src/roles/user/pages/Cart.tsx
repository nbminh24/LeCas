import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

interface CartItem {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    size: string;
    color: string;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'Classic T-Shirt',
            price: 19.99,
            imageUrl: 'https://via.placeholder.com/150',
            quantity: 2,
            size: 'M',
            color: 'Black'
        },
        {
            id: '2',
            name: 'Slim Fit Jeans',
            price: 49.99,
            imageUrl: 'https://via.placeholder.com/150',
            quantity: 1,
            size: '32',
            color: 'Blue'
        }
    ]);

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeItem = (id: string) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax for example
    };

    const calculateShipping = () => {
        return cartItems.length > 0 ? 5.99 : 0; // Fixed shipping rate
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() + calculateShipping();
    };

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/user/products" className="btn-primary">Continue Shopping</Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        <div className="cart-header">
                            <div className="cart-header-item product-col">Product</div>
                            <div className="cart-header-item price-col">Price</div>
                            <div className="cart-header-item quantity-col">Quantity</div>
                            <div className="cart-header-item total-col">Total</div>
                            <div className="cart-header-item action-col"></div>
                        </div>

                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="product-col">
                                    <div className="product-info">
                                        <img src={item.imageUrl} alt={item.name} className="product-image" />
                                        <div className="product-details">
                                            <Link to={`/user/products/${item.id}`} className="product-name">{item.name}</Link>
                                            <div className="product-variant">
                                                <span>Size: {item.size}</span>
                                                <span>Color: {item.color}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="price-col">
                                    ${item.price.toFixed(2)}
                                </div>

                                <div className="quantity-col">
                                    <div className="quantity-control">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                            className="quantity-input"
                                        />
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="total-col">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>

                                <div className="action-col">
                                    <button
                                        className="remove-btn"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${calculateSubtotal().toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Tax:</span>
                            <span>${calculateTax().toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>${calculateShipping().toFixed(2)}</span>
                        </div>

                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        <Link to="/user/checkout" className="btn-primary checkout-btn">Proceed to Checkout</Link>
                        <Link to="/user/products" className="btn-secondary shopping-btn">Continue Shopping</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
