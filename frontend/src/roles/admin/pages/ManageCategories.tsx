import React, { useState, useEffect } from 'react';
import './ManageCategories.css';

interface Category {
    id: string;
    name: string;
    description: string;
    productCount: number;
    createdAt: string;
}

const ManageCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    });
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    useEffect(() => {
        // Mock data loading - would be an API call in a real application
        setTimeout(() => {
            const mockCategories: Category[] = [
                {
                    id: '1',
                    name: 'Electronics',
                    description: 'Electronic devices and accessories',
                    productCount: 45,
                    createdAt: '2023-02-15'
                },
                {
                    id: '2',
                    name: 'Clothing',
                    description: 'Fashion items including shirts, pants, and accessories',
                    productCount: 78,
                    createdAt: '2023-03-10'
                },
                {
                    id: '3',
                    name: 'Home & Kitchen',
                    description: 'Items for home decoration and kitchen appliances',
                    productCount: 32,
                    createdAt: '2023-04-05'
                },
                {
                    id: '4',
                    name: 'Books',
                    description: 'Fiction, non-fiction, and educational books',
                    productCount: 120,
                    createdAt: '2023-05-20'
                },
                {
                    id: '5',
                    name: 'Sports',
                    description: 'Sports equipment and activewear',
                    productCount: 28,
                    createdAt: '2023-06-14'
                }
            ];

            setCategories(mockCategories);
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would be an API call
        const newCategoryWithId: Category = {
            id: Date.now().toString(),
            name: newCategory.name,
            description: newCategory.description,
            productCount: 0,
            createdAt: new Date().toISOString().split('T')[0]
        };

        setCategories([...categories, newCategoryWithId]);
        setNewCategory({ name: '', description: '' });
        setShowAddForm(false);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
    };

    const handleUpdateCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        // In a real app, this would be an API call
        const updatedCategories = categories.map(cat =>
            cat.id === editingCategory.id ? editingCategory : cat
        );

        setCategories(updatedCategories);
        setEditingCategory(null);
    };

    const handleDeleteCategory = (id: string) => {
        // In a real app, this would be an API call
        if (window.confirm('Are you sure you want to delete this category?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (editingCategory) {
            setEditingCategory({
                ...editingCategory,
                [name]: value
            });
        } else {
            setNewCategory({
                ...newCategory,
                [name]: value
            });
        }
    };

    if (isLoading) {
        return <div className="loading">Loading categories...</div>;
    }

    return (
        <div className="manage-categories-container">
            <div className="header-section">
                <h1>Manage Product Categories</h1>
                <button
                    className="btn-primary"
                    onClick={() => setShowAddForm(!showAddForm)}
                >
                    {showAddForm ? 'Cancel' : 'Add New Category'}
                </button>
            </div>

            {showAddForm && (
                <div className="form-container">
                    <h2>Add New Category</h2>
                    <form onSubmit={handleAddCategory}>
                        <div className="form-group">
                            <label htmlFor="name">Category Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newCategory.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newCategory.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Add Category</button>
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

            {editingCategory && (
                <div className="form-container">
                    <h2>Edit Category</h2>
                    <form onSubmit={handleUpdateCategory}>
                        <div className="form-group">
                            <label htmlFor="edit-name">Category Name</label>
                            <input
                                type="text"
                                id="edit-name"
                                name="name"
                                value={editingCategory.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edit-description">Description</label>
                            <textarea
                                id="edit-description"
                                name="description"
                                value={editingCategory.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-primary">Update Category</button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={() => setEditingCategory(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="categories-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Products</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.productCount}</td>
                                <td>{category.createdAt}</td>
                                <td className="actions-cell">
                                    <button
                                        className="btn-secondary btn-sm"
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn-danger btn-sm"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCategories;
