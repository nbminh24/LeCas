import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
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
        console.log('RoleBasedRoute: Still loading auth state...');
        return <LoadingSpinner />;
    }

    console.log('RoleBasedRoute: Auth state:', {
        isAuthenticated,
        userRole: user?.role,
        requiredRole,
        currentPath: window.location.pathname
    });

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        console.log('RoleBasedRoute: User is not authenticated, redirecting to login');
        return <Navigate to={redirectPath} replace />;
    }

    // If a specific role is required, check if user has it
    if (requiredRole) {
        const userRoleLower = user.role.toLowerCase();
        const requiredRoleLower = requiredRole.toLowerCase();

        if (userRoleLower !== requiredRoleLower) {
            console.log(`RoleBasedRoute: User role ${user.role} doesn't match required role ${requiredRole}`);
            // Redirect to appropriate dashboard based on user's actual role
            return redirectToRoleDashboard(user.role);
        }
    } else {
        // If no specific role is required (like on /dashboard), redirect based on user's role
        return redirectToRoleDashboard(user.role);
    }

    // If we get here, the user has the required role
    return <Outlet />;
};

// Helper function to handle role-based redirects
function redirectToRoleDashboard(role: string): React.ReactElement {
    const roleLower = role.toLowerCase();
    console.log(`Redirecting user with role ${role} (${roleLower}) to appropriate dashboard`);

    switch (roleLower) {
        case UserRole.ADMIN.toLowerCase():
            console.log('Redirecting to admin dashboard');
            return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;

        case UserRole.STAFF_WAREHOUSE.toLowerCase():
            console.log('Redirecting to warehouse staff dashboard');
            return <Navigate to={ROUTES.STAFF.WAREHOUSE.INVENTORY} replace />;

        case UserRole.STAFF_SHIPPING.toLowerCase():
            console.log('Redirecting to shipping staff dashboard');
            return <Navigate to={ROUTES.STAFF.SHIPPING.SHIPMENTS} replace />;

        case UserRole.STAFF_ORDER.toLowerCase():
            console.log('Redirecting to order staff dashboard');
            return <Navigate to={ROUTES.STAFF.ORDERS} replace />;

        case UserRole.USER.toLowerCase():
            console.log('Redirecting to user dashboard');
            return <Navigate to={ROUTES.USER.HOME} replace />;

        default:
            console.warn('Unknown role:', role);
            return <Navigate to={ROUTES.USER.HOME} replace />;
    }
}
