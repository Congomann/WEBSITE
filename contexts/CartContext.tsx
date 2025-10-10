import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateItemQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    totalPrice: number;
    lastAddedItem: Product | null;
    hideCartToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse cart data from localStorage", error);
            return [];
        }
    });

    const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem('nhf-cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Could not save cart data to localStorage", error);
        }
    }, [cartItems]);

    const addToCart = useCallback((product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setLastAddedItem(product);
    }, []);

    const removeFromCart = useCallback((productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    const updateItemQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    const hideCartToast = useCallback(() => {
        setLastAddedItem(null);
    }, []);

    const value = useMemo(() => {
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        
        return {
            cartItems,
            addToCart,
            removeFromCart,
            updateItemQuantity,
            clearCart,
            cartCount,
            totalPrice,
            lastAddedItem,
            hideCartToast
        };
    }, [cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart, lastAddedItem, hideCartToast]);


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};