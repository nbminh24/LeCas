import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { UserRole, ROUTES } from '../../../constants/routes';

interface ProtectedRouteProps {
    requiredRole?: UserRole;
    redirectPath?: string;
}

/**
 * A wrapper component that ensures a route is only accessible to authenticated users
 * with the correct role if specified
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    requiredRole,
    redirectPath = ROUTES.LOGIN
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

    // Check if a specific role is required and if user has that role
    if (requiredRole && user && user.role !== requiredRole) {
        // Redirect to appropriate dashboard based on user's role
        switch (user.role) {
            case UserRole.ADMIN:
                return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
            case UserRole.STAFF:
            case UserRole.STAFF_WAREHOUSE:
            case UserRole.STAFF_SHIPPING:
                return <Navigate to={ROUTES.STAFF.DASHBOARD} replace />;
            case UserRole.USER:
            default:
                return <Navigate to={ROUTES.USER.HOME} replace />;
        }
    }

    // Render the protected content
    return <Outlet />;
};
