import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartToast: React.FC = () => {
    const { lastAddedItem, hideCartToast } = useCart();

    useEffect(() => {
        if (lastAddedItem) {
            const timer = setTimeout(() => {
                hideCartToast();
            }, 5000); // Auto-hide after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [lastAddedItem, hideCartToast]);

    if (!lastAddedItem) {
        return null;
    }

    return (
        <div 
            className="fixed top-24 right-6 w-full max-w-sm bg-white rounded-lg shadow-2xl p-4 z-[60] animate-fade-in-down"
            style={{animationDuration: '500ms'}}
            role="alert"
            aria-live="polite"
        >
            <div className="flex items-start gap-4">
                {/* Product Image */}
                <img 
                    src={lastAddedItem.imageUrl} 
                    alt={lastAddedItem.name} 
                    className="w-16 h-16 object-cover rounded-md"
                />

                {/* Content */}
                <div className="flex-grow">
                    <p className="font-bold text-brand-blue">Successfully added to cart!</p>
                    <p className="text-sm text-gray-700">{lastAddedItem.name}</p>
                    <p className="text-sm font-semibold text-gray-800">${lastAddedItem.price.toFixed(2)}</p>
                    <Link 
                        to="/cart" 
                        onClick={hideCartToast}
                        className="mt-2 inline-block bg-brand-gold text-brand-blue font-bold py-1 px-4 rounded-full text-sm hover:bg-yellow-400 transition-colors duration-300"
                    >
                        View Cart
                    </Link>
                </div>

                {/* Close Button */}
                <button 
                    onClick={hideCartToast} 
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-blue"
                    aria-label="Close notification"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CartToast;