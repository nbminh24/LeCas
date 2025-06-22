import React, { createContext, useState, useEffect } from 'react';
import type { User, AuthResponse, LoginFormData, RegisterFormData } from '../../../types/auth';
import { authService } from '../../../services/auth.service';

// Define the auth context type
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    register: (formData: RegisterFormData) => Promise<AuthResponse>;
    login: (formData: LoginFormData) => Promise<AuthResponse>;
    logout: () => void;
    googleLogin: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
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
                // Check for token in localStorage
                const token = localStorage.getItem('token');

                // Check for token in URL (from OAuth redirect)
                const urlParams = new URLSearchParams(window.location.search);
                const tokenFromUrl = urlParams.get('token');

                // Use token from URL if available, otherwise use from localStorage
                const activeToken = tokenFromUrl || token;

                if (activeToken) {
                    // Save token to localStorage if it came from URL
                    if (tokenFromUrl) {
                        localStorage.setItem('token', tokenFromUrl);
                        // Clean up URL
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }

                    // Get user data
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Authentication error:', error);
                localStorage.removeItem('token');
            }

            setIsLoading(false);
        };

        checkLoggedIn();
    }, []);

    // Register user
    const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
        try {
            const { token, user } = await authService.register(formData);

            localStorage.setItem('token', token);

            setUser(user);
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
            const { token, user } = await authService.login(formData);

            localStorage.setItem('token', token);

            setUser(user);
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
        setUser(null);
        setIsAuthenticated(false);
    };

    // Google OAuth login
    const googleLogin = () => {
        // Redirect to backend Google auth route
        window.location.href = authService.getGoogleAuthUrl();
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
                googleLogin,
                setUser,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
