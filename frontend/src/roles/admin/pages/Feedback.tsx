import React, { useState, useEffect } from 'react';
import './Feedback.css';

interface FeedbackItem {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    rating: number;
    message: string;
    productId?: string;
    productName?: string;
    createdAt: string;
    status: 'new' | 'in-progress' | 'resolved';
}

const Feedback: React.FC = () => {
    const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

    useEffect(() => {
        // Simulate API call to fetch feedback
        setIsLoading(true);
        setTimeout(() => {
            const mockFeedback: FeedbackItem[] = [
                {
                    id: '1',
                    userId: 'user123',
                    userName: 'John Smith',
                    userEmail: 'john.smith@example.com',
                    rating: 2,
                    message: 'I ordered the wrong size and had trouble with the return process. Customer service was slow to respond.',
                    productId: 'prod456',
                    productName: 'Classic Denim Jacket',
                    createdAt: '2023-06-10T14:30:00Z',
                    status: 'new'
                },
                {
                    id: '2',
                    userId: 'user456',
                    userName: 'Emma Johnson',
                    userEmail: 'emma.j@example.com',
                    rating: 5,
                    message: 'Excellent customer service! My order arrived earlier than expected and the quality exceeded my expectations.',
                    productId: 'prod789',
                    productName: 'Wireless Earbuds',
                    createdAt: '2023-06-08T09:15:00Z',
                    status: 'resolved'
                },
                {
                    id: '3',
                    userId: 'user789',
                    userName: 'Michael Chen',
                    userEmail: 'mchen@example.com',
                    rating: 3,
                    message: 'The website is a bit confusing to navigate. It took me a while to find what I was looking for.',
                    createdAt: '2023-06-09T11:45:00Z',
                    status: 'in-progress'
                },
                {
                    id: '4',
                    userId: 'user101',
                    userName: 'Sarah Williams',
                    userEmail: 'sarahw@example.com',
                    rating: 1,
                    message: 'I received a damaged product and have been trying to contact support for days with no response.',
                    productId: 'prod123',
                    productName: 'Smart Home Hub',
                    createdAt: '2023-06-11T16:20:00Z',
                    status: 'new'
                },
                {
                    id: '5',
                    userId: 'user202',
                    userName: 'Robert Garcia',
                    userEmail: 'rgarcia@example.com',
                    rating: 4,
                    message: 'Great products and fast shipping. Would appreciate more payment options though.',
                    createdAt: '2023-06-07T13:10:00Z',
                    status: 'resolved'
                }
            ];

            setFeedback(mockFeedback);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const handleStatusChange = (id: string, newStatus: 'new' | 'in-progress' | 'resolved') => {
        setFeedback(prevFeedback =>
            prevFeedback.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );

        if (selectedFeedback && selectedFeedback.id === id) {
            setSelectedFeedback({ ...selectedFeedback, status: newStatus });
        }
    };

    const handleFeedbackSelect = (feedbackItem: FeedbackItem) => {
        setSelectedFeedback(feedbackItem);
    };

    const filteredFeedback = filter === 'all'
        ? feedback
        : feedback.filter(item => item.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'status-new';
            case 'in-progress': return 'status-progress';
            case 'resolved': return 'status-resolved';
            default: return '';
        }
    };

    const getStarRating = (rating: number) => {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return <div className="loading-container">Loading feedback data...</div>;
    }

    return (
        <div className="feedback-container">
            <div className="feedback-header">
                <h1>Customer Feedback</h1>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('new')}
                    >
                        New
                    </button>
                    <button
                        className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('in-progress')}
                    >
                        In Progress
                    </button>
                    <button
                        className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('resolved')}
                    >
                        Resolved
                    </button>
                </div>
            </div>

            <div className="feedback-content">
                <div className="feedback-list">
                    <h2>Feedback ({filteredFeedback.length})</h2>
                    {filteredFeedback.length === 0 ? (
                        <p className="no-feedback">No feedback found matching the current filter.</p>
                    ) : (
                        <ul>
                            {filteredFeedback.map(item => (
                                <li
                                    key={item.id}
                                    className={`feedback-item ${selectedFeedback?.id === item.id ? 'selected' : ''}`}
                                    onClick={() => handleFeedbackSelect(item)}
                                >
                                    <div className="feedback-summary">
                                        <div className="feedback-rating">{getStarRating(item.rating)}</div>
                                        <div className="feedback-user">{item.userName}</div>
                                        <div className={`feedback-status ${getStatusColor(item.status)}`}>
                                            {item.status === 'new' && 'New'}
                                            {item.status === 'in-progress' && 'In Progress'}
                                            {item.status === 'resolved' && 'Resolved'}
                                        </div>
                                    </div>
                                    <div className="feedback-preview">{item.message.substring(0, 100)}...</div>
                                    <div className="feedback-date">{formatDate(item.createdAt)}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="feedback-detail">
                    {selectedFeedback ? (
                        <div className="detail-content">
                            <div className="detail-header">
                                <h2>Feedback Details</h2>
                                <div className="status-selector">
                                    <label>Status: </label>
                                    <select
                                        value={selectedFeedback.status}
                                        onChange={(e) => handleStatusChange(
                                            selectedFeedback.id,
                                            e.target.value as 'new' | 'in-progress' | 'resolved'
                                        )}
                                    >
                                        <option value="new">New</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                            </div>

                            <div className="detail-info">
                                <div className="info-group">
                                    <label>From:</label>
                                    <div>
                                        <div>{selectedFeedback.userName}</div>
                                        <div className="detail-email">{selectedFeedback.userEmail}</div>
                                    </div>
                                </div>

                                <div className="info-group">
                                    <label>Rating:</label>
                                    <div className="detail-rating">{getStarRating(selectedFeedback.rating)}</div>
                                </div>

                                {selectedFeedback.productName && (
                                    <div className="info-group">
                                        <label>Product:</label>
                                        <div>{selectedFeedback.productName}</div>
                                    </div>
                                )}

                                <div className="info-group">
                                    <label>Date:</label>
                                    <div>{formatDate(selectedFeedback.createdAt)}</div>
                                </div>
                            </div>

                            <div className="detail-message">
                                <h3>Message:</h3>
                                <p>{selectedFeedback.message}</p>
                            </div>

                            <div className="detail-actions">
                                <button className="btn-primary">Reply to Customer</button>
                                <button className="btn-secondary">View Customer Profile</button>
                                {selectedFeedback.productId && (
                                    <button className="btn-secondary">View Product</button>
                                )}
                            </div>

                            <div className="response-history">
                                <h3>Response History</h3>
                                <p className="no-responses">No previous responses found.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <p>Select a feedback item to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
