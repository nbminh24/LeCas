import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../roles/admin/AdminLayout';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
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
    console.log("AdminRoutes component rendering");

    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute requiredRole={UserRole.ADMIN} />
                }
            >
                <Route element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="products" element={<ManageProducts />} />
                    <Route path="products/create" element={<ProductCreate />} />
                    <Route path="products/edit/:id" element={<ProductEdit />} />
                    <Route path="products/:id" element={<ProductDetail />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="users/:id" element={<UserDetail />} />
                    <Route path="orders" element={<ManageOrders />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                    <Route path="categories" element={<ManageCategories />} />
                    <Route path="staff" element={<StaffManagement />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="feedback" element={<Feedback />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;