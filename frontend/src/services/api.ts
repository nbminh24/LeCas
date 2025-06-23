import axios from 'axios';

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to attach token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle authentication errors
        if (error.response && error.response.status === 401) {
            // Check which token to remove
            const currentToken = localStorage.getItem('token');
            if (currentToken === localStorage.getItem('admin_token')) {
                localStorage.removeItem('admin_token');
            }
            if (currentToken === localStorage.getItem('user_token')) {
                localStorage.removeItem('user_token');
            }
            localStorage.removeItem('token');

            // You could also trigger a global auth state refresh here
            // or redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
