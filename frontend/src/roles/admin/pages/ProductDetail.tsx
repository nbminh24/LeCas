import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Dashboard.css';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    sizes: string[];
    colors: string[];
    images: string[];
    stock: number;
    rating: number;
    numReviews: number;
    createdAt: string;
}

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setProduct({
                id: id || '1',
                name: 'Premium Cotton T-Shirt',
                description: 'High-quality cotton t-shirt with a comfortable fit. Perfect for everyday wear. Available in multiple sizes and colors.',
                price: 24.99,
                category: 'Shirts',
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['White', 'Black', 'Navy', 'Gray'],
                images: [
                    'https://via.placeholder.com/600x400?text=T-Shirt+Front',
                    'https://via.placeholder.com/600x400?text=T-Shirt+Back',
                    'https://via.placeholder.com/600x400?text=T-Shirt+Side'
                ],
                stock: 75,
                rating: 4.5,
                numReviews: 28,
                createdAt: '2023-06-15'
            });
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) {
        return <div className="loading">Loading product details...</div>;
    }

    if (!product) {
        return <div className="error">Product not found</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Product Details</h1>
                <div className="header-actions">
                    <Link to={`/admin/products/edit/${product.id}`} className="btn-primary">Edit Product</Link>
                    <Link to="/admin/products" className="btn-secondary">Back to Products</Link>
                </div>
            </div>

            <div className="product-detail-container">
                <div className="product-images">
                    <div className="main-image">
                        <img src={product.images[0]} alt={product.name} />
                    </div>
                    <div className="thumbnail-container">
                        {product.images.map((image, index) => (
                            <div key={index} className="thumbnail">
                                <img src={image} alt={`${product.name} view ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <h2>{product.name}</h2>
                    <div className="price-stock">
                        <div className="price">${product.price.toFixed(2)}</div>
                        <div className={`stock ${product.stock > 20 ? 'in-stock' : 'low-stock'}`}>
                            {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                        </div>
                    </div>

                    <div className="product-meta">
                        <div className="meta-item">
                            <span className="label">Category:</span>
                            <span className="value">{product.category}</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Rating:</span>
                            <span className="value">{product.rating} ★ ({product.numReviews} reviews)</span>
                        </div>
                        <div className="meta-item">
                            <span className="label">Added on:</span>
                            <span className="value">{product.createdAt}</span>
                        </div>
                    </div>

                    <div className="product-variants">
                        <div className="variant-section">
                            <h3>Available Sizes</h3>
                            <div className="variant-options">
                                {product.sizes.map(size => (
                                    <div key={size} className="variant-tag">{size}</div>
                                ))}
                            </div>
                        </div>

                        <div className="variant-section">
                            <h3>Available Colors</h3>
                            <div className="variant-options">
                                {product.colors.map(color => (
                                    <div key={color} className="variant-tag">{color}</div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="product-description">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
