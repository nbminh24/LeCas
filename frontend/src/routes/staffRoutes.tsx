import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import StaffLayout from '../roles/staff/StaffLayout';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
import { UserRole } from '../constants/routes';

// Staff Order pages
import Dashboard from '../roles/staff/pages/Dashboard';
import OrdersTabs from '../roles/staff/pages/OrdersTabs';
import OrderDetails from '../roles/staff/subroles/orders/OrderDetails';

// Staff Warehouse pages
import Inventory from '../roles/staff/subroles/warehouse/Inventory';
import InventoryDetail from '../roles/staff/subroles/warehouse/InventoryDetail';
import UpdateStock from '../roles/staff/subroles/warehouse/UpdateStock';
import WarehouseOrdersPending from '../roles/staff/subroles/warehouse/WarehouseOrdersPending';
import WarehouseOrdersPacked from '../roles/staff/subroles/warehouse/WarehouseOrdersPacked';
import WarehouseImport from '../roles/staff/subroles/warehouse/WarehouseImport';
import WarehouseReports from '../roles/staff/subroles/warehouse/WarehouseReports';
import WarehouseReturns from '../roles/staff/subroles/warehouse/WarehouseReturns';

// Staff Shipping pages
import Shipments from '../roles/staff/subroles/shipping/Shipments';
import ShipmentDetail from '../roles/staff/subroles/shipping/ShipmentDetail';
import UpdateShipment from '../roles/staff/subroles/shipping/UpdateShipment';
import ShippingDashboard from '../roles/staff/subroles/shipping/ShippingDashboard';
import ShippingOrdersList from '../roles/staff/subroles/shipping/ShippingOrdersList';
import ShippingOrderDetail from '../roles/staff/subroles/shipping/ShippingOrderDetail';
import ShippingLogs from '../roles/staff/subroles/shipping/ShippingLogs';
import ShippingTracking from '../roles/staff/subroles/shipping/ShippingTracking';

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
                            <Route path="orders" element={<Navigate to="/staff/orders/pending" replace />} />
                            <Route path="orders/pending" element={<OrdersTabs />} />
                            <Route path="orders/confirmed" element={<OrdersTabs />} />
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
                            <Route path="warehouse/orders" element={<WarehouseOrdersPending />} />
                            <Route path="warehouse/packed" element={<WarehouseOrdersPacked />} />
                            <Route path="warehouse/update-stock/:id" element={<UpdateStock />} />
                            <Route path="warehouse/import" element={<WarehouseImport />} />
                            <Route path="warehouse/reports" element={<WarehouseReports />} />
                            <Route path="warehouse/returns" element={<WarehouseReturns />} />
                        </Route>
                    </Route>
                </Routes>
            );

        case UserRole.STAFF_SHIPPING:
            return (
                <Routes>
                    <Route element={<StaffLayout />}>
                        <Route element={<ProtectedRoute requiredRole={UserRole.STAFF_SHIPPING} />}>
                            <Route index element={<Navigate to="/staff/shipping/orders/pending" replace />} />
                            <Route path="dashboard" element={<ShippingDashboard />} />
                            <Route path="shipping/orders/pending" element={<ShippingOrdersList status="pending" />} />
                            <Route path="shipping/orders/created" element={<ShippingOrdersList status="created" />} />
                            <Route path="shipping/orders/delivered" element={<ShippingOrdersList status="delivered" />} />
                            <Route path="shipping/orders/failed" element={<ShippingOrdersList status="failed" />} />
                            <Route path="shipping/orders/cancelled" element={<ShippingOrdersList status="cancelled" />} />
                            <Route path="shipping/orders/:id" element={<ShippingOrderDetail />} />
                            <Route path="shipping/logs" element={<ShippingLogs />} />
                            <Route path="shipping/tracking/:tracking_number" element={<ShippingTracking trackingNumber={":tracking_number"} />} />
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
