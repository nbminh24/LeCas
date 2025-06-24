export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    STAFF_WAREHOUSE = 'staff_warehouse',
    STAFF_SHIPPING = 'staff_shipping',
    STAFF_ORDER = 'staff_order',
    USER = 'user'
}

export const ROUTES = {
    // Auth routes
    LOGIN: '/login',
    REGISTER: '/register',
    AUTH_SUCCESS: '/auth/success',
    AUTH_FAILED: '/auth/failed',

    // Admin routes
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        PRODUCTS: '/admin/products',
        PRODUCT_DETAIL: '/admin/products/:id',
        PRODUCT_CREATE: '/admin/products/create',
        PRODUCT_EDIT: '/admin/products/edit/:id',
        USERS: '/admin/users',
        USER_DETAIL: '/admin/users/:id',
        ORDERS: '/admin/orders',
        ORDER_DETAIL: '/admin/orders/:id',
        CATEGORIES: '/admin/categories',
        STAFF_MANAGEMENT: '/admin/staff',
        REPORTS: '/admin/reports',
        FEEDBACK: '/admin/feedback',
    },

    // Staff routes
    STAFF: {
        DASHBOARD: '/staff/dashboard',
        ORDERS: '/staff/orders/pending',
        ORDER_DETAIL: '/staff/orders/:id',
        SEARCH_ORDERS: '/staff/search',

        // Warehouse staff
        WAREHOUSE: {
            INVENTORY: '/staff/warehouse/inventory',
            INVENTORY_DETAIL: '/staff/warehouse/inventory/:id',
            UPDATE_STOCK: '/staff/warehouse/update-stock/:id',
        },

        // Shipping staff
        SHIPPING: {
            SHIPMENTS: '/staff/shipping/shipments',
            SHIPMENT_DETAIL: '/staff/shipping/shipments/:id',
            UPDATE_SHIPMENT: '/staff/shipping/update/:id',
        },
    },

    // User routes
    USER: {
        HOME: '/',
        PRODUCTS: '/products',
        PRODUCT_CATEGORY: '/products/category/:category',
        PRODUCT_DETAIL: '/products/:id',
        CART: '/cart',
        CHECKOUT: '/checkout',
        ORDERS: '/orders',
        ORDER_DETAIL: '/orders/:id',
        PROFILE: '/profile',
        WISHLIST: '/wishlist',
        REVIEWS: '/reviews',
    }
};
