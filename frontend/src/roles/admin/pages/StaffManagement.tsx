import React, { useState, useEffect } from 'react';
import './StaffManagement.css';

interface Staff {
    id: string;
    name: string;
    email: string;
    role: string;
    subrole: string;
    status: 'active' | 'inactive';
    lastLogin: string;
    createdAt: string;
}

const StaffManagement: React.FC = () => {
    const [staffMembers, setStaffMembers] = useState<Staff[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newStaff, setNewStaff] = useState({
        name: '',
        email: '',
        role: 'staff',
        subrole: 'warehouse',
        status: 'active' as const
    });
    const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
    const [filter, setFilter] = useState({
        role: 'all',
        subrole: 'all',
        status: 'all'
    });

    useEffect(() => {
        // Mock data loading - would be an API call in a real application
        setTimeout(() => {
            const mockStaffMembers: Staff[] = [
                {
                    id: '1',
                    name: 'John Smith',
                    email: 'john.smith@example.com',
                    role: 'staff',
                    subrole: 'warehouse',
                    status: 'active',
                    lastLogin: '2023-10-15 09:45:12',
                    createdAt: '2023-01-10'
                },
                {
                    id: '2',
                    name: 'Emily Johnson',
                    email: 'emily.johnson@example.com',
                    role: 'staff',
                    subrole: 'shipping',
                    status: 'active',
                    lastLogin: '2023-10-14 16:30:22',
                    createdAt: '2023-02-15'
                },
                {
                    id: '3',
                    name: 'Michael Brown',
                    email: 'michael.brown@example.com',
                    role: 'staff',
                    subrole: 'warehouse',
                    status: 'inactive',
                    lastLogin: '2023-09-30 11:20:05',
                    createdAt: '2023-03-05'
                },
                {
                    id: '4',
                    name: 'Jessica Williams',
                    email: 'jessica.williams@example.com',
                    role: 'staff',
                    subrole: 'shipping',
                    status: 'active',
                    lastLogin: '2023-10-15 08:15:45',
                    createdAt: '2023-04-20'
                },
                {
                    id: '5',
                    name: 'David Garcia',
                    email: 'david.garcia@example.com',
                    role: 'staff',
                    subrole: 'warehouse',
                    status: 'active',
                    lastLogin: '2023-10-13 14:50:33',
                    createdAt: '2023-05-12'
                }
            ];

            setStaffMembers(mockStaffMembers);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleAddStaff = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be an API call
        const newStaffMember: Staff = {
            id: Date.now().toString(),
            name: newStaff.name,
            email: newStaff.email,
            role: newStaff.role,
            subrole: newStaff.subrole,
            status: newStaff.status,
            lastLogin: 'Never',
            createdAt: new Date().toISOString().split('T')[0]
        };

        setStaffMembers([...staffMembers, newStaffMember]);
        setNewStaff({
            name: '',
            email: '',
            role: 'staff',
            subrole: 'warehouse',
            status: 'active'
        });
        setShowAddForm(false);
    };

    const handleEditStaff = (staff: Staff) => {
        setEditingStaff(staff);
    };

    const handleUpdateStaff = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStaff) return;

        // In a real app, this would be an API call
        const updatedStaffMembers = staffMembers.map(staff =>
            staff.id === editingStaff.id ? editingStaff : staff
        );

        setStaffMembers(updatedStaffMembers);
        setEditingStaff(null);
    };

    const handleDeleteStaff = (id: string) => {
        // In a real app, this would be an API call
        if (window.confirm('Are you sure you want to remove this staff member?')) {
            setStaffMembers(staffMembers.filter(staff => staff.id !== id));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (editingStaff) {
            setEditingStaff({
                ...editingStaff,
                [name]: value
            });
        } else {
            setNewStaff({
                ...newStaff,
                [name]: value
            });
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const filteredStaff = staffMembers.filter(staff => {
        return (
            (filter.role === 'all' || staff.role === filter.role) &&
            (filter.subrole === 'all' || staff.subrole === filter.subrole) &&
            (filter.status === 'all' || staff.status === filter.status)
        );
    });

    if (isLoading) {
        return <div className="loading">Loading staff members...</div>;
    }

    return (
        <div className="staff-management-container">
            <div className="header-section">
                <h1>Staff Management</h1>
                <button
                    className="btn-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add New Staff'}
                </button>
            </div>

            {showAddForm && (
                <div className="form-container">
                    <h2>Add New Staff Member</h2>
                    <form onSubmit={handleAddStaff}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newStaff.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={newStaff.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={newStaff.role}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subrole">Subrole</label>
                                <select
                                    id="subrole"
                                    name="subrole"
                                    value={newStaff.subrole}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="warehouse">Warehouse</option>
                                    <option value="shipping">Shipping</option>
                                    <option value="customer-service">Customer Service</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={newStaff.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Add Staff Member</button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {editingStaff && (
                <div className="form-container">
                    <h2>Edit Staff Member</h2>
                    <form onSubmit={handleUpdateStaff}>
                        <div className="form-group">
                            <label htmlFor="edit-name">Full Name</label>
                            <input
                                type="text"
                                id="edit-name"
                                name="name"
                                value={editingStaff.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-email">Email Address</label>
                            <input
                                type="email"
                                id="edit-email"
                                name="email"
                                value={editingStaff.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="edit-role">Role</label>
                                <select
                                    id="edit-role"
                                    name="role"
                                    value={editingStaff.role}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="staff">Staff</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-subrole">Subrole</label>
                                <select
                                    id="edit-subrole"
                                    name="subrole"
                                    value={editingStaff.subrole}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="warehouse">Warehouse</option>
                                    <option value="shipping">Shipping</option>
                                    <option value="customer-service">Customer Service</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="edit-status">Status</label>
                                <select
                                    id="edit-status"
                                    name="status"
                                    value={editingStaff.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Update Staff Member</button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setEditingStaff(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="filters-section">
                <div className="filter-group">
                    <label htmlFor="filter-role">Filter by Role:</label>
                    <select
                        id="filter-role"
                        name="role"
                        value={filter.role}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Roles</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="filter-subrole">Filter by Subrole:</label>
                    <select
                        id="filter-subrole"
                        name="subrole"
                        value={filter.subrole}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Subroles</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="shipping">Shipping</option>
                        <option value="customer-service">Customer Service</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="filter-status">Filter by Status:</label>
                    <select
                        id="filter-status"
                        name="status"
                        value={filter.status}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="staff-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Subrole</th>
                            <th>Status</th>
                            <th>Last Login</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map(staff => (
                                <tr key={staff.id} className={staff.status === 'inactive' ? 'inactive-row' : ''}>
                                    <td>{staff.name}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.role}</td>
                                    <td>{staff.subrole}</td>
                                    <td>
                                        <span className={`status-badge ${staff.status}`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td>{staff.lastLogin}</td>
                                    <td>{staff.createdAt}</td>
                                    <td className="actions-cell">
                                        <button
                                            className="btn-secondary btn-sm"
                                            onClick={() => handleEditStaff(staff)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn-danger btn-sm"
                                            onClick={() => handleDeleteStaff(staff.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="no-results">No staff members found matching the selected filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffManagement;
