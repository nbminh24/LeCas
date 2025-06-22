import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    originalPrice,
    image,
    rating,
    reviewCount,
    isNew = false,
    isSale = false
}) => {
    return (
        <div className="product-card">
            {isNew && <div className="product-badge">New</div>}
            {isSale && <div className="product-badge sale">Sale</div>}

            <a href={`/products/${id}`} className="product-image">
                <img src={image} alt={name} />
            </a>

            <div className="product-info">
                <h3 className="product-title">
                    <a href={`/products/${id}`}>{name}</a>
                </h3>

                <div className="product-price">
                    {originalPrice && (
                        <span className="original-price">${originalPrice.toFixed(2)}</span>
                    )}
                    <span className={isSale ? 'sale-price' : ''}>${price.toFixed(2)}</span>
                </div>

                <div className="product-rating">
                    <div className="stars">
                        {'★'.repeat(Math.floor(rating))}
                        {rating % 1 !== 0 ? '½' : ''}
                        {'☆'.repeat(5 - Math.ceil(rating))}
                    </div>
                    <span className="rating-count">({reviewCount})</span>
                </div>

                <div className="product-actions">
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="wishlist-btn">❤</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
