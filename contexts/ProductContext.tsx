import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
// FIX: Changed import to be a non-type-only import to resolve usage as a value.
import { Product } from '../types';
import { products as initialProducts } from '../data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id' | 'price'> & { price: number }) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
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

const STORAGE_KEY = 'nhf-products';

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate async fetch
            await new Promise(res => setTimeout(res, 100));
            const storedProducts = localStorage.getItem(STORAGE_KEY);
            if (storedProducts) {
                setProducts(JSON.parse(storedProducts));
            } else {
                setProducts(initialProducts);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
            }
        } catch (err: any) {
            setError('Failed to load products from storage.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = useCallback(async (product: Omit<Product, 'id' | 'price'> & { price: number }) => {
        try {
            const newProduct = { 
                ...product, 
                id: Date.now() // Simple unique ID for demo
            };
            setProducts(prev => {
                const newProducts = [...prev, newProduct];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
                return newProducts;
            });
        } catch (err: any) {
            console.error(err);
            setError('Failed to add product.');
        }
    }, []);
    
    const updateProduct = useCallback(async (product: Product) => {
        try {
            setProducts(prev => {
                const newProducts = prev.map(p => (p.id === product.id ? product : p));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
                return newProducts;
            });
        } catch (err: any) {
            console.error("Error updating product:", err);
            setError('Failed to update product.');
        }
    }, []);

    const deleteProduct = useCallback(async (productId: number) => {
        try {
            setProducts(prev => {
                const newProducts = prev.filter(p => p.id !== productId);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
                return newProducts;
            });
        } catch (err: any) {
            console.error(err);
            setError('Failed to delete product.');
        }
    }, []);
    
    const value = useMemo(() => ({
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        loading,
        error,
    }), [products, addProduct, updateProduct, deleteProduct, loading, error]);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
