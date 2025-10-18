import React, { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useCart } from '../contexts/CartContext';

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { totalPrice } = useCart();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate a successful payment processing for the demo
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Redirect to success page manually since we are not using stripe.confirmPayment
    // This makes the checkout flow complete without a backend.
    window.location.href = `${window.location.origin}/#/order-success?redirect_status=succeeded`;

    // The code below would be used in a real implementation with a backend.
    /*
    if (!stripe || !elements) {
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/#/order-success`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }
    */

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="mt-6 w-full bg-brand-gold text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-yellow-400 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span id="button-text">
          {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-blue mx-auto"></div> : `Pay $${totalPrice.toFixed(2)}`}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="mt-4 text-center text-red-600 bg-red-50 p-3 rounded-md">{message}</div>}
    </form>
  );
}

export default CheckoutForm;