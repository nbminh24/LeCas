import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductList.css';
import '../../../styles/modern-ecommerce.css';

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    category: string;
    subcategory?: string;
    imageUrl: string;
    rating: number;
    isNew?: boolean;
    isSale?: boolean;
    discountPercentage?: number;
    type?: string;
    colors?: string[];
    sizes?: string[];
}

const ProductList: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [sortBy, setSortBy] = useState<string>('newest');

    // State for filter tags
    const [activeTags, setActiveTags] = useState<{
        category: string | null;
        color: string | null;
        size: string | null;
        priceRange: [number, number] | null;
    }>({
        category: null,
        color: null,
        size: null,
        priceRange: null
    });

    // State for available colors and sizes
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // State for pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(3);
    const [productsPerPage] = useState<number>(9); useEffect(() => {
        // Simulate API call to fetch products
        setTimeout(() => {
            const mockProducts: Product[] = [
                {
                    id: '1',
                    name: 'Elegant Black Coat',
                    price: 75.00,
                    originalPrice: 150.00,
                    category: 'Women',
                    subcategory: 'Coats',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Coat',
                    rating: 4.8,
                    discountPercentage: 50,
                    type: 'Coats',
                    colors: ['Black', 'Grey'],
                    sizes: ['S', 'M', 'L', 'XL']
                },
                {
                    id: '2',
                    name: 'Classic Light Coat',
                    price: 165.00,
                    originalPrice: 220.00,
                    category: 'Women',
                    subcategory: 'Coats',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Light+Coat',
                    rating: 4.9,
                    discountPercentage: 25,
                    type: 'Coats',
                    colors: ['White', 'Grey'],
                    sizes: ['M', 'L', 'XL']
                },
                {
                    id: '3',
                    name: 'Modern Black Dress',
                    price: 90.00,
                    originalPrice: 120.00,
                    category: 'Women',
                    subcategory: 'Dresses',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Dress',
                    rating: 4.8,
                    discountPercentage: 25,
                    type: 'Dresses',
                    colors: ['Black'],
                    sizes: ['S', 'M', 'L']
                },
                {
                    id: '4',
                    name: 'Elegant Grey Dress',
                    price: 75.00,
                    originalPrice: 100.00,
                    category: 'Women',
                    subcategory: 'Dresses',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Grey+Dress',
                    rating: 4.9,
                    discountPercentage: 25,
                    type: 'Dresses',
                    colors: ['Grey'],
                    sizes: ['S', 'M', 'L']
                },
                {
                    id: '5',
                    name: 'Minimalist Grey Sweater',
                    price: 63.00,
                    originalPrice: 70.00,
                    category: 'Women',
                    subcategory: 'Sweaters',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Grey+Sweater',
                    rating: 4.7,
                    discountPercentage: 10,
                    type: 'Sweater',
                    colors: ['Grey'],
                    sizes: ['S', 'M', 'L', 'XL']
                },
                {
                    id: '6',
                    name: 'Classic White Shirt',
                    price: 45.00,
                    originalPrice: 50.00,
                    category: 'Women',
                    subcategory: 'Shirts',
                    imageUrl: 'https://via.placeholder.com/500x700?text=White+Shirt',
                    rating: 5.0,
                    type: 'Shirt',
                    colors: ['White'],
                    sizes: ['S', 'M', 'L']
                },
                {
                    id: '7',
                    name: 'Charcoal Black Shirt',
                    price: 75.00,
                    originalPrice: 100.00,
                    category: 'Women',
                    subcategory: 'Shirts',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Shirt',
                    rating: 4.8,
                    discountPercentage: 25,
                    type: 'Shirt',
                    colors: ['Black'],
                    sizes: ['M', 'L', 'XL']
                },
                {
                    id: '8',
                    name: 'Premium White Shirt',
                    price: 70.00,
                    originalPrice: 100.00,
                    category: 'Women',
                    subcategory: 'Shirts',
                    imageUrl: 'https://via.placeholder.com/500x700?text=White+Shirt+2',
                    rating: 4.9,
                    discountPercentage: 30,
                    type: 'Shirt',
                    colors: ['White'],
                    sizes: ['S', 'M', 'L', 'XL']
                },
                {
                    id: '9',
                    name: 'Modern White Suit',
                    price: 90.00,
                    originalPrice: 100.00,
                    category: 'Women',
                    subcategory: 'Suits',
                    imageUrl: 'https://via.placeholder.com/500x700?text=White+Suit',
                    rating: 4.9,
                    discountPercentage: 10,
                    type: 'Suit',
                    colors: ['White'],
                    sizes: ['S', 'M', 'L']
                },
                {
                    id: '10',
                    name: 'Classic Black Shirt',
                    price: 45.00,
                    originalPrice: 50.00,
                    category: 'Women',
                    subcategory: 'Shirts',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Shirt+2',
                    rating: 5.0,
                    discountPercentage: 10,
                    type: 'Shirt',
                    colors: ['Black'],
                    sizes: ['S', 'M', 'L']
                },
                {
                    id: '11',
                    name: 'Minimalist Black Sweater',
                    price: 64.00,
                    originalPrice: 80.00,
                    category: 'Women',
                    subcategory: 'Sweaters',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Sweater',
                    rating: 5.0,
                    discountPercentage: 20,
                    type: 'Sweater',
                    colors: ['Black'],
                    sizes: ['M', 'L', 'XL']
                },
                {
                    id: '12',
                    name: 'Light Grey Sweater',
                    price: 40.00,
                    originalPrice: 50.00,
                    category: 'Women',
                    subcategory: 'Sweaters',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Grey+Sweater+2',
                    rating: 5.0,
                    discountPercentage: 20,
                    type: 'Sweater',
                    colors: ['Grey'],
                    sizes: ['S', 'M', 'L', 'XL']
                },
                {
                    id: '13',
                    name: 'Black Leather Jacket',
                    price: 120.00,
                    originalPrice: 150.00,
                    category: 'Men',
                    subcategory: 'Jackets',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Leather+Jacket',
                    rating: 4.9,
                    discountPercentage: 20,
                    type: 'Jacket',
                    colors: ['Black'],
                    sizes: ['M', 'L', 'XL']
                },
                {
                    id: '14',
                    name: 'Slim Fit Black Pants',
                    price: 55.00,
                    originalPrice: 70.00,
                    category: 'Men',
                    subcategory: 'Pants',
                    imageUrl: 'https://via.placeholder.com/500x700?text=Black+Pants',
                    rating: 4.7,
                    discountPercentage: 20,
                    type: 'Pants',
                    colors: ['Black'],
                    sizes: ['30', '32', '34', '36']
                },
                {
                    id: '15',
                    name: 'White Linen Shirt',
                    price: 48.00,
                    originalPrice: 60.00,
                    category: 'Men',
                    subcategory: 'Shirts',
                    imageUrl: 'https://via.placeholder.com/500x700?text=White+Linen+Shirt',
                    rating: 4.8,
                    discountPercentage: 20,
                    type: 'Shirt',
                    colors: ['White'],
                    sizes: ['S', 'M', 'L', 'XL']
                }
            ];

            // If there's a category in the URL, set it as the selected category
            if (category) {
                const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
                setSelectedCategory(categoryName);
                setActiveTags({ ...activeTags, category: categoryName });
            }

            setProducts(mockProducts);
            setLoading(false);
            setTotalPages(Math.ceil(mockProducts.length / productsPerPage));
        }, 300);
    }, [category, productsPerPage, activeTags]);

    const categories = ['All', 'Men', 'Women', 'T-Shirts', 'Shirts', 'Sweaters', 'Dresses', 'Jackets', 'Coats', 'Pants', 'Suits'];
    const colors = ['Black', 'White', 'Grey'];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handleCategoryChange = (category: string) => {
        if (category === 'All') {
            setSelectedCategory('');
            setActiveTags({ ...activeTags, category: null });
        } else {
            setSelectedCategory(category === selectedCategory ? '' : category);
            setActiveTags({ ...activeTags, category: category === selectedCategory ? null : category });
        }
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color === selectedColor ? null : color);
        setActiveTags({ ...activeTags, color: color === selectedColor ? null : color });
    };

    const handleSizeSelect = (size: string) => {
        setSelectedSize(size === selectedSize ? null : size);
        setActiveTags({ ...activeTags, size: size === selectedSize ? null : size });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = parseInt(e.target.value);
        const newRange = [...priceRange] as [number, number];
        newRange[index] = value;
        setPriceRange(newRange);
        setActiveTags({ ...activeTags, priceRange: newRange });
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value);
    }; const handleRemoveTag = (tagType: 'category' | 'color' | 'size' | 'priceRange') => {
        if (tagType === 'category') {
            setSelectedCategory('');
            // If we're on a category page, this would clear the filter but stay on the category URL
            // For a complete implementation, we might want to navigate to the main products page
        } else if (tagType === 'color') {
            setSelectedColor(null);
        } else if (tagType === 'size') {
            setSelectedSize(null);
        } else if (tagType === 'priceRange') {
            setPriceRange([0, 200]);
        }

        setActiveTags({ ...activeTags, [tagType]: null });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }; const ProductCard = ({ product }: { product: Product }) => {
        const renderStars = (rating: number) => {
            return (
                <div className="product-rating">
                    {'★'.repeat(Math.floor(rating))}
                    {rating % 1 > 0 ? '★' : ''}
                    {'☆'.repeat(5 - Math.ceil(rating))}
                </div>
            );
        };

        return (
            <div className="product-card">
                <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                    {product.discountPercentage && (
                        <div className="discount-badge">
                            -{product.discountPercentage}%
                        </div>
                    )}
                </div>
                <div className="product-info">
                    <div className="product-category">{product.subcategory || product.category}</div>
                    {renderStars(product.rating)}
                    <span className="rating-value">{product.rating.toFixed(1)}</span>
                    <h3 className="product-name">
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="product-price">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>
                    {product.colors && (
                        <div className="product-colors">
                            {product.colors.slice(0, 3).map(color => (
                                <span
                                    key={color}
                                    className="color-dot"
                                    style={{
                                        backgroundColor: color.toLowerCase() === 'white' ? '#fff' :
                                            color.toLowerCase() === 'black' ? '#000' :
                                                color.toLowerCase() === 'grey' ? '#888' : '#ddd',
                                        border: color.toLowerCase() === 'white' ? '1px solid #e0e0e0' : 'none'
                                    }}
                                    title={color}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };    // Filter products based on selected filters
    const filteredProducts = products
        .filter(product => selectedCategory ? product.category === selectedCategory || product.subcategory === selectedCategory : true)
        .filter(product => selectedColor ? product.colors?.includes(selectedColor) || false : true)
        .filter(product => selectedSize ? product.sizes?.includes(selectedSize) || false : true)
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

    // Get a nicely formatted category name for page title
    const getCategoryTitle = () => {
        if (!selectedCategory) return 'Shop Collection';
        return `${selectedCategory} Collection`;
    };

    // Paginate products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="product-list-container">            <div className="product-list-header">
            <h1>{getCategoryTitle()}</h1>
            <p>Discover our timeless collection of elegant black and white apparel</p>
        </div>

            <div className="product-list-content">
                <div className="filters-sidebar">
                    <div className="filter-section">
                        <h3>Categories</h3>
                        <div className="category-filters">                            {categories.map(category => (
                            <div key={category} className="category-filter-item">
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={category === 'All' ? !selectedCategory : category === selectedCategory}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span className="checkbox-custom"></span>
                                    <span className="filter-label">
                                        {category === 'All' ? (
                                            <Link to="/products">{category}</Link>
                                        ) : (
                                            <Link to={`/products/category/${category.toLowerCase()}`}>{category}</Link>
                                        )}
                                    </span>
                                </label>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Price Range</h3>
                        <div className="price-range-inputs">
                            <div className="price-input-group">
                                <label>Min: $</label>
                                <input
                                    type="number"
                                    min="0"
                                    max={priceRange[1]}
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceChange(e, 0)}
                                />
                            </div>
                            <div className="price-input-group">
                                <label>Max: $</label>
                                <input
                                    type="number"
                                    min={priceRange[0]}
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceChange(e, 1)}
                                />
                            </div>
                        </div>
                        <div className="price-range-slider">
                            <div className="range-slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceChange(e, 0)}
                                    className="range-min"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="200"
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceChange(e, 1)}
                                    className="range-max"
                                />
                                <div className="range-track"></div>
                            </div>
                        </div>
                        <div className="price-range-display">
                            ${priceRange[0]} - ${priceRange[1]}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Colors</h3>
                        <div className="color-filters">
                            {colors.map(color => (
                                <div
                                    key={color}
                                    onClick={() => handleColorSelect(color)}
                                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                                    style={{
                                        backgroundColor: color.toLowerCase() === 'white' ? '#fff' :
                                            color.toLowerCase() === 'black' ? '#000' :
                                                color.toLowerCase() === 'grey' ? '#888' : '#ddd',
                                        border: color.toLowerCase() === 'white' ? '1px solid #e0e0e0' : 'none'
                                    }}
                                    title={color}
                                >
                                    {selectedColor === color && (
                                        <span className="color-check">✓</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3>Sizes</h3>
                        <div className="size-filters">
                            {sizes.map(size => (
                                <div
                                    key={size}
                                    onClick={() => handleSizeSelect(size)}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                >
                                    {size}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="products-container">
                    {/* Active filter tags */}
                    {(activeTags.category || activeTags.color || activeTags.size ||
                        (activeTags.priceRange && (activeTags.priceRange[0] > 0 || activeTags.priceRange[1] < 200))) && (
                            <div className="active-filters">
                                <div className="active-filters-title">Active Filters:</div>
                                <div className="filter-tags">
                                    {activeTags.category && (
                                        <div className="filter-tag">
                                            <span>{activeTags.category}</span>
                                            <button onClick={() => handleRemoveTag('category')} aria-label="Remove filter">×</button>
                                        </div>
                                    )}
                                    {activeTags.color && (
                                        <div className="filter-tag">
                                            <span>{activeTags.color}</span>
                                            <button onClick={() => handleRemoveTag('color')} aria-label="Remove filter">×</button>
                                        </div>
                                    )}
                                    {activeTags.size && (
                                        <div className="filter-tag">
                                            <span>Size: {activeTags.size}</span>
                                            <button onClick={() => handleRemoveTag('size')} aria-label="Remove filter">×</button>
                                        </div>
                                    )}
                                    {activeTags.priceRange && (activeTags.priceRange[0] > 0 || activeTags.priceRange[1] < 200) && (
                                        <div className="filter-tag">
                                            <span>Price: ${activeTags.priceRange[0]} - ${activeTags.priceRange[1]}</span>
                                            <button onClick={() => handleRemoveTag('priceRange')} aria-label="Remove filter">×</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    <div className="products-header">
                        <div className="products-count">
                            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
                        </div>
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

                    {currentProducts.length === 0 ? (
                        <div className="no-products">
                            <p>No products match your current filters. Try adjusting your selection.</p>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {currentProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {filteredProducts.length > productsPerPage && (
                        <div className="pagination">
                            <button
                                className="page-nav-button"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <div className="page-numbers">
                                {pageNumbers.map(number => (
                                    <button
                                        key={number}
                                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                                        onClick={() => handlePageChange(number)}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="page-nav-button"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
