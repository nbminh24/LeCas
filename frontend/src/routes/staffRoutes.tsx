import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StaffLayout from '../roles/staff/StaffLayout';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
import { ROUTES } from '../constants/routes';
import { UserRole } from '../constants/routes';

// Import staff pages
import Dashboard from '../roles/staff/pages/Dashboard';
import OrdersList from '../roles/staff/pages/OrdersList';
import OrderDetail from '../roles/staff/pages/OrderDetail';
import SearchOrders from '../roles/staff/pages/SearchOrders';

// Import warehouse pages
import Inventory from '../roles/staff/subroles/warehouse/Inventory';
import InventoryDetail from '../roles/staff/subroles/warehouse/InventoryDetail';
import UpdateStock from '../roles/staff/subroles/warehouse/UpdateStock';

// Import shipping pages
import Shipments from '../roles/staff/subroles/shipping/Shipments';
import ShipmentDetail from '../roles/staff/subroles/shipping/ShipmentDetail';
import UpdateShipment from '../roles/staff/subroles/shipping/UpdateShipment';

const StaffRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute requiredRole={UserRole.STAFF} />
                }
            >
                <Route element={<StaffLayout />}>
                    {/* Main staff routes */}
                    <Route path={ROUTES.STAFF.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.STAFF.ORDERS} element={<OrdersList />} />
                    <Route path={ROUTES.STAFF.ORDER_DETAIL} element={<OrderDetail />} />
                    <Route path={ROUTES.STAFF.SEARCH_ORDERS} element={<SearchOrders />} />

                    {/* Warehouse staff routes */}
                    <Route
                        path={ROUTES.STAFF.WAREHOUSE.INVENTORY}
                        element={<Inventory />}
                    />
                    <Route
                        path={ROUTES.STAFF.WAREHOUSE.INVENTORY_DETAIL}
                        element={<InventoryDetail />}
                    />
                    <Route
                        path={ROUTES.STAFF.WAREHOUSE.UPDATE_STOCK}
                        element={<UpdateStock />}
                    />

                    {/* Shipping staff routes */}
                    <Route
                        path={ROUTES.STAFF.SHIPPING.SHIPMENTS}
                        element={<Shipments />}
                    />
                    <Route
                        path={ROUTES.STAFF.SHIPPING.SHIPMENT_DETAIL}
                        element={<ShipmentDetail />}
                    />
                    <Route
                        path={ROUTES.STAFF.SHIPPING.UPDATE_SHIPMENT}
                        element={<UpdateShipment />}
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default StaffRoutes;
