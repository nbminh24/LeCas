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
    const { user, isAuthenticated, isLoading, activeRole } = useAuth();

    // Show loading spinner while checking authentication status
    if (isLoading) {
        console.log('RoleBasedRoute: Still loading auth state...');
        return <LoadingSpinner />;
    }

    console.log('RoleBasedRoute: Current state:', {
        isAuthenticated,
        userRole: user?.role,
        activeRole,
        requiredRole,
        currentPath: window.location.pathname
    });

    // Redirect to login if not authenticated
    if (!isAuthenticated || !user) {
        console.log('RoleBasedRoute: User is not authenticated, redirecting to login');
        return <Navigate to={redirectPath} replace />;
    }

    console.log('RoleBasedRoute: User is authenticated', {
        userId: user.id,
        email: user.email,
        role: user.role,
        requiredRole: requiredRole || 'none',
        roleMatch: requiredRole ? user.role === requiredRole : 'no required role'
    });

    // If a specific role is required, check if user has it
    if (requiredRole) {
        console.log(`RoleBasedRoute: Checking if user has required role: ${requiredRole}`);
        const userRoleLower = user.role.toLowerCase();
        const requiredRoleLower = requiredRole.toLowerCase();

        if (userRoleLower !== requiredRoleLower) {
            console.log(`RoleBasedRoute: User role ${user.role} doesn't match required role ${requiredRole}`);
            // Redirect based on user's actual role
            switch (userRoleLower) {
                case UserRole.ADMIN.toLowerCase():
                    console.log('RoleBasedRoute: Redirecting admin to admin dashboard');
                    return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
                case UserRole.STAFF_WAREHOUSE.toLowerCase():
                    return <Navigate to={ROUTES.STAFF.WAREHOUSE.INVENTORY} replace />;
                case UserRole.STAFF_SHIPPING.toLowerCase():
                    return <Navigate to={ROUTES.STAFF.SHIPPING.SHIPMENTS} replace />;
                case 'staff_order':
                    return <Navigate to={ROUTES.STAFF.ORDERS} replace />;
                case UserRole.USER.toLowerCase():
                default:
                    console.log('RoleBasedRoute: Redirecting user to home');
                    return <Navigate to={ROUTES.USER.HOME} replace />;
            }
        }
    }

    // If no specific role is required, redirect based on user's role
    if (!requiredRole) {
        console.log("RoleBasedRoute: No specific role required, redirecting based on user role:", user.role);
        const userRoleLower = user.role.toLowerCase();

        switch (userRoleLower) {
            case UserRole.ADMIN.toLowerCase():
                console.log('RoleBasedRoute: Redirecting admin to dashboard');
                return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
            case UserRole.STAFF_WAREHOUSE.toLowerCase():
                console.log('RoleBasedRoute: Redirecting warehouse staff');
                return <Navigate to={ROUTES.STAFF.WAREHOUSE.INVENTORY} replace />;
            case UserRole.STAFF_SHIPPING.toLowerCase():
                console.log('RoleBasedRoute: Redirecting shipping staff');
                return <Navigate to={ROUTES.STAFF.SHIPPING.SHIPMENTS} replace />;
            case 'staff_order':
                console.log('RoleBasedRoute: Redirecting order staff');
                return <Navigate to={ROUTES.STAFF.ORDERS} replace />;
            case UserRole.USER.toLowerCase():
                console.log('RoleBasedRoute: Redirecting regular user');
                return <Navigate to={ROUTES.USER.HOME} replace />;
            default:
                console.log('RoleBasedRoute: Unknown role, redirecting to home');
                return <Navigate to={ROUTES.USER.HOME} replace />;
        }
    }

    // If we get here, either no role was required, or the user has the required role
    console.log('RoleBasedRoute: Rendering protected content');
    return <Outlet />;
};
