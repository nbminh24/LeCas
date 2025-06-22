import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ManageUsers.css';

interface User {
    id: string;
    username: string;
    email: string;
    role: 'admin' | 'staff' | 'user';
    status: 'active' | 'inactive' | 'suspended';
    lastLogin: string;
    dateJoined: string;
}

const ManageUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        // Simulate fetching users from API
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // This would be replaced with an actual API call
                // const response = await api.get('/users');
                // setUsers(response.data);

                // Mock data for demonstration
                setTimeout(() => {
                    const mockUsers: User[] = [
                        {
                            id: '1',
                            username: 'admin_user',
                            email: 'admin@example.com',
                            role: 'admin',
                            status: 'active',
                            lastLogin: '2023-12-01T08:30:00Z',
                            dateJoined: '2023-01-15T00:00:00Z'
                        },
                        {
                            id: '2',
                            username: 'staff_user1',
                            email: 'staff1@example.com',
                            role: 'staff',
                            status: 'active',
                            lastLogin: '2023-11-28T14:20:00Z',
                            dateJoined: '2023-03-10T00:00:00Z'
                        },
                        {
                            id: '3',
                            username: 'staff_user2',
                            email: 'staff2@example.com',
                            role: 'staff',
                            status: 'inactive',
                            lastLogin: '2023-10-15T09:45:00Z',
                            dateJoined: '2023-05-22T00:00:00Z'
                        },
                        {
                            id: '4',
                            username: 'customer1',
                            email: 'customer1@example.com',
                            role: 'user',
                            status: 'active',
                            lastLogin: '2023-12-02T16:10:00Z',
                            dateJoined: '2023-06-18T00:00:00Z'
                        },
                        {
                            id: '5',
                            username: 'customer2',
                            email: 'customer2@example.com',
                            role: 'user',
                            status: 'suspended',
                            lastLogin: '2023-09-05T11:30:00Z',
                            dateJoined: '2023-07-30T00:00:00Z'
                        },
                        {
                            id: '6',
                            username: 'customer3',
                            email: 'customer3@example.com',
                            role: 'user',
                            status: 'active',
                            lastLogin: '2023-11-30T13:15:00Z',
                            dateJoined: '2023-08-12T00:00:00Z'
                        }
                    ];

                    setUsers(mockUsers);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search term, role, and status
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Function to format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    // Function to get status badge class
    const getStatusBadgeClass = (status: User['status']): string => {
        switch (status) {
            case 'active': return 'status-active';
            case 'inactive': return 'status-inactive';
            case 'suspended': return 'status-suspended';
            default: return '';
        }
    };

    // Function to get role badge class
    const getRoleBadgeClass = (role: User['role']): string => {
        switch (role) {
            case 'admin': return 'role-admin';
            case 'staff': return 'role-staff';
            case 'user': return 'role-user';
            default: return '';
        }
    };

    return (
        <div className="manage-users-container">
            <div className="page-header">
                <h1>User Management</h1>
                <Link to="/admin/users/create" className="create-user-btn">
                    Create User
                </Link>
            </div>

            <div className="filters-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filter-options">
                    <div className="filter-group">
                        <label htmlFor="roleFilter">Role:</label>
                        <select
                            id="roleFilter"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="statusFilter">Status:</label>
                        <select
                            id="statusFilter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading-indicator">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
                <div className="no-results">
                    <p>No users found matching your filters.</p>
                </div>
            ) : (
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Last Login</th>
                                <th>Date Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>{formatDate(user.lastLogin)}</td>
                                    <td>{formatDate(user.dateJoined)}</td>
                                    <td className="actions-cell">
                                        <Link to={`/admin/users/${user.id}`} className="view-btn">
                                            View
                                        </Link>
                                        <Link to={`/admin/users/${user.id}/edit`} className="edit-btn">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
