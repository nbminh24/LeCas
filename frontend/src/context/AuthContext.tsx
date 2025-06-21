import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define types for authentication context
interface User {
    id: string;
    name: string;
    email: string;
    // Add any other user properties here
}

interface AuthResponse {
    success: boolean;
    message?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    register: (formData: RegisterFormData) => Promise<AuthResponse>;
    login: (formData: LoginFormData) => Promise<AuthResponse>;
    logout: () => void;
}

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

interface LoginFormData {
    email: string;
    password: string;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    // Configure axios headers
                    axios.defaults.headers.common['x-auth-token'] = token;

                    // Verify token and get user data
                    const res = await axios.get(`${API_URL}/auth/user`);

                    setUser(res.data);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Authentication error:', error);
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['x-auth-token'];
            }

            setIsLoading(false);
        };

        checkLoggedIn();
    }, []);    // Register user
    const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/register`,
                formData
            );

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    // Login user
    const login = async (formData: LoginFormData): Promise<AuthResponse> => {
        try {
            const res = await axios.post(
                `${API_URL}/auth/login`,
                formData
            );

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['x-auth-token'] = res.data.token;

            setUser(res.data.user);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
