export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    sku: string;
    isActive: boolean;
    ratings: ProductRating[];
    averageRating: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProductRating {
    userId: string;
    rating: number;
    review?: string;
    createdAt: string;
}

export interface ProductsResponse {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
    stock: number;
    sku: string;
    isActive?: boolean;
}

export interface RatingFormData {
    rating: number;
    review?: string;
}
