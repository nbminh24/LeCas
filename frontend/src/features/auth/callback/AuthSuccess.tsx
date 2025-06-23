import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/auth.service';
import './AuthCallback.css';
import { UserRole, ROUTES } from '../../../constants/routes';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleAuthSuccess = async () => {
            try {
                console.log("Auth success component mounted");
                // Get token from URL if present
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');

                if (token) {
                    console.log("Token found in URL, processing...");
                    // Store token in user_token (assuming Google login is always for regular users)
                    localStorage.setItem('user_token', token);
                    // Also set as current token
                    localStorage.setItem('token', token);

                    try {
                        // Fetch user data to determine role
                        const userData = await authService.getCurrentUser();
                        console.log("User data retrieved:", userData);                        // Store token in appropriate storage based on role
                        if (userData.role === 'admin') {
                            console.log("Admin user detected, storing admin token");
                            localStorage.setItem('admin_token', token);

                            // Set current token to admin token for immediate use
                            localStorage.setItem('token', token);

                            // Redirect to admin dashboard
                            console.log("Redirecting admin to dashboard...");
                            // Use a short timeout to ensure state has time to update
                            setTimeout(() => {
                                navigate(ROUTES.ADMIN.DASHBOARD);
                            }, 500);
                        } else if (userData.role === 'user') {
                            console.log("Regular user detected");
                            // Already stored as user_token above
                            // Redirect to user dashboard
                            navigate(ROUTES.USER.HOME);
                        } else if (userData.role === 'staff_warehouse' ||
                            userData.role === 'staff_shipping' ||
                            userData.role === 'staff_order') {
                            console.log("Staff user detected:", userData.role);
                            localStorage.setItem('staff_token', token);
                            // Redirect based on staff type
                            if (userData.role === 'staff_warehouse') {
                                navigate(ROUTES.STAFF.WAREHOUSE.INVENTORY);
                            } else if (userData.role === 'staff_shipping') {
                                navigate(ROUTES.STAFF.SHIPPING.SHIPMENTS);
                            } else {
                                navigate(ROUTES.STAFF.ORDERS);
                            }
                        } else {
                            // Unknown role, default to user dashboard
                            console.log("Unknown role:", userData.role, "defaulting to user dashboard");
                            navigate(ROUTES.USER.HOME);
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        setError('Failed to fetch user data. Please try logging in again.');
                        navigate('/login');
                    }
                } else {
                    console.error("No token found in URL");
                    setError('No authentication token received. Please try logging in again.');
                    // If no token, go back to login
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth success error:', error);
                setError('Authentication failed. Please try logging in again.');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        handleAuthSuccess();
    }, [navigate]); return (
        <div className="auth-callback">
            <div className="auth-callback-container">
                <h2>Authentication Successful</h2>
                {loading ? (
                    <p>Redirecting you...</p>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : null}
            </div>
        </div>
    );
};

export default AuthSuccess;
