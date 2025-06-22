import api from './api';
import type { LoginFormData, RegisterFormData, User } from '../types/auth';

// Auth API endpoints
const AUTH_ENDPOINTS = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    USER: '/auth/user',
    GOOGLE: '/auth/google',
};

export const authService = {
    /**
     * Register a new user
     */
    register: async (formData: RegisterFormData): Promise<{ token: string; user: User }> => {
        const response = await api.post(AUTH_ENDPOINTS.REGISTER, formData);
        return response.data;
    },

    /**
     * Login a user
     */
    login: async (formData: LoginFormData): Promise<{ token: string; user: User }> => {
        const response = await api.post(AUTH_ENDPOINTS.LOGIN, formData);
        return response.data;
    },

    /**
     * Get current user data
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await api.get(AUTH_ENDPOINTS.USER);
        return response.data;
    },

    /**
     * Get Google OAuth URL
     */
    getGoogleAuthUrl: (): string => {
        return `${api.defaults.baseURL}${AUTH_ENDPOINTS.GOOGLE}`;
    }
};
