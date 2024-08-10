import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentIntent } = await stripe.createPayment({
      payment_method: {
        card: elements.getElement(CardElement),
      },
      confirmation_method: 'manual',
      confirm: true,
    });

    if (error) {
      setError(error.message);
    } else if (paymentIntent.status === 'requires_action') {
      // Handle additional authentication here (3D Secure)
      const { error: confirmationError } = await stripe.confirmCardPayment(
        paymentIntent.client_secret
      );
      if (confirmationError) {
        setError(confirmationError.message);
      } else {
        setSuccess(true);
      }
    } else {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
