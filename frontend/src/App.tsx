import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@features/auth/context/AuthContext';
import { ProtectedRoute } from '@features/auth/routes/ProtectedRoute';
import { RoleBasedRoute } from '@features/auth/routes/RoleBasedRoute';
import Login from '@features/auth/login/Login';
import Register from '@features/auth/register/Register';
import Dashboard from '@features/dashboard/Dashboard';
import AdminDashboard from '@features/admin/AdminDashboard';
import AuthSuccess from '@features/auth/callback/AuthSuccess';
import AuthFailed from '@features/auth/callback/AuthFailed';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/auth/failed" element={<AuthFailed />} />

            {/* Route Redirector */}
            <Route path="/dashboard" element={<RoleBasedRoute />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
