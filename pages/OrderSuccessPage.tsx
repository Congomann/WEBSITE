import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const OrderSuccessPage: React.FC = () => {
    return (
        <div className="bg-white py-20">
            <SEO title="Order Successful" description="Thank you for your purchase." noIndex={true} />
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-md mx-auto">
                    <svg className="w-24 h-24 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h1 className="text-4xl font-extrabold text-brand-blue mb-4">Thank You!</h1>
                    <p className="text-lg text-gray-700 mb-8">
                        Your order has been placed successfully. A confirmation has been sent to your email (simulation).
                    </p>
                    <Link
                        to="/products"
                        className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;