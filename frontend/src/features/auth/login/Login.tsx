import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../../hooks/useAuth';
import './Login.css';

const Login = () => {
    const { login, googleLogin, getActiveSessions } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if the URL has a hidden portal param (admin or staff)
    const searchParams = new URLSearchParams(location.search);
    const portalType = searchParams.get('portal');
    const isAdminPortal = portalType === 'admin';
    const isStaffPortal = portalType === 'staff';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPortalHint, setShowPortalHint] = useState(false);
    const [error, setError] = useState('');
    const [activeSessions] = useState(getActiveSessions());

    const { email, password } = formData;

    // Reset URL without the portal param
    useEffect(() => {
        if (portalType) {
            // Remove the query parameter without reloading the page
            const newUrl = `${window.location.pathname}`;
            window.history.replaceState({}, document.title, newUrl);
        }
    }, [portalType]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }; const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            console.log('Attempting login with:', { email, portalType });

            // Determine the role for login
            let loginRole: 'admin' | 'user' | 'staff' = 'user';
            if (isAdminPortal) {
                loginRole = 'admin';
            } else if (isStaffPortal) {
                loginRole = 'staff';
            }

            const result = await login(formData, loginRole);
            console.log('Login result:', result);

            if (result.success) {
                console.log('Login successful, redirecting to dashboard...');
                // Force a small delay to ensure state is updated before navigation
                setTimeout(() => {
                    console.log('Navigating to dashboard now');
                    navigate('/dashboard', { replace: true });
                }, 300);
            } else {
                console.error('Login failed:', result.message);
                setError(result.message || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };    // Secret key press combination to show portal hints (Ctrl+Shift+A for admin, Ctrl+Shift+S for staff)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey) {
                if (e.key === 'A') {
                    setShowPortalHint(true);
                    setTimeout(() => setShowPortalHint(false), 3000);
                } else if (e.key === 'S') {
                    setShowPortalHint(true);
                    setTimeout(() => setShowPortalHint(false), 3000);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []); return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="login-form">
                    <h1>
                        {isAdminPortal ? 'Admin Login' :
                            isStaffPortal ? 'Staff Login' : 'Log in'}
                    </h1>
                    {error && <div className="error-message">{error}</div>}

                    {showPortalHint && (
                        <div className="admin-hint">
                            {/* Show different hints based on key combination */}
                            Admin portal: /login?portal=admin<br />
                            Staff portal: /login?portal=staff
                        </div>
                    )}

                    {!isAdminPortal && !isStaffPortal && (
                        <button
                            type="button"
                            className="google-sign-in-btn"
                            onClick={googleLogin}
                        >
                            <FcGoogle /> Sign in with Google
                        </button>
                    )}

                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="name@email.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="••••••"
                                required
                            />
                        </div>                        <button type="submit" className="btn-submit">
                            {isAdminPortal ? 'Sign in to Admin Portal' :
                                isStaffPortal ? 'Sign in to Staff Portal' : 'Sign in'}
                        </button>
                    </form>

                    {activeSessions.length > 0 && (
                        <div className="active-sessions">
                            <h3>Active Sessions</h3>
                            <p>You are already logged in as: {activeSessions.join(', ')}</p>
                        </div>
                    )}

                    {!isAdminPortal && (
                        <p className="register-link">
                            Don't have an account? <Link to="/register">Sign up</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
