import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserLayout from '../roles/user/UserLayout';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
import { ROUTES } from '../constants/routes';
import { UserRole } from '../constants/routes';

// Import user pages
import Home from '../roles/user/pages/Home';
import ProductList from '../roles/user/pages/ProductList';
import ProductDetail from '../roles/user/pages/ProductDetail';
import Cart from '../roles/user/pages/Cart';
import Checkout from '../roles/user/pages/Checkout';
import OrdersList from '../roles/user/pages/OrdersList';
import OrderDetail from '../roles/user/pages/OrderDetail';
import Profile from '../roles/user/pages/Profile';
import Wishlist from '../roles/user/pages/Wishlist';
import Reviews from '../roles/user/pages/Reviews';

const UserRoutes = () => {
    return (
        <Routes>
            <Route
                element={
                    <ProtectedRoute requiredRole={UserRole.USER} />
                }
            >
                <Route element={<UserLayout />}>
                    <Route path={ROUTES.USER.HOME} element={<Home />} />
                    <Route path={ROUTES.USER.PRODUCTS} element={<ProductList />} />
                    <Route path={ROUTES.USER.PRODUCT_CATEGORY} element={<ProductList />} />
                    <Route path={ROUTES.USER.PRODUCT_DETAIL} element={<ProductDetail />} />
                    <Route path={ROUTES.USER.CART} element={<Cart />} />
                    <Route path={ROUTES.USER.CHECKOUT} element={<Checkout />} />
                    <Route path={ROUTES.USER.ORDERS} element={<OrdersList />} />
                    <Route path={ROUTES.USER.ORDER_DETAIL} element={<OrderDetail />} />
                    <Route path={ROUTES.USER.PROFILE} element={<Profile />} />
                    <Route path={ROUTES.USER.WISHLIST} element={<Wishlist />} />
                    <Route path={ROUTES.USER.REVIEWS} element={<Reviews />} />
                </Route>
            </Route>

            {/* Public user-facing routes that don't require login */}
            <Route element={<UserLayout />}>
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/category/:category" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
