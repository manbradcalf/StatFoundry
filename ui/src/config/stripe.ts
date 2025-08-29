// Stripe configuration for Checkout flow
// Note: Using Stripe Checkout (server-side), not Stripe Elements (client-side)

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