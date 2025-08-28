import React, { useState, useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Subscription } from "../types/Subscription";
import { getStripeUrls } from "../config/stripe";
import { config } from "../config";
import { subscriptionCache } from "../utils/subscriptionCache";

export interface FeatureAccessResult {
  hasAccess: boolean;
  disabledReason: string | null;
  restrictionType: "none" | "auth" | "pro" | "loading";
}

export interface FeatureAccessOptions {
  requireAuth?: boolean;
  requirePro?: boolean;
  customCheck?: () => { hasAccess: boolean; reason?: string };
}

export const useSubscriptions = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserSubscriptions = useCallback(async (): Promise<
    Subscription[]
  > => {
    if (!user) {
      setError("User must be logged in");
      return [];
    }

    const cacheKey = `subscription-status-${user.uid}`;

    // Check cache first
    const cachedData = subscriptionCache.get(cacheKey);
    if (cachedData !== null) {
      // Convert cached Stripe data to our Subscription format for compatibility
      if (cachedData.is_pro && cachedData.subscription) {
        return [
          {
            id: cachedData.subscription.id,
            userId: user.uid,
            userEmail: user.email || "",
            isPro: cachedData.is_pro,
            stripeCustomerId: cachedData.customer_id,
            stripeSubscriptionId: cachedData.subscription.id,
            stripeStatus: cachedData.subscription.status,
            stripePriceId: cachedData.subscription.price_id,
            currentPeriodEnd: cachedData.subscription.current_period_end
              ? new Date(cachedData.subscription.current_period_end * 1000)
              : undefined,
            createdAt: null, // Not available from Stripe
            updatedAt: null, // Not available from Stripe
          },
        ];
      }
      return []; // No active subscriptions
    }

    setLoading(true);
    setError(null);

    try {
      // Get subscription data directly from Stripe
      const response = await fetch(
        `${config.serviceUrl}/api/stripe/subscription-status/${user.uid}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load subscription data: ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Cache the result
      subscriptionCache.set(cacheKey, data);

      // Convert Stripe data to our Subscription format for compatibility
      if (data.is_pro && data.subscription) {
        return [
          {
            id: data.subscription.id,
            userId: user.uid,
            userEmail: user.email || "",
            isPro: data.is_pro,
            stripeCustomerId: data.customer_id,
            stripeSubscriptionId: data.subscription.id,
            stripeStatus: data.subscription.status,
            stripePriceId: data.subscription.price_id,
            currentPeriodEnd: data.subscription.current_period_end
              ? new Date(data.subscription.current_period_end * 1000)
              : undefined,
            createdAt: null, // Not available from Stripe
            updatedAt: null, // Not available from Stripe
          },
        ];
      }

      return []; // No active subscriptions
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load subscriptions",
      );
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  const isUserPro = useCallback(async (): Promise<boolean> => {
    if (!user) {
      return false;
    }

    const cacheKey = `subscription-status-${user.uid}`;

    // Check cache first
    const cachedData = subscriptionCache.get(cacheKey);
    if (cachedData !== null) {
      return cachedData.is_pro;
    }

    setLoading(true);
    setError(null);

    try {
      // Query Stripe directly for subscription status
      const response = await fetch(
        `${config.serviceUrl}/api/stripe/subscription-status/${user.uid}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to check subscription status: ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Cache the result
      subscriptionCache.set(cacheKey, data);

      return data.is_pro;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check Pro status",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createStripeCheckoutSession = useCallback(
    async (
      customSuccessUrl?: string,
      customCancelUrl?: string,
    ): Promise<string | null> => {
      if (!user || !user.email) {
        setError(
          "User must be logged in with an email to create checkout session",
        );
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const urls = getStripeUrls();
        const response = await fetch(
          `${config.serviceUrl}/api/stripe/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_email: user.email,
              user_id: user.uid,
              success_url: customSuccessUrl || urls.success,
              cancel_url: customCancelUrl || urls.cancel,
            }),
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || "Failed to create checkout session");
        }

        const { checkout_url } = await response.json();
        return checkout_url;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to create checkout session";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const createStripePortalSession = useCallback(
    async (
      customerId: string,
      customReturnUrl?: string,
    ): Promise<string | null> => {
      setLoading(true);
      setError(null);

      try {
        const urls = getStripeUrls();
        const response = await fetch(
          `${config.serviceUrl}/api/stripe/create-portal-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customer_id: customerId,
              return_url: customReturnUrl || urls.customerPortal,
            }),
          },
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || "Failed to create portal session");
        }

        const { portal_url } = await response.json();
        return portal_url;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to create portal session";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const verifyStripeSession = useCallback(
    async (sessionId: string): Promise<boolean> => {
      if (!user) {
        setError("User must be logged in to verify payment");
        return false;
      }

      setLoading(true);
      setError(null);

      try {
        // Call backend to verify Stripe session
        const response = await fetch(
          `${config.serviceUrl}/api/stripe/verify-session/${sessionId}`,
        );

        if (!response.ok) {
          console.log("bad resposne", response);
          throw new Error(`Verification failed: ${response.statusText}`);
        }

        const sessionData = await response.json();

        // Ensure the session belongs to the current user
        if (sessionData.firebase_user_id !== user.uid) {
          throw new Error("Session does not belong to current user");
        }

        return sessionData.is_pro;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to verify payment";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const upgradeToProWithStripe = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setError("User must be logged in to upgrade");
      return false;
    }

    try {
      const checkoutUrl = await createStripeCheckoutSession();
      if (checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = checkoutUrl;
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to start upgrade process";
      setError(errorMessage);
      return false;
    }
  }, [user, createStripeCheckoutSession]);

  // Cache invalidation helper
  const clearSubscriptionCache = useCallback(() => {
    if (user) {
      const cacheKey = `subscription-status-${user.uid}`;
      subscriptionCache.delete(cacheKey);
    }
  }, [user]);

  return {
    getUserSubscriptions,
    isUserPro,
    createStripeCheckoutSession,
    createStripePortalSession,
    verifyStripeSession,
    upgradeToProWithStripe,
    clearSubscriptionCache,
    loading,
    error,
    clearError: () => setError(null),
  };
};

/**
 * Hook for checking feature access based on auth state, paywall, and custom conditions
 * Provides consistent access control logic across the application
 *
 * @param options Configuration for what access is required
 * @returns Object with access status, disabled reason, and restriction type
 */
export const useFeatureAccess = (
  options: FeatureAccessOptions = {},
): FeatureAccessResult => {
  const { user, loading: authLoading } = useAuth();
  const [proStatus, setProStatus] = useState<boolean | null>(null);
  const [proLoading, setProLoading] = useState(false);
  const { isUserPro } = useSubscriptions();
  const { requireAuth = false, requirePro = false, customCheck } = options;

  // Check pro status when needed
  React.useEffect(() => {
    const checkProStatus = async () => {
      if (requirePro && user && proStatus === null && !proLoading) {
        setProLoading(true);
        try {
          const isPro = await isUserPro();
          setProStatus(isPro);
        } catch (err) {
          setProStatus(false);
        } finally {
          setProLoading(false);
        }
      }
    };

    checkProStatus();
  }, [requirePro, user, proStatus, proLoading, isUserPro]);

  return useMemo(() => {
    // Show loading state during auth initialization or pro check
    if (authLoading || (requirePro && user && proLoading)) {
      return {
        hasAccess: false,
        disabledReason: "Loading...",
        restrictionType: "loading" as const,
      };
    }

    // Check custom access logic first
    if (customCheck) {
      const customResult = customCheck();
      if (!customResult.hasAccess) {
        return {
          hasAccess: false,
          disabledReason: customResult.reason || "Access denied",
          restrictionType: "none" as const,
        };
      }
    }

    // Check authentication requirement
    if (requireAuth && !user) {
      return {
        hasAccess: false,
        disabledReason: "Please sign in to access this feature",
        restrictionType: "auth" as const,
      };
    }

    // Check Pro requirement
    if (requirePro) {
      // If Pro is required but user is not authenticated
      if (!user) {
        return {
          hasAccess: false,
          disabledReason: "Please sign in to access Pro features",
          restrictionType: "auth" as const,
        };
      }

      // Check actual subscription status
      if (proStatus === false) {
        return {
          hasAccess: false,
          disabledReason: "Upgrade to Pro to access this feature",
          restrictionType: "pro" as const,
        };
      }
    }

    // All checks passed
    return {
      hasAccess: true,
      disabledReason: null,
      restrictionType: "none" as const,
    };
  }, [
    user,
    authLoading,
    requireAuth,
    requirePro,
    customCheck,
    proStatus,
    proLoading,
  ]);
};

/**
 * Convenience hooks for common access patterns
 */

export const useAuthRequiredFeature = () => {
  return useFeatureAccess({ requireAuth: true });
};

export const useProFeature = () => {
  return useFeatureAccess({ requireAuth: true, requirePro: true });
};

/**
 * Helper function to get CSS classes for restricted features
 */
export const getRestrictedFeatureClasses = (
  accessResult: FeatureAccessResult,
): string => {
  const baseClass = "restricted-feature";

  if (accessResult.hasAccess) {
    return baseClass;
  }

  const modifierClasses = {
    auth: `${baseClass}--auth-required`,
    pro: `${baseClass}--pro-required`,
    loading: `${baseClass}--loading`,
    none: `${baseClass}--disabled`,
  };

  return `${baseClass} ${modifierClasses[accessResult.restrictionType]}`;
};
