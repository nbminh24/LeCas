import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import './Checkout.css';

const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the order to your backend
        console.log('Order submitted:', { formData, items: cart });

        // Clear cart and navigate to confirmation
        clearCart();
        navigate('/user/orders');

        // Show success message
        alert('Order placed successfully!');
    };

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const total = subtotal + tax + shipping;

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <div className="checkout-grid">
                <div className="checkout-form-container">
                    <h2>Shipping Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <h2>Payment Information</h2>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardName">Name on Card</label>
                            <input
                                type="text"
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    placeholder="123"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="checkout-button">Place Order</button>
                    </form>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                                <div className="item-price">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="price-details">
                        <div className="price-row">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="price-row">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="price-row total">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
