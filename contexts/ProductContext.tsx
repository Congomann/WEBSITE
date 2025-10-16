
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Product } from '../types';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id' | 'price'> & { price: number }) => Promise<void>;
    deleteProduct: (productId: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/products');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = useCallback(async (product: Omit<Product, 'id' | 'price'> & { price: number }) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            if (!response.ok) throw new Error('Failed to add product');
            const newProduct = await response.json();
            setProducts(prev => [...prev, newProduct]);
        } catch (err: any) {
            console.error(err);
            // Optionally set an error state to show in the UI
        }
    }, []);

    const deleteProduct = useCallback(async (productId: number) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete product');
            setProducts(prev => prev.filter(p => p.id !== productId));
        } catch (err: any) {
            console.error(err);
        }
    }, []);
    
    const value = useMemo(() => ({
        products,
        addProduct,
        deleteProduct,
        loading,
        error,
    }), [products, addProduct, deleteProduct, loading, error]);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
