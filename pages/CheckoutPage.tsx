import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Initialize Stripe outside of the component to avoid re-creating on every render.
// IMPORTANT: Replace with your actual publishable key.
const stripePromise = loadStripe('pk_test_51SGWYuAyRjRzCXotsvyRyai6mVYPtGzjlq33ymq8eYy82r0mPboUElzZkpg70CROuX2OCyM1XuueFpO7g0hdIBza00GmXmDpo4');

const CheckoutPage: React.FC = () => {
    const { cartItems, totalPrice } = useCart();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cartItems.length > 0) {
            // In a real app, this would fetch from a backend.
            // For this static demo, we'll simulate the client secret being ready
            // to allow the Stripe Elements form to render.
            // The actual payment submission is simulated in CheckoutForm.tsx.
            setClientSecret('pi_dummy_secret_for_ui');
        }
    }, [cartItems]);

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-brand-blue">Your cart is empty.</h1>
                <p className="text-gray-600 mt-2 mb-6">You can't proceed to checkout without any items.</p>
                <Link to="/products" className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400">
                    Go Shopping
                </Link>
            </div>
        );
    }
    
    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#0D2C54', // brand-blue
            colorBackground: '#ffffff',
            colorText: '#333333',
            colorDanger: '#df1b41',
            fontFamily: 'Ideal Sans, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '4px',
        },
    };
    
    const options = {
        clientSecret: clientSecret || '',
        appearance,
    };

    return (
        <div className="bg-white py-20">
            <SEO 
                title="Secure Checkout" 
                description="Complete your purchase securely with New Holland Financial Group." 
                noIndex={true} 
            />
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-brand-blue mb-8 text-center">Checkout</h1>
                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Payment Details */}
                    <div className="lg:col-span-3 bg-brand-light p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-brand-blue mb-6">Payment Details</h2>
                        {error && <div className="text-center text-red-600 bg-red-50 p-3 rounded-md mb-4">{error}</div>}
                        
                        {clientSecret ? (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                        ) : (
                             <div className="flex flex-col items-center justify-center h-48">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
                                <p className="mt-4 text-gray-600">Initializing secure payment...</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                        <div className="bg-brand-light p-6 rounded-lg shadow-lg sticky top-28">
                             <h2 className="text-2xl font-bold text-brand-blue border-b pb-4 mb-4">Order Summary</h2>
                             <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-800">{item.name} x{item.quantity}</span>
                                        <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                             </div>
                             <div className="flex justify-between font-bold text-xl text-brand-blue border-t pt-4 mt-4">
                                <span>Total</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;