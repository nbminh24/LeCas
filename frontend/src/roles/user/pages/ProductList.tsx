import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

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

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [sortBy, setSortBy] = useState<string>('newest'); useEffect(() => {
        // Simulate API call to fetch products
        setTimeout(() => {
            const mockProducts: Product[] = [
                { id: '1', name: 'Premium Black T-Shirt', price: 29.99, category: 'Men', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.7, isNew: true },
                { id: '2', name: 'Women\'s Summer Dress', price: 39.99, originalPrice: 59.99, category: 'Women', imageUrl: 'https://via.placeholder.com/500x500', rating: 5.0, isSale: true },
                { id: '3', name: 'Leather Wallet', price: 45.50, category: 'Accessories', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.2 },
                { id: '4', name: 'Running Shoes', price: 89.99, category: 'Shoes', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.5 },
                { id: '5', name: 'Men\'s Formal Shirt', price: 49.99, category: 'Men', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.3 },
                { id: '6', name: 'Women\'s Jeans', price: 59.99, category: 'Women', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.6 },
                { id: '7', name: 'Designer Watch', price: 199.99, category: 'Accessories', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.9, isNew: true },
                { id: '8', name: 'Casual Sneakers', price: 69.99, originalPrice: 89.99, category: 'Shoes', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.4, isSale: true },
                { id: '9', name: 'Black Leather Jacket', price: 149.99, category: 'Men', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.8 },
                { id: '10', name: 'Women\'s Blouse', price: 34.99, category: 'Women', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.4 },
                { id: '11', name: 'Stylish Sunglasses', price: 79.99, category: 'Accessories', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.1 },
                { id: '12', name: 'Formal Leather Shoes', price: 119.99, category: 'Shoes', imageUrl: 'https://via.placeholder.com/500x500', rating: 4.7 }
            ];
            setProducts(mockProducts);
            setLoading(false);
        }, 300);
    }, []);

    const categories = ['Men', 'Women', 'Accessories', 'Shoes'];

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category === selectedCategory ? '' : category);
    };

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
        .filter(product => selectedCategory ? product.category === selectedCategory : true)
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

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="product-list-page">
            <div className="filters-sidebar">
                <div className="filter-section">
                    <h3>Categories</h3>
                    <div className="category-filters">
                        {categories.map(category => (
                            <div key={category} className="category-filter-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={category === selectedCategory}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter-section">
                    <h3>Price Range</h3>
                    <div className="price-range-inputs">
                        <div className="price-input-group">
                            <label>Min:</label>
                            <input
                                type="number"
                                min="0"
                                max={priceRange[1]}
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, 0)}
                            />
                        </div>
                        <div className="price-input-group">
                            <label>Max:</label>
                            <input
                                type="number"
                                min={priceRange[0]}
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, 1)}
                            />
                        </div>
                    </div>
                    <div className="price-range-slider">
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
                    <div className="price-range-display">
                        ${priceRange[0]} - ${priceRange[1]}
                    </div>
                </div>
            </div>

            <div className="products-container">
                <div className="products-header">
                    <h1>Our Products</h1>
                    <div className="sort-options">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select id="sort-select" value={sortBy} onChange={handleSortChange}>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                            <option value="rating-desc">Highest Rated</option>
                        </select>
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <p>No products match your current filters. Try adjusting your selection.</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                <div className="pagination">
                    <button className="page-button" disabled>Previous</button>
                    <span className="page-numbers">
                        <button className="page-number active">1</button>
                        <button className="page-number">2</button>
                        <button className="page-number">3</button>
                    </span>
                    <button className="page-button">Next</button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
