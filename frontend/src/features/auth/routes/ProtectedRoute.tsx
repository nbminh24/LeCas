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
        console.log("ProtectedRoute: User not authenticated, redirecting to login");
        return <Navigate to={redirectPath} replace />;
    }

    console.log("ProtectedRoute: Authentication check", {
        userRole: user?.role,
        requiredRole,
        isAuthenticated,
        activeSession: user?.id
    });

    // Check if user exists and has a role
    if (!user || !user.role) {
        console.log("ProtectedRoute: User has no role, redirecting to login");
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    // Check if a specific role is required and if user has that role
    if (requiredRole && user.role !== requiredRole) {
        console.log(`ProtectedRoute: User role (${user.role}) doesn't match required role (${requiredRole}), redirecting`);

        // Redirect based on user's actual role
        switch (user.role.toLowerCase()) {
            case UserRole.ADMIN.toLowerCase():
                console.log("ProtectedRoute: Redirecting admin to admin dashboard");
                return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
            case UserRole.STAFF_WAREHOUSE.toLowerCase():
                return <Navigate to={ROUTES.STAFF.WAREHOUSE.INVENTORY} replace />;
            case UserRole.STAFF_SHIPPING.toLowerCase():
                // Đảm bảo staff_shipping luôn về đúng route mới
                return <Navigate to="/staff/shipping/orders/pending" replace />;
            case 'staff_order':
                return <Navigate to={ROUTES.STAFF.ORDERS} replace />;
            case UserRole.USER.toLowerCase():
            default:
                console.log("ProtectedRoute: Redirecting user to user dashboard");
                return <Navigate to={ROUTES.USER.HOME} replace />;
        }
    }

    // If we get here, the user has the required role (or no role was required)
    console.log("ProtectedRoute: User has required role, rendering protected content");
    return <Outlet />;
};
