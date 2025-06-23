import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoutes from './adminRoutes';
import StaffRoutes from './staffRoutes';
import UserRoutes from './userRoutes';
import Login from '@features/auth/login/Login';
import Register from '@features/auth/register/Register';
import AuthSuccess from '@features/auth/callback/AuthSuccess';
import AuthFailed from '@features/auth/callback/AuthFailed';
import { RoleBasedRoute } from '@features/auth/routes/RoleBasedRoute';
import { ROUTES } from '../constants/routes';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.AUTH_SUCCESS} element={<AuthSuccess />} />
            <Route path={ROUTES.AUTH_FAILED} element={<AuthFailed />} />

            {/* Route Redirector - This route determines where to send the user based on their role */}
            <Route path="/dashboard" element={<RoleBasedRoute />} />

            {/* Debug route to check auth status */}
            <Route path="/auth-check" element={
                <div style={{ padding: '20px' }}>
                    <h1>Authentication Check</h1>
                    <p>If you can see this, you're logged in</p>
                    <p>You'll be redirected in 3 seconds...</p>
                    <RoleBasedRoute />
                </div>
            } />

            {/* Nested Routes by Role */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/staff/*" element={<StaffRoutes />} />
            <Route path="/*" element={<UserRoutes />} />
        </Routes>
    );
};

export default AppRoutes;
