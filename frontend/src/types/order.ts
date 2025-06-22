export interface Order {
    _id: string;
    user: {
        _id: string;
        username: string;
        email: string;
    };
    products: OrderProduct[];
    totalAmount: number;
    shippingAddress: ShippingAddress;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    trackingNumber?: string;
    notes?: string;
    shippingFee: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderProduct {
    product: {
        _id: string;
        name: string;
        imageUrl: string;
        price: number;
        description?: string;
    };
    quantity: number;
    price: number;
}

export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'paypal' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface OrdersResponse {
    orders: Order[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

export interface OrderFormData {
    products: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: ShippingAddress;
    paymentMethod: PaymentMethod;
}

export interface OrderStatusUpdate {
    status: OrderStatus;
    trackingNumber?: string;
    notes?: string;
}

export interface OrderStats {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
}
