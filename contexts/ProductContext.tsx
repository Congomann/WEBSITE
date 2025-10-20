import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { Product } from '../types';
import { products as initialProducts } from '../data';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    deleteProduct: (productId: number) => void;
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
    const [products, setProducts] = useState<Product[]>(() => {
        try {
            const localData = localStorage.getItem('nhf-products');
            // If there's data in localStorage, use it. Otherwise, seed with initial data.
            return localData ? JSON.parse(localData) : initialProducts;
        } catch (error) {
            console.error("Could not parse products data from localStorage", error);
            return initialProducts;
        }
    });

    useEffect(() => {
        localStorage.setItem('nhf-products', JSON.stringify(products));
    }, [products]);

    const addProduct = useCallback((product: Omit<Product, 'id'>) => {
        setProducts(prevProducts => {
            const newProduct = {
                ...product,
                id: Date.now(), // Simple unique ID generation
            };
            return [...prevProducts, newProduct];
        });
    }, []);

    const deleteProduct = useCallback((productId: number) => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    }, []);
    
    const value = useMemo(() => ({
        products,
        addProduct,
        deleteProduct
    }), [products, addProduct, deleteProduct]);

    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};