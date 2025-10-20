import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import SEO from '../components/SEO';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateItemQuantity, totalPrice } = useCart();
    const location = useLocation();
    const [showCanceledMessage, setShowCanceledMessage] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        if (query.get('canceled')) {
            setShowCanceledMessage(true);
            // Clean the URL so the message doesn't reappear on refresh
            const url = new URL(window.location.href);
            url.searchParams.delete('canceled');
            window.history.replaceState({}, '', url.toString());
        }
    }, [location.search]);


    const handleQuantityChange = (productId: number, newQuantity: string) => {
        const quantity = parseInt(newQuantity, 10);
        if (!isNaN(quantity)) {
            updateItemQuantity(productId, quantity);
        }
    };
    
    return (
        <div className="bg-white py-20">
            <SEO
                title="Shopping Cart"
                description="Review and manage items in your shopping cart."
            />
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-brand-blue mb-8 text-center">Your Shopping Cart</h1>
                
                {showCanceledMessage && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-8" role="alert">
                        <p className="font-bold">Checkout Canceled</p>
                        <p>You have canceled the checkout process. Your cart has been saved.</p>
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
                        <Link
                            to="/products"
                            className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="space-y-6">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center bg-brand-light p-4 rounded-lg shadow-md gap-4">
                                        <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <h2 className="text-lg font-bold text-brand-blue">{item.name}</h2>
                                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200">-</button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    className="w-12 text-center border-l border-r bg-white"
                                                    min="1"
                                                />
                                                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200">+</button>
                                            </div>
                                            <p className="font-bold text-brand-blue w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700" aria-label={`Remove ${item.name}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-brand-light p-6 rounded-lg shadow-lg sticky top-28">
                                <h2 className="text-2xl font-bold text-brand-blue border-b pb-4 mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2 text-gray-700">
                                    <span>Subtotal</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-4 text-gray-700">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <div className="flex justify-between font-bold text-xl text-brand-blue border-t pt-4 mt-4">
                                    <span>Total</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="mt-6 block text-center w-full bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                                >
                                    Proceed to Checkout
                                </Link>
                                <Link to="/products" className="block text-center mt-4 text-brand-blue hover:underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;