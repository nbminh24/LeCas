import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    message?: string;
}

/**
 * A customizable loading spinner component that can be used throughout the application
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    message = 'Loading...'
}) => {
    return (
        <div className="loading-spinner-container">
            <div className={`loading-spinner ${size}`}>
                <div className="spinner"></div>
            </div>
            {message && <p className="loading-message">{message}</p>}
        </div>
    );
};

export default LoadingSpinner;
