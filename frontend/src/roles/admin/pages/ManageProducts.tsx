import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
}

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([
        { id: '1', name: 'Basic T-Shirt', price: 19.99, category: 'Shirts', stock: 100 },
        { id: '2', name: 'Slim Fit Jeans', price: 39.99, category: 'Pants', stock: 75 },
        { id: '3', name: 'Casual Jacket', price: 59.99, category: 'Outerwear', stock: 50 },
        { id: '4', name: 'Running Shoes', price: 89.99, category: 'Footwear', stock: 60 },
        { id: '5', name: 'Baseball Cap', price: 14.99, category: 'Accessories', stock: 120 },
    ]);

    const handleDelete = (id: string) => {
        // In a real app, you would call an API to delete the product
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Manage Products</h1>
                <Link to="/admin/products/create" className="btn-primary">Add New Product</Link>
            </div>

            <div className="filter-section">
                <input type="text" placeholder="Search products..." className="search-input" />
                <select className="filter-select">
                    <option value="">All Categories</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>

            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>{product.stock}</td>
                                <td className="actions">
                                    <Link to={`/admin/products/${product.id}`} className="btn-view">View</Link>
                                    <Link to={`/admin/products/edit/${product.id}`} className="btn-edit">Edit</Link>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                <button disabled className="page-btn">Previous</button>
                <span className="page-indicator">Page 1 of 3</span>
                <button className="page-btn">Next</button>
            </div>
        </div>
    );
};

export default ManageProducts;
