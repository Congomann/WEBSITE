import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCart } from '../contexts/CartContext';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import LoadingSpinner from '../components/LoadingSpinner';

// IMPORTANT: Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51PcbO7RsgfplLnehtjRGeE4YadTYHloObTd2MbF2F3g5yA1rKf43zW8WpG45jXg0mq1b0eDgRo8B3j2XnEUp2G9K00d23VWl1J');


const OrderSuccessPage: React.FC = () => {
    const { clearCart } = useCart();
    const location = useLocation();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const clientSecret = new URLSearchParams(location.search).get(
            'payment_intent_client_secret'
        );

        if (!clientSecret) {
            setStatus('error');
            setMessage('Could not verify payment status. Please check your account for order details.');
            return;
        }

        const verifyPayment = async (stripe: Stripe | null) => {
            if (!stripe) {
                setStatus('error');
                setMessage('Stripe could not be loaded.');
                return;
            }
            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

            switch (paymentIntent?.status) {
                case 'succeeded':
                    setStatus('success');
                    setMessage('Your payment was successful!');
                    clearCart(); // Clear the cart only on successful payment verification
                    break;
                case 'processing':
                    setStatus('success'); // Still show success, but with a different message
                    setMessage('Your payment is processing. We will notify you when it is completed.');
                    clearCart();
                    break;
                default:
                    setStatus('error');
                    setMessage('Payment failed. Please try again or contact support.');
                    break;
            }
        };

        stripePromise.then(verifyPayment);

    }, [location.search, clearCart]);


    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                     <div className="flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center h-24 w-full">
                           <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-brand-blue"></div>
                        </div>
                        <p className="mt-4 text-lg text-gray-700">Verifying your payment...</p>
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
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;