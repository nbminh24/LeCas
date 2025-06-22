import api from './api';

export const productService = {
    /**
     * Get all products with filtering and pagination
     * @param {Object} params - Query parameters
     */
    getProducts: async (params = {}) => {
        const response = await api.get('/products', { params });
        return response.data;
    },

    /**
     * Get product by ID
     * @param {string} id - Product ID
     */
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    /**
     * Create a new product (admin only)
     * @param {Object} productData - Product data
     */
    createProduct: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    /**
     * Update a product (admin only)
     * @param {string} id - Product ID
     * @param {Object} productData - Updated product data
     */
    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    /**
     * Delete a product (admin only)
     * @param {string} id - Product ID
     */
    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    /**
     * Add a rating to a product
     * @param {string} id - Product ID
     * @param {Object} ratingData - Rating data (rating, review)
     */
    addRating: async (id, ratingData) => {
        const response = await api.post(`/products/${id}/ratings`, ratingData);
        return response.data;
    },

    /**
     * Update product stock (admin/warehouse staff only)
     * @param {string} id - Product ID
     * @param {number} stock - New stock value
     */
    updateStock: async (id, stock) => {
        const response = await api.put(`/products/${id}/stock`, { stock });
        return response.data;
    }
};
