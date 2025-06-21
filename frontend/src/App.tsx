import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleBasedRoute from './components/RoleBasedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthSuccess from './pages/AuthSuccess';
import AuthFailed from './pages/AuthFailed';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={<RoleBasedRoute />}
            />
            <Route path="/auth/success" element={<AuthSuccess />} />
            <Route path="/auth/failed" element={<AuthFailed />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
