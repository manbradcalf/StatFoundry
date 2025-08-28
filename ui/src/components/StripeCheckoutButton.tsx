import React, { useState } from 'react';
import { getStripeUrls } from '../config/stripe';
import { useAuth } from '../contexts/AuthContext';
import { config } from '../config';

interface StripeCheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const StripeCheckoutButton: React.FC<StripeCheckoutButtonProps> = ({
  className = '',
  children = 'Upgrade to Pro',
  disabled = false,
  onError,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      onError?.('Please sign in to upgrade to Pro');
      return;
    }


    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch(`${config.serviceUrl}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: user.email,
          user_id: user.uid,
          success_url: getStripeUrls().success,
          cancel_url: getStripeUrls().cancel,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create checkout session');
      }

      const { checkout_url } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = checkout_url;
      onSuccess?.();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      onError?.(errorMessage);
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading || !user}
      className={`stripe-checkout-button ${className} ${loading ? 'loading' : ''}`}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default StripeCheckoutButton;