import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCart } from '../contexts/CartContext';

const OrderSuccessPage: React.FC = () => {
    const { clearCart } = useCart();
    const location = useLocation();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const redirectStatus = query.get('redirect_status');

        if (redirectStatus === 'succeeded') {
            setStatus('success');
            setMessage('Your payment was successful!');
            clearCart();
        } else if (redirectStatus === 'failed') {
            setStatus('error');
            const paymentIntentError = query.get('payment_intent_error_message');
            setMessage(paymentIntentError || 'Your payment failed. Please try again or contact support.');
        } else {
             setStatus('loading');
             setMessage('Verifying your payment status...');
             // A fallback or a more sophisticated check could be implemented here
             // but for this flow, redirect_status is the primary indicator.
             // If we arrive here without a status, something is wrong.
             setTimeout(() => {
                setStatus('error');
                setMessage('Could not determine payment status. Please check your account for order details.');
             }, 3000);
        }
    }, [location.search, clearCart]);


    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                     <div className="flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center h-24 w-full">
                           <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-brand-blue"></div>
                        </div>
                        <p className="mt-4 text-lg text-gray-700">{message}</p>
                    </div>
                );
            case 'success':
                return (
                    <>
                        <svg className="w-24 h-24 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-4xl font-extrabold text-brand-blue mb-4">Thank You!</h1>
                        <p className="text-lg text-gray-700 mb-8">
                           {message} A confirmation has been sent to your email (simulation).
                        </p>
                    </>
                );
            case 'error':
                 return (
                    <>
                        <svg className="w-24 h-24 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="text-4xl font-extrabold text-brand-blue mb-4">Payment Error</h1>
                        <p className="text-lg text-gray-700 mb-8">
                           {message}
                        </p>
                    </>
                );
        }
    }

    return (
        <div className="bg-white py-20">
            <SEO title="Order Confirmation" description="Thank you for your purchase." noIndex={true} />
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-md mx-auto">
                    {renderContent()}
                    <Link
                        to="/products"
                        className="inline-block mt-4 bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg"
                    >
                        {status === 'success' ? 'Continue Shopping' : 'Try Again'}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;