import React, { createContext } from 'react';
import type { User, AuthResponse, LoginFormData, RegisterFormData } from '../../../types/auth';
import { authService } from '../../../services/auth.service';
import { useMultiAuth } from '../../../hooks/useMultiAuth';

// Define the auth context type
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    register: (formData: RegisterFormData) => Promise<AuthResponse>;
    login: (formData: LoginFormData, role?: 'admin' | 'user' | 'staff') => Promise<AuthResponse>;
    logout: (role?: 'admin' | 'user') => void;
    googleLogin: () => void;
    switchSession: (role: 'admin' | 'user') => boolean;
    getActiveSessions: () => string[];
    activeRole: string | null;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export AuthProvider as a named function to maintain consistent component exports for HMR
export function AuthProvider({ children }: AuthProviderProps) {
    const {
        user,
        isAuthenticated,
        isLoading,
        login: multiLogin,
        register: multiRegister,
        logout: multiLogout,
        switchSession,
        getActiveSessions,
        activeRole
    } = useMultiAuth();

    // Register user
    const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
        return await multiRegister(formData);
    };    // Login user
    const login = async (formData: LoginFormData, role: 'admin' | 'user' | 'staff' = 'user'): Promise<AuthResponse> => {
        // @ts-ignore - We know our multiLogin supports staff role
        return await multiLogin(formData, role);
    };

    // Logout user
    const logout = (role?: 'admin' | 'user') => {
        multiLogout(role);
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
                switchSession,
                getActiveSessions,
                activeRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
