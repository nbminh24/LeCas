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
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');

                if (token) {
                    console.log("Token found in URL, processing...");
                    localStorage.setItem('token', token); // Set as current token

                    try {
                        const userData = await authService.getCurrentUser();
                        console.log("User data retrieved:", userData);

                        // Store token based on role and redirect
                        switch (userData.role.toLowerCase()) {
                            case UserRole.ADMIN.toLowerCase():
                                console.log("Admin user detected");
                                localStorage.setItem('admin_token', token);
                                localStorage.removeItem('user_token');
                                localStorage.removeItem('staff_token');
                                setTimeout(() => navigate(ROUTES.ADMIN.DASHBOARD), 500);
                                break;

                            case UserRole.STAFF_WAREHOUSE.toLowerCase():
                                console.log("Warehouse staff detected");
                                localStorage.setItem('staff_token', token);
                                localStorage.removeItem('user_token');
                                localStorage.removeItem('admin_token');
                                setTimeout(() => navigate(ROUTES.STAFF.WAREHOUSE.INVENTORY), 500);
                                break;

                            case UserRole.STAFF_SHIPPING.toLowerCase():
                                console.log("Shipping staff detected");
                                localStorage.setItem('staff_token', token);
                                localStorage.removeItem('user_token');
                                localStorage.removeItem('admin_token');
                                setTimeout(() => navigate(ROUTES.STAFF.SHIPPING.SHIPMENTS), 500);
                                break;

                            case UserRole.STAFF_ORDER.toLowerCase():
                                console.log("Order staff detected");
                                localStorage.setItem('staff_token', token);
                                localStorage.removeItem('user_token');
                                localStorage.removeItem('admin_token');
                                setTimeout(() => navigate(ROUTES.STAFF.ORDERS), 500);
                                break;

                            case UserRole.USER.toLowerCase():
                                console.log("Regular user detected");
                                localStorage.setItem('user_token', token);
                                localStorage.removeItem('admin_token');
                                localStorage.removeItem('staff_token');
                                setTimeout(() => navigate(ROUTES.USER.HOME), 500);
                                break;

                            default:
                                console.log("Unknown role:", userData.role);
                                localStorage.setItem('user_token', token);
                                localStorage.removeItem('admin_token');
                                localStorage.removeItem('staff_token');
                                setTimeout(() => navigate(ROUTES.USER.HOME), 500);
                                break;
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        setError('Failed to fetch user data. Please try logging in again.');
                        navigate(ROUTES.LOGIN);
                    }
                } else {
                    console.error("No token found in URL");
                    setError('No authentication token received. Please try logging in again.');
                    navigate(ROUTES.LOGIN);
                }
            } catch (error) {
                console.error('Auth success error:', error);
                setError('Authentication failed. Please try logging in again.');
                navigate(ROUTES.LOGIN);
            } finally {
                setLoading(false);
            }
        };

        handleAuthSuccess();
    }, [navigate]);

    return (
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
