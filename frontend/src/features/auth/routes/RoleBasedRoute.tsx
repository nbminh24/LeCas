import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import LoadingSpinner from '@components/common/LoadingSpinner';

interface RoleBasedRouteProps {
    requiredRole?: string;
    redirectPath?: string;
}

/**
 * A wrapper component that ensures a route is only accessible to users with specific roles
 */
export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
    requiredRole = 'user',
    redirectPath = '/login'
}) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    // Show loading spinner while checking authentication status
    if (isLoading) {
        return <LoadingSpinner />;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    // Check if user has the required role and redirect accordingly
    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            return <Navigate to="/user/dashboard" replace />;
        }
    }

    // Fallback - shouldn't reach here if auth logic is working correctly
    return <Navigate to={redirectPath} replace />;
};
