import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import LoadingSpinner from '../components/LoadingSpinner';

// IMPORTANT: Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51PcbO7RsgfplLnehtjRGeE4YadTYHloObTd2MbF2F3g5yA1rKf43zW8WpG45jXg0mq1b0eDgRo8B3j2XnEUp2G9K00d23VWl1J');

const CheckoutPage: React.FC = () => {
    const { cartItems, totalPrice } = useCart();
    const [clientSecret, setClientSecret] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Create a PaymentIntent as soon as the page loads
        const createPaymentIntent = async () => {
            if (totalPrice <= 0) {
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // The amount should be in the smallest currency unit (e.g., cents)
                    body: JSON.stringify({ amount: Math.round(totalPrice * 100) }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to create payment intent.');
                }
                
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (err: any) {
                setError(err.message);
                console.error("Error creating Payment Intent:", err);
            } finally {
                setIsLoading(false);
            }
        };

        createPaymentIntent();
    }, [totalPrice]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: 'stripe',
             variables: {
                colorPrimary: '#0D2C54',
                colorBackground: '#ffffff',
                colorText: '#30313d',
                colorDanger: '#df1b41',
                fontFamily: 'Ideal Sans, system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '4px',
            },
        },
    };

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

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-48">
                    <LoadingSpinner />
                </div>
            );
        }
        if (error) {
            return (
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-md">
                    <p className="font-bold">Could not load payment form</p>
                    <p>{error}</p>
                </div>
            );
        }
        if (clientSecret) {
            return (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            );
        }
        return null;
    };

    return (
        <div className="bg-white py-20">
            <SEO title="Checkout" description="Complete your purchase securely." />
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-brand-blue mb-8 text-center">Checkout</h1>
                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Payment Details */}
                    <div className="lg:col-span-3 bg-brand-light p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-brand-blue mb-2">Payment Information</h2>
                        <p className="text-gray-600 mb-6">
                            Securely pay with your preferred method. Options like Google Pay or Apple Pay will appear if available on your device.
                        </p>
                        {renderContent()}
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