import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface FeatureAccessResult {
  hasAccess: boolean;
  disabledReason: string | null;
  restrictionType: 'none' | 'auth' | 'premium' | 'loading';
}

export interface FeatureAccessOptions {
  requireAuth?: boolean;
  requirePremium?: boolean;
  customCheck?: () => { hasAccess: boolean; reason?: string };
}

/**
 * Hook for checking feature access based on auth state, paywall, and custom conditions
 * Provides consistent access control logic across the application
 * 
 * @param options Configuration for what access is required
 * @returns Object with access status, disabled reason, and restriction type
 */
export const useFeatureAccess = (options: FeatureAccessOptions = {}): FeatureAccessResult => {
  const { user, loading } = useAuth();
  const { requireAuth = false, requirePremium = false, customCheck } = options;

  return useMemo(() => {
    // Show loading state during auth initialization
    if (loading) {
      return {
        hasAccess: false,
        disabledReason: 'Loading...',
        restrictionType: 'loading' as const,
      };
    }

    // Check custom access logic first
    if (customCheck) {
      const customResult = customCheck();
      if (!customResult.hasAccess) {
        return {
          hasAccess: false,
          disabledReason: customResult.reason || 'Access denied',
          restrictionType: 'none' as const,
        };
      }
    }

    // Check authentication requirement
    if (requireAuth && !user) {
      return {
        hasAccess: false,
        disabledReason: 'Please sign in to access this feature',
        restrictionType: 'auth' as const,
      };
    }

    // Check premium/paywall requirement (future implementation)
    if (requirePremium) {
      // TODO: Implement paywall logic here
      // For now, assume all authenticated users have premium access
      // In the future, this would check subscription status:
      // const hasPremium = user?.customClaims?.premium || false;
      // if (!hasPremium) {
      //   return {
      //     hasAccess: false,
      //     disabledReason: 'Upgrade to Pro to access this feature',
      //     restrictionType: 'premium' as const,
      //   };
      // }
      
      // If premium is required but user is not authenticated
      if (!user) {
        return {
          hasAccess: false,
          disabledReason: 'Please sign in to access premium features',
          restrictionType: 'auth' as const,
        };
      }
    }

    // All checks passed
    return {
      hasAccess: true,
      disabledReason: null,
      restrictionType: 'none' as const,
    };
  }, [user, loading, requireAuth, requirePremium, customCheck]);
};

/**
 * Convenience hooks for common access patterns
 */

export const useAuthRequiredFeature = () => {
  return useFeatureAccess({ requireAuth: true });
};

export const usePremiumFeature = () => {
  return useFeatureAccess({ requireAuth: true, requirePremium: true });
};

/**
 * Helper function to get CSS classes for restricted features
 */
export const getRestrictedFeatureClasses = (accessResult: FeatureAccessResult): string => {
  const baseClass = 'restricted-feature';
  
  if (accessResult.hasAccess) {
    return baseClass;
  }

  const modifierClasses = {
    auth: `${baseClass}--auth-required`,
    premium: `${baseClass}--premium-required`,
    loading: `${baseClass}--loading`,
    none: `${baseClass}--disabled`,
  };

  return `${baseClass} ${modifierClasses[accessResult.restrictionType]}`;
};