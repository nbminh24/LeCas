import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reviews.css';

// Mock review data
const mockReviews = [
    {
        id: '1',
        productId: '101',
        productName: 'Wireless Headphones',
        productImage: 'https://placehold.co/600x400?text=Headphones',
        rating: 4,
        date: '2025-06-10',
        review: 'Great sound quality and comfortable to wear for long periods. Battery life is impressive too.',
    },
    {
        id: '2',
        productId: '102',
        productName: 'Smart Watch',
        productImage: 'https://placehold.co/600x400?text=Smart+Watch',
        rating: 5,
        date: '2025-05-28',
        review: 'Amazing functionality and the battery lasts for days. The fitness tracking features are accurate and helpful.',
    },
    {
        id: '3',
        productId: '103',
        productName: 'Bluetooth Speaker',
        productImage: 'https://placehold.co/600x400?text=Speaker',
        rating: 3,
        date: '2025-05-15',
        review: 'Sound is decent for the price, but I expected better bass response. Build quality is good though.',
    }
];

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState(mockReviews);

    const deleteReview = (id: string) => {
        setReviews(reviews.filter(review => review.id !== id));
    };

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, index) => (
            <span
                key={index}
                className={`star ${index < rating ? 'filled' : 'empty'}`}
            >
                ★
            </span>
        ));
    };

    return (
        <div className="reviews-container">
            <h1 className="reviews-title">My Product Reviews</h1>

            {reviews.length === 0 ? (
                <div className="empty-reviews">
                    <p>You haven't reviewed any products yet.</p>
                    <Link to="/products" className="browse-products-btn">Browse Products</Link>
                </div>
            ) : (
                <div className="reviews-list">
                    {reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <div className="review-product">
                                <img
                                    src={review.productImage}
                                    alt={review.productName}
                                    className="review-product-image"
                                />
                                <div className="review-product-info">
                                    <h3>
                                        <Link to={`/products/${review.productId}`}>
                                            {review.productName}
                                        </Link>
                                    </h3>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                    </div>
                                    <div className="review-date">
                                        Reviewed on {new Date(review.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="review-content">
                                <p>{review.review}</p>
                            </div>

                            <div className="review-actions">
                                <button
                                    className="edit-review-btn"
                                    onClick={() => alert(`Edit review for ${review.productName}`)}
                                >
                                    Edit Review
                                </button>
                                <button
                                    className="delete-review-btn"
                                    onClick={() => deleteReview(review.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Reviews;
