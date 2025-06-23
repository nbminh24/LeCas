import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductList.css'; // Reusing the ProductList styling

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    imageUrl: string;
    rating: number;
    isNew?: boolean;
    isSale?: boolean;
}

const ProductByCategory: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<string>('newest');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

    useEffect(() => {
        // Simulate API call to fetch products
        setTimeout(() => {
            const mockProducts: Product[] = [
                { id: '1', name: 'Premium Black T-Shirt', price: 29.99, category: 'men', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.7, isNew: true },
                { id: '2', name: 'Women\'s Summer Dress', price: 39.99, originalPrice: 59.99, category: 'women', imageUrl: 'https://via.placeholder.com/500x500', rating: 5.0, isSale: true },
                { id: '3', name: 'Leather Wallet', price: 45.50, category: 'accessories', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.2 },
                { id: '4', name: 'Running Shoes', price: 89.99, category: 'shoes', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.5 },
                { id: '5', name: 'Men\'s Formal Shirt', price: 49.99, category: 'men', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.3 },
                { id: '6', name: 'Women\'s Jeans', price: 59.99, category: 'women', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.6 },
                { id: '7', name: 'Designer Watch', price: 199.99, category: 'accessories', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.9, isNew: true },
                { id: '8', name: 'Casual Sneakers', price: 69.99, originalPrice: 89.99, category: 'shoes', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.4, isSale: true },
                { id: '9', name: 'Black Leather Jacket', price: 149.99, category: 'men', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.8 },
                { id: '10', name: 'Women\'s Blouse', price: 34.99, category: 'women', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.4 },
                { id: '11', name: 'Stylish Sunglasses', price: 79.99, category: 'accessories', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.1 },
                { id: '12', name: 'Formal Leather Shoes', price: 119.99, category: 'shoes', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.7 }
            ];

            // Filter products by category
            const filteredByCategory = category
                ? mockProducts.filter(product => product.category.toLowerCase() === category.toLowerCase())
                : mockProducts;

            setProducts(filteredByCategory);
            setLoading(false);
        }, 300);
    }, [category]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseInt(e.target.value);
        const newRange = [...priceRange] as [number, number];
        newRange[index] = value;
        setPriceRange(newRange);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    };

    const filteredProducts = products
        .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'rating-desc':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

    const getCategoryName = () => {
        if (!category) return 'All Products';

        // Capitalize first letter
        return category.charAt(0).toUpperCase() + category.slice(1);
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="product-list-page">
            <div className="filters-sidebar">
                <div className="filter-section">
                    <h3>Categories</h3>
                    <div className="category-filters">
                        <div className="category-filter-item">
                            <Link to="/products/men" className={category === 'men' ? 'active' : ''}>Men</Link>
                        </div>
                        <div className="category-filter-item">
                            <Link to="/products/women" className={category === 'women' ? 'active' : ''}>Women</Link>
                        </div>
                        <div className="category-filter-item">
                            <Link to="/products/accessories" className={category === 'accessories' ? 'active' : ''}>Accessories</Link>
                        </div>
                        <div className="category-filter-item">
                            <Link to="/products/shoes" className={category === 'shoes' ? 'active' : ''}>Shoes</Link>
                        </div>
                    </div>
                </div>

                <div className="filter-section">
                    <h3>Price Range</h3>
                    <div className="price-range">
                        <div className="price-slider">
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, 0)}
                            />
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, 1)}
                            />
                        </div>
                        <div className="price-inputs">
                            <div className="price-input">
                                <input
                                    type="number"
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceChange(e, 0)}
                                    min="0"
                                    max={priceRange[1] - 1}
                                />
                            </div>
                            <span>to</span>
                            <div className="price-input">
                                <input
                                    type="number"
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceChange(e, 1)}
                                    min={priceRange[0] + 1}
                                    max="200"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="products-grid-container">
                <div className="products-header">
                    <h2>{getCategoryName()}</h2>
                    <div className="products-count">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </div>
                    <div className="sort-by">
                        <span>Sort by:</span>
                        <select value={sortBy} onChange={handleSortChange}>
                            <option value="newest">Newest</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                            <option value="rating-desc">Top Rated</option>
                        </select>
                    </div>
                </div>

                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <img src={product.imageUrl} alt={product.name} />
                                    <div className="product-badges">
                                        {product.isNew && <span className="badge badge-new">NEW</span>}
                                        {product.isSale && <span className="badge badge-sale">SALE</span>}
                                    </div>
                                </div>
                                <div className="product-info">
                                    <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
                                    <div className="product-price">
                                        <span className="current-price">${product.price.toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <div className="product-rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={i < Math.round(product.rating) ? 'filled' : ''}>★</span>
                                            ))}
                                        </div>
                                        <span className="rating-value">{product.rating}</span>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn-add-cart">Add to Cart</button>
                                        <button className="btn-wishlist">♥</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-products">No products found in this category. Try adjusting your filters.</div>
                    )}
                </div>

                {filteredProducts.length > 0 && (
                    <div className="pagination">
                        <button className="page-button active">1</button>
                        <button className="page-button">2</button>
                        <button className="page-button">3</button>
                        <button className="page-button">4</button>
                        <button className="page-button">5</button>
                        <button className="page-button">→</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductByCategory;
