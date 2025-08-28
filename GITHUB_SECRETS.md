# GitHub Repository Secrets Setup

This document lists the GitHub repository secrets needed for CI/CD deployments.

## Required Secrets

### Azure Deployment
- `AZURE_STATIC_WEB_APPS_API_TOKEN` - Token for deploying to Azure Static Web Apps

### Firebase Configuration
- `REACT_APP_FIREBASE_APIKEY` - Firebase API key for authentication

### Stripe Configuration
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key for payment processing
  - **Value**: `pk_test_51Ryal7A0ayh3ZfU1ZiS9HC5YPi9tSySHunzdPThSDaZUMmCsrWOzh5b3AdRgTJnPBf3hN9mrWZe2zdukmjsZUyrP00a1nqsijA`
  - **Note**: This is a publishable key (safe to expose in frontend builds)

## How to Add Secrets

1. Go to your GitHub repository
2. Navigate to: **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add the secret name and value from the list above

## Verification

After adding secrets, trigger a deployment by pushing to `main` branch with changes to the `ui/` directory. Check the build logs to ensure environment variables are properly set.