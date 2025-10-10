import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        if (isAdded) return;
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000); // Revert button state after 2 seconds
    };

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
            <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-blue">{product.name}</h3>
                <p className="text-brand-gold font-semibold text-lg mb-3">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                <button
                    onClick={handleAddToCart}
                    disabled={isAdded}
                    className={`mt-auto block text-center w-full font-bold py-2 px-6 rounded-full transition-all duration-300 ${
                        isAdded
                            ? 'bg-green-500 text-white cursor-not-allowed'
                            : 'bg-brand-gold text-brand-blue hover:bg-yellow-400'
                    }`}
                >
                    {isAdded ? 'Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;