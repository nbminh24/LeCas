import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateStock.css';

interface ProductInventory {
    id: string;
    sku: string;
    name: string;
    currentStock: number;
    minStockLevel: number;
    maxStockLevel: number;
    imageUrl: string;
}

type TransactionType = 'restock' | 'adjustment' | 'damage' | 'return' | 'transfer';

const UpdateStock: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductInventory | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [transactionType, setTransactionType] = useState<TransactionType>('restock');
    const [quantity, setQuantity] = useState<number>(0);
    const [reason, setReason] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

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
                        currentStock: 25,
                        minStockLevel: 10,
                        maxStockLevel: 100,
                        imageUrl: 'https://via.placeholder.com/150'
                    };

                    setProduct(mockProduct);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        setSubmitting(true);

        try {
            // This would be an API call to update the stock
            // const response = await api.post('/inventory/update', {
            //   productId: product.id,
            //   transactionType,
            //   quantity: transactionType === 'restock' || transactionType === 'return' ? quantity : -quantity,
            //   reason,
            //   location
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success! Navigate back to the inventory detail page
            navigate(`/staff/warehouse/inventory/${id}`);

            // Show success message
            alert('Stock updated successfully!');
        } catch (error) {
            console.error('Error updating stock:', error);
            alert('Failed to update stock. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate(`/staff/warehouse/inventory/${id}`);
    };

    if (loading) {
        return <div className="update-stock-loading">Loading product data...</div>;
    }

    if (!product) {
        return (
            <div className="update-stock-error">
                <h2>Product Not Found</h2>
                <p>The product you're trying to update could not be found.</p>
                <button onClick={() => navigate('/staff/warehouse/inventory')} className="back-button">
                    Back to Inventory
                </button>
            </div>
        );
    }

    return (
        <div className="update-stock-container">
            <h1>Update Stock</h1>

            <div className="product-summary">
                <div className="product-image">
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                    <h2>{product.name}</h2>
                    <p>SKU: {product.sku}</p>
                    <p>Current Stock: <strong>{product.currentStock}</strong> units</p>
                    <p>Min Stock Level: {product.minStockLevel} units</p>
                    <p>Max Stock Level: {product.maxStockLevel} units</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="update-stock-form">
                <div className="form-group">
                    <label htmlFor="transactionType">Transaction Type</label>
                    <select
                        id="transactionType"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value as TransactionType)}
                        required
                    >
                        <option value="restock">Restock (Add Inventory)</option>
                        <option value="adjustment">Adjustment (Remove Inventory)</option>
                        <option value="damage">Damaged/Defective Items</option>
                        <option value="return">Customer Return</option>
                        <option value="transfer">Warehouse Transfer</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        required
                    />
                    <div className="quantity-note">
                        {transactionType === 'restock' || transactionType === 'return'
                            ? 'This will add to the current stock.'
                            : 'This will subtract from the current stock.'}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="reason">Reason/Notes</label>
                    <textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={3}
                        placeholder="Add any additional notes about this transaction"
                    />
                </div>

                {transactionType === 'transfer' && (
                    <div className="form-group">
                        <label htmlFor="location">Transfer Location</label>
                        <select
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required={transactionType === 'transfer'}
                        >
                            <option value="">-- Select Location --</option>
                            <option value="warehouse-b">Warehouse B</option>
                            <option value="warehouse-c">Warehouse C</option>
                            <option value="retail-store-1">Retail Store #1</option>
                            <option value="retail-store-2">Retail Store #2</option>
                        </select>
                    </div>
                )}

                <div className="stock-preview">
                    <div className="preview-row">
                        <span>Current Stock:</span>
                        <span>{product.currentStock} units</span>
                    </div>
                    <div className="preview-row">
                        <span>Change:</span>
                        <span className={transactionType === 'restock' || transactionType === 'return' ? 'positive' : 'negative'}>
                            {transactionType === 'restock' || transactionType === 'return' ? '+' : '-'}{quantity} units
                        </span>
                    </div>
                    <div className="preview-row result">
                        <span>New Stock Level:</span>
                        <span>
                            {transactionType === 'restock' || transactionType === 'return'
                                ? product.currentStock + quantity
                                : product.currentStock - quantity} units
                        </span>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleCancel}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={submitting || quantity <= 0}
                    >
                        {submitting ? 'Updating...' : 'Update Stock'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStock;
