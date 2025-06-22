import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

const ProductCreate: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        sizes: [] as string[],
        colors: [] as string[],
    });

    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const availableColors = ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Gray', 'Navy', 'Purple', 'Brown'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSizeToggle = (size: string) => {
        setFormData({
            ...formData,
            sizes: formData.sizes.includes(size)
                ? formData.sizes.filter(s => s !== size)
                : [...formData.sizes, size]
        });
    };

    const handleColorToggle = (color: string) => {
        setFormData({
            ...formData,
            colors: formData.colors.includes(color)
                ? formData.colors.filter(c => c !== color)
                : [...formData.colors, color]
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileArray = Array.from(e.target.files);
            setImages([...images, ...fileArray]);

            // Create preview URLs
            const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
            setPreviewUrls([...previewUrls, ...newPreviewUrls]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviewUrls = [...previewUrls];
        URL.revokeObjectURL(newPreviewUrls[index]);
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Submitting product data:', {
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                images
            });

            setSubmitting(false);
            navigate('/admin/products');
        }, 1000);
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>Create New Product</h1>
                <Link to="/admin/products" className="btn-secondary">Cancel</Link>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-section">
                    <h2>Basic Information</h2>

                    <div className="form-group">
                        <label htmlFor="name">Product Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description*</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Enter product description"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="price">Price (USD)*</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0.01"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category*</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Pants">Pants</option>
                                <option value="Outerwear">Outerwear</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock">Stock Quantity*</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                required
                                min="0"
                                step="1"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Product Variants</h2>

                    <div className="form-group">
                        <label>Available Sizes*</label>
                        <div className="option-buttons">
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`option-btn ${formData.sizes.includes(size) ? 'selected' : ''}`}
                                    onClick={() => handleSizeToggle(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Available Colors*</label>
                        <div className="option-buttons">
                            {availableColors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`option-btn ${formData.colors.includes(color) ? 'selected' : ''}`}
                                    onClick={() => handleColorToggle(color)}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <h2>Product Images</h2>

                    <div className="form-group">
                        <label htmlFor="images">Upload Images*</label>
                        <input
                            type="file"
                            id="images"
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                            className="file-input"
                        />
                        <div className="file-input-help">
                            You can upload multiple images. First image will be used as the main product image.
                        </div>
                    </div>

                    {previewUrls.length > 0 && (
                        <div className="image-previews">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="image-preview-item">
                                    <img src={url} alt={`Preview ${index + 1}`} />
                                    <button
                                        type="button"
                                        className="remove-img-btn"
                                        onClick={() => removeImage(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-primary submit-btn"
                        disabled={submitting}
                    >
                        {submitting ? 'Creating Product...' : 'Create Product'}
                    </button>
                    <Link to="/admin/products" className="btn-secondary">Cancel</Link>
                </div>
            </form>
        </div>
    );
};

export default ProductCreate;
