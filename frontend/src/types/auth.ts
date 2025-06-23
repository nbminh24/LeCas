export interface User {
    id: string;
    username?: string;
    name?: string;
    email: string;
    displayName?: string;
    avatar?: string;
    role: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    token?: string;
    user?: User | null;
}

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}
