# Stripe Checkout Integration Setup Guide

## Overview

This guide covers the complete Stripe checkout flow integration for StatFoundry Pro subscriptions.

## Prerequisites

1. **Stripe Account**: Sign up at [https://stripe.com](https://stripe.com)
2. **Stripe Dashboard Access**: You mentioned you're already logged into the dashboard

## Step 1: Get Stripe Keys

### From Your Stripe Dashboard

1. Go to **Developers** → **API Keys**
2. Copy your **Publishable key** (starts with `pk_test_` for test mode)
3. Copy your **Secret key** (starts with `sk_test_` for test mode)

### For Webhooks

1. Go to **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. Set endpoint URL to: `http://localhost:8000/api/stripe/webhook` (for development)
4. Select these events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

## Step 2: Create a Subscription Product

### In Stripe Dashboard

1. Go to **Products** → **+ Add product**
2. Name: "StatFoundry Pro"
3. Set pricing model: **Recurring**
4. Price: Set your desired amount (e.g., $9.99/month)
5. Billing period: **Monthly** (or your preference)
6. Copy the **Price ID** (starts with `price_`)

## Step 3: Configure Environment Variables

### Backend (.env file in `/service/`)

Create `/service/.env` based on `.env.example`:

```bash
# Environment Configuration
ENVIRONMENT=development

# Service Configuration
STATFOUNDRY_SERVICE_URL=localhost:3000

# Neo4j Database Configuration (your existing values)
NEO4J_STATFOUNDRY_NFL_AURA_URI_CLONE=your_existing_uri
NEO4J_STATFOUNDRY_NFL_AURA_PASSWORD_CLONE=your_existing_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PRICE_ID_PRO=price_your_subscription_price_id_here
```

### Frontend (.env.local file in `/ui/`)

Create `/ui/.env.local` based on `.env.example`:

```bash
# Stripe Configuration
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Optional: Override service URL (defaults to localhost:8000 in development)
# REACT_APP_SERVICE_URL=http://localhost:8000
```

## Step 4: Test the Integration

### Start the Services

```bash
# Terminal 1: Start backend
cd service
uvicorn src.app:app --reload

# Terminal 2: Start frontend
cd ui
npm start
```

### Testing Flow

1. Visit `http://localhost:3000/account`
2. Sign in with your test account
3. Click "Upgrade to Pro" button
4. Use Stripe test card: `4242 4242 4242 4242`
5. Use any future expiration date and any CVC
6. Complete the checkout process
7. Verify redirect to success page

## Step 5: Webhook Testing

### Using Stripe CLI (Recommended)

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:8000/api/stripe/webhook
```

### Or Use ngrok

```bash
# Install ngrok: https://ngrok.com/
ngrok http 8000
# Update webhook endpoint in Stripe dashboard to: https://your-ngrok-url.ngrok.io/api/stripe/webhook
```

## Architecture Summary

### Backend Components

- `/service/src/stripe_service.py` - Stripe integration logic
- `/service/src/models.py` - API request/response models
- `/service/src/config.py` - Environment configuration
- `/service/src/app.py` - API endpoints

### Frontend Components

- `/ui/src/components/StripeCheckoutButton.tsx` - Checkout button component
- `/ui/src/components/PaymentSuccess.tsx` - Success page
- `/ui/src/components/PaymentCancel.tsx` - Cancel page
- `/ui/src/hooks/useSubscriptions.ts` - Extended with Stripe functions
- `/ui/src/config/stripe.ts` - Stripe configuration

### Key Features Implemented

1. ✅ Stripe Checkout Session creation
2. ✅ Payment success/cancel handling
3. ✅ Webhook event processing
4. ✅ Customer portal integration
5. ✅ Subscription status management
6. ✅ Error handling and loading states
7. ✅ Responsive UI components

## Next Steps for Production

1. **Switch to Live Mode**:

   - Replace test keys with live keys
   - Update webhook endpoint to production URL
   - Test with real payment methods

2. **Security Enhancements**:

   - Implement rate limiting
   - Add CSRF protection
   - Secure webhook endpoint validation

3. **Additional Features**:
   - Trial periods
   - Discount codes/coupons
   - Multiple subscription tiers
   - Usage-based billing

## Troubleshooting

### Common Issues

- **Webhook signature verification fails**: Ensure webhook secret is correct
- **Checkout button doesn't work**: Check Stripe publishable key in frontend
- **CORS errors**: Verify CORS settings in backend for your frontend URL
- **Database errors**: Ensure Neo4j credentials are correct

### Test Cards

- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Requires 3D Secure: `4000 0000 0000 3220`

For more test cards, see: <https://stripe.com/docs/testing#cards>

## Support

If you encounter issues, check:

1. Stripe Dashboard → Events (for webhook issues)
2. Browser developer console (for frontend errors)
3. Backend logs (for API errors)
4. Stripe documentation: <https://stripe.com/docs>

