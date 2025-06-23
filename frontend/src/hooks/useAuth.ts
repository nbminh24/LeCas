import { useContext, useEffect } from 'react';
import { AuthContext } from '../features/auth/context/AuthContext';

/**
 * Custom hook to access the auth context
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    // Log authentication status on changes (debug only)
    useEffect(() => {
        console.log('Auth state changed:', {
            isAuthenticated: context.isAuthenticated,
            user: context.user ? {
                id: context.user.id,
                role: context.user.role,
                email: context.user.email
            } : null,
            activeRole: context.activeRole,
            isLoading: context.isLoading
        });
    }, [context.isAuthenticated, context.user, context.activeRole, context.isLoading]);

    return context;
};
