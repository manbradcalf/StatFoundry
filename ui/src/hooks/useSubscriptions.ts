import React, { useState, useCallback, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import { subscriptionService } from "../services/subscriptionService";
import { Subscription, CreateSubscriptionData } from "../types/Subscription";
import { getStripeUrls } from "../config/stripe";
import { config } from "../config";

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

  const createSubscription = useCallback(
    async (
      subscriptionData: CreateSubscriptionData,
    ): Promise<string | null> => {
      if (!user) {
        setError("User must be logged in to create subscription");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const subscriptionId =
          await subscriptionService.createSubscription(subscriptionData);

        return subscriptionId;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create subscription";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const getUserSubscriptions = useCallback(async (): Promise<
    Subscription[]
  > => {
    if (!user) {
      setError("User must be logged in");
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      return await subscriptionService.getUserSubscriptions(user.uid);
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

    setLoading(true);
    setError(null);

    try {
      return await subscriptionService.isUserPro(user.uid);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to check Pro status",
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const upgradeUserToPro = useCallback(async (): Promise<string | null> => {
    if (!user) {
      setError("User must be logged in to upgrade");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const subscriptionId = await subscriptionService.upgradeUserToPro(
        user.uid,
      );
      return subscriptionId;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upgrade to Pro";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const downgradeUserFromPro = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setError("User must be logged in");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      await subscriptionService.downgradeUserFromPro(user.uid);
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to downgrade from Pro";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateSubscription = useCallback(
    async (
      subscriptionId: string,
      updates: Partial<CreateSubscriptionData>,
    ): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        await subscriptionService.updateSubscription(subscriptionId, updates);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to update subscription",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteSubscription = useCallback(
    async (subscriptionId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        await subscriptionService.deleteSubscription(subscriptionId);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete subscription",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createStripeCheckoutSession = useCallback(
    async (customSuccessUrl?: string, customCancelUrl?: string): Promise<string | null> => {
      if (!user || !user.email) {
        setError("User must be logged in with an email to create checkout session");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const urls = getStripeUrls();
        const response = await fetch(`${config.serviceUrl}/api/stripe/create-checkout-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_email: user.email,
            user_id: user.uid,
            success_url: customSuccessUrl || urls.success,
            cancel_url: customCancelUrl || urls.cancel,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to create checkout session');
        }

        const { checkout_url } = await response.json();
        return checkout_url;

      } catch (err) {
        const errorMessage = 
          err instanceof Error ? err.message : "Failed to create checkout session";
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const createStripePortalSession = useCallback(
    async (customerId: string, customReturnUrl?: string): Promise<string | null> => {
      setLoading(true);
      setError(null);

      try {
        const urls = getStripeUrls();
        const response = await fetch(`${config.serviceUrl}/api/stripe/create-portal-session`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer_id: customerId,
            return_url: customReturnUrl || urls.customerPortal,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail || 'Failed to create portal session');
        }

        const { portal_url } = await response.json();
        return portal_url;

      } catch (err) {
        const errorMessage = 
          err instanceof Error ? err.message : "Failed to create portal session";
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
        const response = await fetch(`${config.serviceUrl}/api/stripe/verify-session/${sessionId}`);
        
        if (!response.ok) {
          throw new Error(`Verification failed: ${response.statusText}`);
        }
        
        const sessionData = await response.json();
        
        // Ensure the session belongs to the current user
        if (sessionData.firebase_user_id !== user.uid) {
          throw new Error("Session does not belong to current user");
        }
        
        // Update Firestore with subscription data
        if (sessionData.is_pro && sessionData.subscription) {
          await subscriptionService.createSubscription({
            userId: user.uid,
            isPro: true
          });
        }
        
        return sessionData.is_pro;
        
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to verify payment";
        setError(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const upgradeToProWithStripe = useCallback(
    async (): Promise<boolean> => {
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
    },
    [user, createStripeCheckoutSession],
  );

  return {
    createSubscription,
    getUserSubscriptions,
    isUserPro,
    upgradeUserToPro,
    downgradeUserFromPro,
    updateSubscription,
    deleteSubscription,
    createStripeCheckoutSession,
    createStripePortalSession,
    verifyStripeSession,
    upgradeToProWithStripe,
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
