import { useState, useEffect } from 'react';
import type { User, LoginFormData, RegisterFormData, AuthResponse } from '../types/auth';
import { authService } from '../services/auth.service';
import { UserRole } from '../constants/routes';

export interface UserSession {
    user: User | null;
    token: string | null;
    role: string | null;
}

export const useMultiAuth = () => {
    const [sessions, setSessions] = useState<Record<string, UserSession>>({
        admin: { user: null, token: null, role: UserRole.ADMIN },
        user: { user: null, token: null, role: UserRole.USER },
        staff_warehouse: { user: null, token: null, role: UserRole.STAFF_WAREHOUSE },
        staff_shipping: { user: null, token: null, role: UserRole.STAFF_SHIPPING },
        staff_order: { user: null, token: null, role: UserRole.STAFF_ORDER },
    });

    const [activeSession, setActiveSession] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const user = activeSession ? sessions[activeSession]?.user : null;
    const isAuthenticated = !!user;

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                console.log("Checking authentication state...");
                const storedToken = localStorage.getItem('token');

                if (!storedToken) {
                    setIsLoading(false);
                    return;
                }

                const currentUser = await authService.getCurrentUser();
                if (!currentUser) {
                    setIsLoading(false);
                    return;
                }

                console.log("User data retrieved:", { role: currentUser.role });

                let sessionType: string;
                switch (currentUser.role.toLowerCase()) {
                    case UserRole.ADMIN.toLowerCase():
                        sessionType = 'admin';
                        localStorage.setItem('admin_token', storedToken);
                        break;
                    case UserRole.STAFF_WAREHOUSE.toLowerCase():
                        sessionType = 'staff_warehouse';
                        localStorage.setItem('staff_token', storedToken);
                        break;
                    case UserRole.STAFF_SHIPPING.toLowerCase():
                        sessionType = 'staff_shipping';
                        localStorage.setItem('staff_token', storedToken);
                        break;
                    case UserRole.STAFF_ORDER.toLowerCase():
                        sessionType = 'staff_order';
                        localStorage.setItem('staff_token', storedToken);
                        break;
                    case UserRole.USER.toLowerCase():
                        sessionType = 'user';
                        localStorage.setItem('user_token', storedToken);
                        break;
                    default:
                        sessionType = 'user';
                        localStorage.setItem('user_token', storedToken);
                }

                setSessions(prev => ({
                    ...prev,
                    [sessionType]: {
                        user: currentUser,
                        token: storedToken,
                        role: currentUser.role
                    }
                }));

                setActiveSession(sessionType);
                console.log(`Set active session to ${sessionType}`);
            } catch (error) {
                console.error('Error checking authentication:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('admin_token');
                localStorage.removeItem('user_token');
                localStorage.removeItem('staff_token');
            } finally {
                setIsLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    const login = async (formData: LoginFormData, _role: string = 'user'): Promise<AuthResponse> => {
        try {
            const response = await authService.login(formData);
            console.log('Login response received');

            if (!response.token || !response.user) {
                throw new Error('Invalid response from login');
            }

            const { token, user } = response;
            console.log('Processing login for user:', user.role);

            localStorage.setItem('token', token);

            const sessionType = user.role.toLowerCase();
            setSessions(prev => ({
                ...prev,
                [sessionType]: { user, token, role: user.role }
            }));

            setActiveSession(sessionType);
            console.log(`Login successful, session type: ${sessionType}`);

            return {
                success: true,
                token,
                user
            };
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = (role?: 'admin' | 'user' | undefined) => {
        if (role) {
            const sessionType = role.toLowerCase();
            setSessions(prev => ({
                ...prev,
                [sessionType]: { user: null, token: null, role: sessionType }
            }));

            switch (sessionType) {
                case 'admin':
                    localStorage.removeItem('admin_token');
                    break;
                case 'user':
                    localStorage.removeItem('user_token');
                    break;
                default:
                    localStorage.removeItem('staff_token');
            }

            if (activeSession === sessionType) {
                const otherActiveSession = Object.entries(sessions)
                    .find(([key, sess]) => key !== sessionType && sess.user);
                setActiveSession(otherActiveSession ? otherActiveSession[0] : null);
            }
        } else {
            setSessions({
                admin: { user: null, token: null, role: 'admin' },
                user: { user: null, token: null, role: 'user' },
                staff_warehouse: { user: null, token: null, role: 'staff_warehouse' },
                staff_shipping: { user: null, token: null, role: 'staff_shipping' },
                staff_order: { user: null, token: null, role: 'staff_order' }
            });
            setActiveSession(null);
            localStorage.clear();
        }
    };

    const register = async (formData: RegisterFormData): Promise<AuthResponse> => {
        try {
            const response = await authService.register(formData);
            const { token, user } = response;

            if (token && user) {
                localStorage.setItem('token', token);
                localStorage.setItem('user_token', token);

                setSessions(prev => ({
                    ...prev,
                    user: { user, token, role: 'user' }
                }));
                setActiveSession('user');
            }

            return {
                success: true,
                token: token || '',
                user: user || null
            };
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const switchSession = (role: string): boolean => {
        const session = sessions[role];
        if (session?.user && session?.token) {
            setActiveSession(role);
            localStorage.setItem('token', session.token);
            return true;
        }
        return false;
    };

    const getActiveSessions = () => {
        return Object.entries(sessions)
            .filter(([_, session]) => session.user !== null)
            .map(([role]) => role);
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
