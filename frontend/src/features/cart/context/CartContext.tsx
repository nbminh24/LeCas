import React, { createContext, useState, useEffect } from 'react';
import type { Product } from '../../types/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
}

interface CartProviderProps {
    children: React.ReactNode;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart from localStorage:', error);
                localStorage.removeItem('cart');
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity: number) => {
        setItems(prevItems => {
            // Check if product already exists in cart
            const existingItemIndex = prevItems.findIndex(
                item => item.product._id === product._id
            );

            if (existingItemIndex !== -1) {
                // Update quantity if product already in cart
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // Add new item to cart
                return [...prevItems, { product, quantity }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prevItems =>
            prevItems.filter(item => item.product._id !== productId)
        );
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.product._id === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('cart');
    };

    const getCartTotal = () => {
        return items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
    };

    const getItemCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getItemCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
