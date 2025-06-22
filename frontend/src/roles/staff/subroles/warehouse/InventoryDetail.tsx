import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './InventoryDetail.css';

interface ProductInventory {
    id: string;
    sku: string;
    name: string;
    description: string;
    category: string;
    price: number;
    costPrice: number;
    currentStock: number;
    minStockLevel: number;
    maxStockLevel: number;
    location: string;
    supplier: string;
    imageUrl: string;
    lastRestocked: string;
    status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const InventoryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductInventory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [stockHistory, setStockHistory] = useState<Array<{ date: string, quantity: number, type: string }>>([]);

    useEffect(() => {
        // Simulate fetching product inventory data
        const fetchProductInventory = async () => {
            setLoading(true);
            try {
                // Mock data for demonstration
                setTimeout(() => {
                    const mockProduct: ProductInventory = {
                        id: id || '1',
                        sku: 'SKU-' + (id || '1000'),
                        name: 'Wireless Headphones',
                        description: 'High-quality wireless headphones with noise cancellation',
                        category: 'Electronics',
                        price: 79.99,
                        costPrice: 45.50,
                        currentStock: 25,
                        minStockLevel: 10,
                        maxStockLevel: 100,
                        location: 'Warehouse A, Shelf B4',
                        supplier: 'TechSupplies Inc.',
                        imageUrl: 'https://via.placeholder.com/300',
                        lastRestocked: '2023-11-01T08:30:00Z',
                        status: 'in-stock'
                    };

                    const mockHistory = [
                        { date: '2023-11-01T08:30:00Z', quantity: 50, type: 'restock' },
                        { date: '2023-11-05T14:20:00Z', quantity: -5, type: 'order' },
                        { date: '2023-11-10T11:45:00Z', quantity: -10, type: 'order' },
                        { date: '2023-11-15T09:10:00Z', quantity: -8, type: 'order' },
                        { date: '2023-11-18T16:30:00Z', quantity: -2, type: 'damage' }
                    ];

                    setProduct(mockProduct);
                    setStockHistory(mockHistory);
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching product inventory:', error);
                setLoading(false);
            }
        };

        if (id) {
            fetchProductInventory();
        }
    }, [id]);

    // Function to format date
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Function to get stock status class
    const getStockStatusClass = (status: string): string => {
        switch (status) {
            case 'in-stock': return 'status-in-stock';
            case 'low-stock': return 'status-low-stock';
            case 'out-of-stock': return 'status-out-of-stock';
            default: return '';
        }
    };

    // Function to get transaction type class
    const getTransactionTypeClass = (type: string): string => {
        switch (type) {
            case 'restock': return 'transaction-restock';
            case 'order': return 'transaction-order';
            case 'damage': return 'transaction-damage';
            case 'return': return 'transaction-return';
            default: return '';
        }
    };

    const handleUpdateStock = () => {
        navigate(`/staff/warehouse/inventory/${id}/update`);
    };

    if (loading) {
        return <div className="inventory-loading">Loading product inventory...</div>;
    }

    if (!product) {
        return (
            <div className="inventory-error">
                <h2>Product Not Found</h2>
                <p>The product inventory you're looking for could not be found.</p>
                <Link to="/staff/warehouse/inventory" className="back-link">Back to Inventory</Link>
            </div>
        );
    }

    return (
        <div className="inventory-detail-container">
            <div className="inventory-detail-header">
                <div>
                    <h1>{product.name}</h1>
                    <p className="product-sku">SKU: {product.sku}</p>
                </div>
                <Link to="/staff/warehouse/inventory" className="back-link">Back to Inventory</Link>
            </div>

            <div className="inventory-detail-grid">
                <div className="product-info-section">
                    <div className="product-image">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>

                    <div className="product-details">
                        <div className="detail-group">
                            <h3>Product Details</h3>
                            <div className="detail-row">
                                <span className="detail-label">Description:</span>
                                <span className="detail-value">{product.description}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Category:</span>
                                <span className="detail-value">{product.category}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Retail Price:</span>
                                <span className="detail-value">${product.price.toFixed(2)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Cost Price:</span>
                                <span className="detail-value">${product.costPrice.toFixed(2)}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Profit Margin:</span>
                                <span className="detail-value">
                                    {((product.price - product.costPrice) / product.price * 100).toFixed(2)}%
                                </span>
                            </div>
                        </div>

                        <div className="detail-group">
                            <h3>Supplier Information</h3>
                            <div className="detail-row">
                                <span className="detail-label">Supplier:</span>
                                <span className="detail-value">{product.supplier}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inventory-status-section">
                    <div className="stock-status-card">
                        <div className="stock-status-header">
                            <h3>Current Stock Status</h3>
                            <div className={`status-badge ${getStockStatusClass(product.status)}`}>
                                {product.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </div>
                        </div>

                        <div className="stock-details">
                            <div className="stock-detail-row">
                                <span className="stock-label">Current Stock:</span>
                                <span className="stock-value">{product.currentStock} units</span>
                            </div>
                            <div className="stock-detail-row">
                                <span className="stock-label">Min Stock Level:</span>
                                <span className="stock-value">{product.minStockLevel} units</span>
                            </div>
                            <div className="stock-detail-row">
                                <span className="stock-label">Max Stock Level:</span>
                                <span className="stock-value">{product.maxStockLevel} units</span>
                            </div>
                            <div className="stock-detail-row">
                                <span className="stock-label">Location:</span>
                                <span className="stock-value">{product.location}</span>
                            </div>
                            <div className="stock-detail-row">
                                <span className="stock-label">Last Restocked:</span>
                                <span className="stock-value">{formatDate(product.lastRestocked)}</span>
                            </div>
                        </div>

                        <div className="stock-actions">
                            <button
                                className="update-stock-btn"
                                onClick={handleUpdateStock}
                            >
                                Update Stock
                            </button>
                            <button className="order-stock-btn">
                                Order More
                            </button>
                        </div>
                    </div>

                    <div className="stock-history-card">
                        <h3>Stock History</h3>
                        <div className="stock-history-list">
                            {stockHistory.map((transaction, index) => (
                                <div key={index} className="stock-transaction">
                                    <div className="transaction-date">
                                        {formatDate(transaction.date)}
                                    </div>
                                    <div className={`transaction-type ${getTransactionTypeClass(transaction.type)}`}>
                                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                    </div>
                                    <div className="transaction-quantity">
                                        {transaction.quantity > 0 ? '+' : ''}{transaction.quantity} units
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryDetail;
