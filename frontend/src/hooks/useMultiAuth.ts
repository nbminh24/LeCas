import { useState, useEffect } from 'react';
import type { User, LoginFormData, RegisterFormData, AuthResponse } from '../types/auth';
import { authService } from '../services/auth.service';

export interface UserSession {
    user: User | null;
    token: string | null;
    role: string | null;
}

// This hook allows for multiple user sessions (admin, staff, and regular user)
export const useMultiAuth = () => {
    // Store sessions for different user roles
    const [sessions, setSessions] = useState<Record<string, UserSession>>({
        admin: { user: null, token: null, role: 'admin' },
        user: { user: null, token: null, role: 'user' },
        staff_warehouse: { user: null, token: null, role: 'staff_warehouse' },
        staff_shipping: { user: null, token: null, role: 'staff_shipping' },
        staff_order: { user: null, token: null, role: 'staff_order' },
    });

    // Current active session
    const [activeSession, setActiveSession] = useState<string | null>(null);

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Get the current user from the active session
    const user = activeSession ? sessions[activeSession]?.user : null;

    // Check if authenticated
    const isAuthenticated = !!user; useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                console.log("Checking authentication state...");

                // Check for admin token
                const adminToken = localStorage.getItem('admin_token'); if (adminToken) {
                    try {
                        console.log("Admin token found, validating...");
                        // Set token temporarily to fetch admin user
                        localStorage.setItem('token', adminToken);
                        const adminUser = await authService.getCurrentUser();

                        // Check if user exists and has admin role
                        if (adminUser) {
                            console.log("Admin token user data:", adminUser);

                            if (adminUser.role === 'admin') {
                                console.log("Admin user validated");
                                setSessions(prev => ({
                                    ...prev,
                                    admin: { user: adminUser, token: adminToken, role: 'admin' }
                                }));

                                // Set as active if no other session is active
                                if (!activeSession) {
                                    console.log("Setting admin as active session");
                                    setActiveSession('admin');
                                }
                            } else {
                                console.warn("User with admin token does not have admin role:", adminUser.role);
                                localStorage.removeItem('admin_token');
                            }
                        } else {
                            console.warn("No user data returned for admin token");
                            localStorage.removeItem('admin_token');
                        }
                    } catch (error: any) {
                        console.error('Admin authentication error:', error);
                        // Clear admin token if there's an auth error (expired, invalid, etc.)
                        localStorage.removeItem('admin_token');
                        setSessions(prev => ({
                            ...prev,
                            admin: { user: null, token: null, role: 'admin' }
                        }));
                    }
                }

                // Check for user token
                const userToken = localStorage.getItem('user_token');
                if (userToken) {
                    try {
                        console.log("User token found, validating...");
                        // Set token temporarily to fetch user
                        localStorage.setItem('token', userToken);
                        const regularUser = await authService.getCurrentUser();

                        if (regularUser && regularUser.role === 'user') {
                            console.log("Regular user validated");
                            setSessions(prev => ({
                                ...prev,
                                user: { user: regularUser, token: userToken, role: 'user' }
                            }));

                            // Set as active if no other session is active or if admin is not active
                            if (!activeSession || activeSession === 'admin' && !sessions.admin.user) {
                                setActiveSession('user');
                            }
                        }
                    } catch (error: any) {
                        console.error('User authentication error:', error);
                        // Clear user token if there's an auth error (expired, invalid, etc.)
                        localStorage.removeItem('user_token');
                        setSessions(prev => ({
                            ...prev,
                            user: { user: null, token: null, role: 'user' }
                        }));
                    }
                }

                // Check for staff tokens - could be a single token or separate tokens per staff role
                const staffToken = localStorage.getItem('staff_token');
                if (staffToken) {
                    try {
                        console.log("Staff token found, validating...");
                        // Set token temporarily to fetch staff user
                        localStorage.setItem('token', staffToken);
                        const staffUser = await authService.getCurrentUser();

                        // Check which type of staff and update the appropriate session
                        if (staffUser) {
                            console.log("Staff user validated:", staffUser.role);

                            if (staffUser.role === 'staff_warehouse' ||
                                staffUser.role === 'staff_shipping' ||
                                staffUser.role === 'staff_order') {

                                setSessions(prev => ({
                                    ...prev,
                                    [staffUser.role]: {
                                        user: staffUser,
                                        token: staffToken,
                                        role: staffUser.role
                                    }
                                }));

                                // Set as active if no other session is active
                                if (!activeSession ||
                                    (activeSession === 'admin' && !sessions.admin.user) ||
                                    (activeSession === 'user' && !sessions.user.user)) {
                                    setActiveSession(staffUser.role);
                                }
                            }
                        }
                    } catch (error: any) {
                        console.error('Staff authentication error:', error);
                        // Clear staff token if there's an auth error
                        localStorage.removeItem('staff_token');
                        // Reset all staff sessions
                        setSessions(prev => ({
                            ...prev,
                            staff_warehouse: { user: null, token: null, role: 'staff_warehouse' },
                            staff_shipping: { user: null, token: null, role: 'staff_shipping' },
                            staff_order: { user: null, token: null, role: 'staff_order' }
                        }));
                    }
                }

                // Set the token for the active session back to localStorage
                if (activeSession && sessions[activeSession]?.token) {
                    localStorage.setItem('token', sessions[activeSession].token!);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Authentication error:', error);
            }

            setIsLoading(false);
        };

        checkLoggedIn();
    }, []);    // Login user
    const login = async (formData: LoginFormData, role: 'admin' | 'user' | 'staff' = 'user'): Promise<AuthResponse> => {
        try {
            console.log(`Attempting to login as ${role}`);
            const { token, user } = await authService.login(formData);
            console.log("Login successful, user data:", user);

            // More detailed role checking for admin users
            if (role === 'admin') {
                console.log("Admin login attempt, checking role:", user.role);
                if (user.role !== 'admin') {
                    console.error("Account does not have admin role:", user.role);
                    return {
                        success: false,
                        message: 'Account does not have admin privileges'
                    };
                }

                console.log("Admin login confirmed, setting admin_token");
            }

            // For staff login attempt, we need to check if they're any type of staff
            if (role === 'staff') {
                if (!user.role.startsWith('staff_')) {
                    return {
                        success: false,
                        message: 'Account does not have staff privileges'
                    };
                }

                // Store token as staff token
                localStorage.setItem('staff_token', token);

                // Also store as the specific staff role token
                localStorage.setItem(`${user.role}_token`, token);

                // Also set as current token
                localStorage.setItem('token', token);

                // Update session for the specific staff role
                setSessions(prev => ({
                    ...prev,
                    [user.role]: { user, token, role: user.role }
                }));

                // Set as active session
                setActiveSession(user.role);

                return { success: true };
            }

            // For regular user login attempt
            if (role === 'user' && user.role !== 'user') {
                // If they're an admin trying to login as a user, let them know
                if (user.role === 'admin') {
                    return {
                        success: false,
                        message: 'Please use the admin login'
                    };
                }

                // If they're staff trying to login as a user, let them know
                if (user.role.startsWith('staff_')) {
                    return {
                        success: false,
                        message: 'Please use the staff login'
                    };
                }

                return {
                    success: false,
                    message: 'Invalid role for this login'
                };
            }

            // Store token based on role
            localStorage.setItem(`${role}_token`, token);

            // Also set as current token
            localStorage.setItem('token', token);

            // Update session
            setSessions(prev => ({
                ...prev,
                [role]: { user, token, role }
            }));

            // Set as active session
            setActiveSession(role);

            return { success: true };
        } catch (error: any) {
            console.error('Login error:', error);
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed. Please check your credentials.'
            };
        }
    };

    // Register user (always registers as regular user)
    const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
        try {
            const { token, user } = await authService.register(formData);

            // Store token for user role
            localStorage.setItem('user_token', token);

            // Also set as current token
            localStorage.setItem('token', token);

            // Update session
            setSessions(prev => ({
                ...prev,
                user: { user, token, role: 'user' }
            }));

            // Set as active session
            setActiveSession('user');

            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    // Logout from current session
    const logout = (role?: 'admin' | 'user') => {
        const roleToLogout = role || activeSession;

        if (roleToLogout) {
            // Remove token for the specific role
            localStorage.removeItem(`${roleToLogout}_token`);

            // Update session state
            setSessions(prev => ({
                ...prev,
                [roleToLogout]: { user: null, token: null, role: roleToLogout }
            }));

            // If logging out of active session, switch to other session if available
            if (!role || roleToLogout === activeSession) {
                const otherRole = roleToLogout === 'admin' ? 'user' : 'admin';

                if (sessions[otherRole]?.user) {
                    setActiveSession(otherRole);
                    localStorage.setItem('token', sessions[otherRole].token!);
                } else {
                    setActiveSession(null);
                    localStorage.removeItem('token');
                }
            }
        }
    };

    // Switch between sessions
    const switchSession = (role: string): boolean => {
        console.log(`Attempting to switch to ${role} session`);

        // Check if the session exists and has a user
        if (sessions[role]?.user) {
            console.log(`Valid ${role} session found, switching...`);

            // Set the active session
            setActiveSession(role);

            // Update token in localStorage
            if (sessions[role]?.token) {
                console.log(`Setting token for ${role} session`);
                localStorage.setItem('token', sessions[role].token!);
            }

            return true;
        }

        console.log(`No valid ${role} session found`);
        return false;
    };

    // Get all active sessions
    const getActiveSessions = () => {
        return Object.entries(sessions)
            .filter(([_, session]) => session.user !== null)
            .map(([role, _]) => role);
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        switchSession,
        getActiveSessions,
        activeRole: activeSession
    };
};
