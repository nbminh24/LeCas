import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const handleAuthSuccess = async () => {
            try {
                // Get token from URL if present
                const searchParams = new URLSearchParams(window.location.search);
                const token = searchParams.get('token');

                if (token) {
                    // Store token in localStorage
                    localStorage.setItem('token', token);

                    // Set the token in axios headers
                    axios.defaults.headers.common['x-auth-token'] = token;

                    // Fetch user data
                    try {
                        const res = await axios.get(`${API_URL}/auth/user`);
                        setUser(res.data);
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
    }, [navigate, setIsAuthenticated, setUser, API_URL]);

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
