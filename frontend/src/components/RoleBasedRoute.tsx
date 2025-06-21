import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';

const RoleBasedRoute = () => {
    const { user, isAuthenticated, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Render the appropriate dashboard based on user role
    if (user?.role === 'admin') {
        return <AdminDashboard />;
    } else {
        return <Dashboard />;
    }
};

export default RoleBasedRoute;
