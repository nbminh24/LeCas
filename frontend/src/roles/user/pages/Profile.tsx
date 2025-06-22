import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import './Profile.css';

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="profile-container">
            <h1 className="profile-title">My Profile</h1>

            {user && (
                <div className="profile-card">
                    <div className="profile-header">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt="Profile"
                                className="profile-avatar"
                            />
                        ) : (
                            <div className="profile-avatar profile-avatar-placeholder">
                                {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                        )}
                        <h2>{user.username || 'User'}</h2>
                        <p className="profile-email">{user.email}</p>
                        <span className="profile-role">{user.role}</span>
                    </div>

                    <div className="profile-details">
                        <div className="profile-section">
                            <h3>Account Information</h3>
                            <div className="profile-info">
                                <div className="profile-info-item">
                                    <span className="profile-label">Email:</span>
                                    <span className="profile-value">{user.email}</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="profile-label">Member Since:</span>
                                    <span className="profile-value">June 2025</span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-section">
                            <h3>Shipping Information</h3>
                            <div className="profile-info">
                                <div className="profile-info-item">
                                    <span className="profile-label">Address:</span>
                                    <span className="profile-value">123 Main St</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="profile-label">City:</span>
                                    <span className="profile-value">New York</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="profile-label">State:</span>
                                    <span className="profile-value">NY</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="profile-label">Zip Code:</span>
                                    <span className="profile-value">10001</span>
                                </div>
                                <div className="profile-info-item">
                                    <span className="profile-label">Country:</span>
                                    <span className="profile-value">United States</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="profile-button primary-button">Edit Profile</button>
                        <button className="profile-button secondary-button">Change Password</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
