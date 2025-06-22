import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    // Mock product data - in a real app, this would come from an API
    const product = {
        id,
        name: "Men's Premium Cotton T-Shirt",
        price: 29.99,
        description: "A premium quality cotton t-shirt that offers both comfort and style. Perfect for casual everyday wear.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy', 'Gray'],
        images: [
            'https://via.placeholder.com/600x800',
            'https://via.placeholder.com/600x800',
            'https://via.placeholder.com/600x800',
            'https://via.placeholder.com/600x800'
        ],
        rating: 4.5,
        reviewCount: 128,
        inStock: true
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        alert(`Added ${quantity} ${product.name} (Size: ${selectedSize}) to cart!`);
        // In a real app, this would dispatch an action to add the item to the cart
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert('Please select a size');
            return;
        }

        alert(`Proceeding to checkout with ${quantity} ${product.name} (Size: ${selectedSize})`);
        // In a real app, this would add to cart and redirect to checkout
    };

    return (
        <div className="product-detail-page">
            <div className="product-breadcrumb">
                <a href="/">Home</a> &gt; <a href="/products">Products</a> &gt; <span>{product.name}</span>
            </div>

            <div className="product-container">
                <div className="product-images">
                    <div className="main-image">
                        <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="thumbnail-images">
                        {product.images.map((image, index) => (
                            <div key={index} className="thumbnail">
                                <img src={image} alt={`${product.name} view ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="product-details">
                    <h1 className="product-name">{product.name}</h1>

                    <div className="product-rating">
                        <div className="stars">
                            {'★'.repeat(Math.floor(product.rating))}
                            {product.rating % 1 !== 0 ? '½' : ''}
                            {'☆'.repeat(5 - Math.ceil(product.rating))}
                        </div>
                        <span className="review-count">{product.reviewCount} reviews</span>
                    </div>

                    <div className="product-price">${product.price.toFixed(2)}</div>

                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>

                    <div className="product-options">
                        <div className="size-selection">
                            <label>Size:</label>
                            <div className="size-options">
                                {product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="color-selection">
                            <label>Color:</label>
                            <div className="color-options">
                                {product.colors.map(color => (
                                    <button
                                        key={color}
                                        className="color-option"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="quantity-selection">
                            <label>Quantity:</label>
                            <div className="quantity-input">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                />
                                <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                            </div>
                        </div>
                    </div>

                    <div className="product-actions">
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        <button className="buy-now" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                        <button className="add-to-wishlist">
                            ❤ Wishlist
                        </button>
                    </div>

                    <div className="product-meta">
                        <div className="availability">
                            <span className="label">Availability:</span>
                            <span className={`value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                        <div className="category">
                            <span className="label">Category:</span>
                            <span className="value">Men's Clothing, T-Shirts</span>
                        </div>
                        <div className="sku">
                            <span className="label">SKU:</span>
                            <span className="value">TSH-{id}-BLK</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-tabs">
                <div className="tabs-header">
                    <button className="tab active">Description</button>
                    <button className="tab">Reviews ({product.reviewCount})</button>
                    <button className="tab">Shipping & Returns</button>
                </div>
                <div className="tab-content">
                    <h3>Product Description</h3>
                    <p>
                        Our premium cotton t-shirt is designed with quality and comfort in mind. Made from 100% organic cotton, this t-shirt is soft, breathable, and perfect for everyday wear.
                    </p>
                    <h4>Features:</h4>
                    <ul>
                        <li>100% organic cotton</li>
                        <li>Pre-shrunk fabric</li>
                        <li>Durable stitching</li>
                        <li>Classic fit</li>
                        <li>Round neckline</li>
                        <li>Available in multiple colors</li>
                    </ul>
                    <h4>Care Instructions:</h4>
                    <p>
                        Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron if necessary.
                    </p>
                </div>
            </div>

            <div className="related-products">
                <h2>You May Also Like</h2>
                <div className="products-slider">
                    <div className="product-slide">
                        <img src="https://via.placeholder.com/200x250" alt="Related Product" />
                        <h3>Cotton Polo Shirt</h3>
                        <div className="slide-price">$34.99</div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-slide">
                        <img src="https://via.placeholder.com/200x250" alt="Related Product" />
                        <h3>V-Neck T-Shirt</h3>
                        <div className="slide-price">$24.99</div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-slide">
                        <img src="https://via.placeholder.com/200x250" alt="Related Product" />
                        <h3>Long Sleeve Henley</h3>
                        <div className="slide-price">$39.99</div>
                        <button>Add to Cart</button>
                    </div>
                    <div className="product-slide">
                        <img src="https://via.placeholder.com/200x250" alt="Related Product" />
                        <h3>Graphic Print T-Shirt</h3>
                        <div className="slide-price">$27.99</div>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
