import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import StaffLayout from '../roles/staff/StaffLayout';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
import { UserRole } from '../constants/routes';

// Staff Order pages
import Dashboard from '../roles/staff/pages/Dashboard';
import OrdersList from '../roles/staff/subroles/orders/OrdersList';
import OrderDetails from '../roles/staff/subroles/orders/OrderDetails';

// Staff Warehouse pages
import Inventory from '../roles/staff/subroles/warehouse/Inventory';
import InventoryDetail from '../roles/staff/subroles/warehouse/InventoryDetail';
import UpdateStock from '../roles/staff/subroles/warehouse/UpdateStock';

// Staff Shipping pages
import Shipments from '../roles/staff/subroles/shipping/Shipments';
import ShipmentDetail from '../roles/staff/subroles/shipping/ShipmentDetail';
import UpdateShipment from '../roles/staff/subroles/shipping/UpdateShipment';

const StaffRoutes = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render routes based on staff type
    switch (user.role) {
        case UserRole.STAFF_ORDER:
            return (
                <Routes>
                    <Route element={<StaffLayout />}>
                        <Route element={<ProtectedRoute requiredRole={UserRole.STAFF_ORDER} />}>                            <Route index element={<Dashboard />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="orders" element={<OrdersList />} />
                            <Route path="orders/:id" element={<OrderDetails />} />
                        </Route>
                    </Route>
                </Routes>
            );

        case UserRole.STAFF_WAREHOUSE:
            return (
                <Routes>
                    <Route element={<StaffLayout />}>
                        <Route element={<ProtectedRoute requiredRole={UserRole.STAFF_WAREHOUSE} />}>
                            <Route index element={<Inventory />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="warehouse/inventory" element={<Inventory />} />
                            <Route path="warehouse/inventory/:id" element={<InventoryDetail />} />
                            <Route path="warehouse/update-stock/:id" element={<UpdateStock />} />
                        </Route>
                    </Route>
                </Routes>
            );

        case UserRole.STAFF_SHIPPING:
            return (
                <Routes>
                    <Route element={<StaffLayout />}>
                        <Route element={<ProtectedRoute requiredRole={UserRole.STAFF_SHIPPING} />}>
                            <Route index element={<Shipments />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="shipping/shipments" element={<Shipments />} />
                            <Route path="shipping/shipments/:id" element={<ShipmentDetail />} />
                            <Route path="shipping/update/:id" element={<UpdateShipment />} />
                        </Route>
                    </Route>
                </Routes>
            );

        default:
            // If somehow a non-staff user gets here, redirect them to login
            console.log('Non-staff user attempted to access staff routes');
            return <Navigate to="/login" replace />;
    }
};

export default StaffRoutes;
