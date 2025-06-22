import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { authService } from '../../../services/auth.service';
import './AuthCallback.css';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();

    useEffect(() => {
        const handleAuthSuccess = async () => {
            try {
                // Get token from URL if present
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');

                if (token) {
                    // Store token in localStorage
                    localStorage.setItem('token', token);

                    // Fetch user data
                    try {
                        const userData = await authService.getCurrentUser();
                        setUser(userData);
                        setIsAuthenticated(true);
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }

                    // Redirect to dashboard
                    navigate('/dashboard');
                } else {
                    // If no token, go back to login
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth success error:', error);
                navigate('/login');
            }
        };

        handleAuthSuccess();
    }, [navigate, setIsAuthenticated, setUser]);

    return (
        <div className="auth-callback">
            <div className="auth-callback-container">
                <h2>Authentication Successful</h2>
                <p>Redirecting you...</p>
            </div>
        </div>
    );
};

export default AuthSuccess;
