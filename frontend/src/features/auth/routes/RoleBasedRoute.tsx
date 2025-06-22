import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import LoadingSpinner from '@components/common/LoadingSpinner';
import { UserRole, ROUTES } from '../../../constants/routes';

interface RoleBasedRouteProps {
    requiredRole?: UserRole;
    redirectPath?: string;
}

/**
 * A wrapper component that ensures a route is only accessible to users with specific roles
 */
export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
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

    // Check if user has the required role and redirect accordingly
    if (user) {
        if (requiredRole && user.role !== requiredRole) {
            // Redirect based on user's role if they don't have the required role
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

        // If it's the general dashboard redirector
        if (!requiredRole) {
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
    }

    // Fallback - shouldn't reach here if auth logic is working correctly
    return <Navigate to={redirectPath} replace />;
};
