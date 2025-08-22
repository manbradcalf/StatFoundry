import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn('Stripe publishable key not found. Set REACT_APP_STRIPE_PUBLISHABLE_KEY in your environment.');
}

// Initialize Stripe
export const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

// Stripe configuration
export const stripeConfig = {
  publicKey: stripePublishableKey,
  isConfigured: !!stripePublishableKey,
};

// Helper function to get base URL for success/cancel redirects
export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_BASE_URL || 'https://statfoundry.com';
  }
  return 'http://localhost:3000';
};

export const getStripeUrls = () => {
  const baseUrl = getBaseUrl();
  return {
    success: `${baseUrl}/payment/success`,
    cancel: `${baseUrl}/payment/cancel`,
    customerPortal: `${baseUrl}/account`,
  };
};