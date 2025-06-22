import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../roles/admin/AdminLayout';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
import { ROUTES } from '../constants/routes';
import { UserRole } from '../constants/routes';

// Import admin pages
import Dashboard from '../roles/admin/pages/Dashboard';
import ManageProducts from '../roles/admin/pages/ManageProducts';
import ProductDetail from '../roles/admin/pages/ProductDetail';
import ProductCreate from '../roles/admin/pages/ProductCreate';
import ProductEdit from '../roles/admin/pages/ProductEdit';
import ManageUsers from '../roles/admin/pages/ManageUsers';
import UserDetail from '../roles/admin/pages/UserDetail';
import ManageOrders from '../roles/admin/pages/ManageOrders';
import OrderDetail from '../roles/admin/pages/OrderDetail';
import ManageCategories from '../roles/admin/pages/ManageCategories';
import StaffManagement from '../roles/admin/pages/StaffManagement';
import Reports from '../roles/admin/pages/Reports';
import Feedback from '../roles/admin/pages/Feedback';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute requiredRole={UserRole.ADMIN} />
                }
            >
                <Route element={<AdminLayout />}>
                    <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.ADMIN.PRODUCTS} element={<ManageProducts />} />
                    <Route path={ROUTES.ADMIN.PRODUCT_DETAIL} element={<ProductDetail />} />
                    <Route path={ROUTES.ADMIN.PRODUCT_CREATE} element={<ProductCreate />} />
                    <Route path={ROUTES.ADMIN.PRODUCT_EDIT} element={<ProductEdit />} />
                    <Route path={ROUTES.ADMIN.USERS} element={<ManageUsers />} />
                    <Route path={ROUTES.ADMIN.USER_DETAIL} element={<UserDetail />} />
                    <Route path={ROUTES.ADMIN.ORDERS} element={<ManageOrders />} />
                    <Route path={ROUTES.ADMIN.ORDER_DETAIL} element={<OrderDetail />} />
                    <Route path={ROUTES.ADMIN.CATEGORIES} element={<ManageCategories />} />
                    <Route path={ROUTES.ADMIN.STAFF_MANAGEMENT} element={<StaffManagement />} />
                    <Route path={ROUTES.ADMIN.REPORTS} element={<Reports />} />
                    <Route path={ROUTES.ADMIN.FEEDBACK} element={<Feedback />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
