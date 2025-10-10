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

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setMessage(null);

    // REAL IMPLEMENTATION for handling various payment methods:
    // The `confirmPayment` call below works for all payment methods supported
    // by the Payment Element, including credit cards, Google Pay, and Apple Pay.
    // Stripe handles the specific flow for each method automatically.
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // The `return_url` is where the user will be redirected after completing the payment.
        // Stripe will append payment intent details to this URL, which you can use on the
        // success page to display order details.
        // We use the HashRouter syntax `/#/` for the path.
        return_url: `${window.location.origin}/#/order-success`,
      },
    });

    // This point will only be reached if there is an immediate error during confirmation.
    // Otherwise, the user is redirected to the `return_url`. For example, if they
    // close the payment popup from their bank or the card is declined.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("An unexpected error occurred.");
    }

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