import type { User, LoginFormData, RegisterFormData } from '../types/auth';

// Mock user data
const mockUsers: User[] = [
    {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
    },
    {
        id: '2',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user'
    }
];

// In-memory storage for mock users (for registrations)
let registeredUsers = [...mockUsers];

export const mockAuthService = {
    /**
     * Register a new user - mock implementation
     */
    register: async (formData: RegisterFormData): Promise<{ token: string; user: User }> => {
        // Check if user already exists
        const existingUser = registeredUsers.find(user => user.email === formData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Create new user
        const newUser: User = {
            id: String(registeredUsers.length + 1),
            email: formData.email,
            name: formData.name,
            role: 'user' // New registrations are always regular users
        };

        // Add to mock database
        registeredUsers.push(newUser);

        // Generate mock token
        const token = `mock_token_${newUser.id}_${Date.now()}`;

        return {
            token,
            user: newUser
        };
    },

    /**
     * Login a user - mock implementation
     */
    login: async (formData: LoginFormData): Promise<{ token: string; user: User }> => {
        // Find user by email
        const user = registeredUsers.find(user => user.email === formData.email);

        // If no user found or password doesn't match 'password'
        if (!user || formData.password !== 'password') {
            throw new Error('Invalid credentials');
        }

        // Generate mock token
        const token = `mock_token_${user.id}_${Date.now()}`;

        return {
            token,
            user
        };
    },

    /**
     * Get current user data - mock implementation
     * This simulates validating a token and returning user data
     */
    getCurrentUser: async (token?: string): Promise<User> => {
        // In a real implementation, you would validate the token
        // Here we're just checking if it's a mock token
        if (!token || !token.startsWith('mock_token_')) {
            throw new Error('Invalid token');
        }

        // Extract user ID from token
        const userId = token.split('_')[2];
        const user = registeredUsers.find(user => user.id === userId);

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }
};

// Add demo accounts for easy testing
export const getDemoCredentials = () => {
    return {
        admin: {
            email: 'admin@example.com',
            password: 'password'
        },
        user: {
            email: 'user@example.com',
            password: 'password'
        }
    };
};

// Helper function to register a new demo user
export const registerDemoUser = async (name: string, email: string): Promise<User> => {
    try {
        const result = await mockAuthService.register({
            name,
            email,
            password: 'password'
        });
        return result.user;
    } catch (error) {
        console.error('Failed to register demo user:', error);
        throw error;
    }
};
