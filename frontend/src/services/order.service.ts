import api from './api';

export const orderService = {
    /**
     * Get all orders or user orders with filtering and pagination
     * @param {Object} params - Query parameters
     */
    getOrders: async (params = {}) => {
        const response = await api.get('/orders', { params });
        return response.data;
    },

    /**
     * Get order by ID
     * @param {string} id - Order ID
     */
    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    /**
     * Create a new order
     * @param {Object} orderData - Order data
     */
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    /**
     * Update order status (admin/staff only)
     * @param {string} id - Order ID
     * @param {Object} statusData - Status data (status, trackingNumber, notes)
     */
    updateOrderStatus: async (id, statusData) => {
        const response = await api.put(`/orders/${id}/status`, statusData);
        return response.data;
    },

    /**
     * Update payment status (admin only)
     * @param {string} id - Order ID
     * @param {string} paymentStatus - New payment status
     */
    updatePaymentStatus: async (id, paymentStatus) => {
        const response = await api.put(`/orders/${id}/payment`, { paymentStatus });
        return response.data;
    },

    /**
     * Get order statistics for current user
     */
    getUserOrderStats: async () => {
        const response = await api.get('/orders/user/stats');
        return response.data;
    }
};
