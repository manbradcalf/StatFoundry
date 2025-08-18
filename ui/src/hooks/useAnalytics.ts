import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from '../utils/analytics';

// Hook to track page views automatically
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const pagePath = location.pathname + location.search;
    analyticsService.trackPageView(pagePath);
  }, [location]);
};

// Hook to initialize analytics service
export const useAnalyticsInit = (userId?: string) => {
  useEffect(() => {
    analyticsService.initializeAnalytics(userId);
  }, [userId]);
};

// Hook for session duration tracking
export const useSessionTracking = () => {
  useEffect(() => {
    const sessionStart = Date.now();

    // Track session start
    analyticsService.trackCustomEvent('session_start');

    // Track session end when user leaves
    const handleBeforeUnload = () => {
      const sessionDuration = Date.now() - sessionStart;
      analyticsService.trackCustomEvent('session_end', {
        session_duration_ms: sessionDuration,
      });
    };

    // Track visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        analyticsService.trackCustomEvent('page_blur');
      } else {
        analyticsService.trackCustomEvent('page_focus');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Track session duration when hook unmounts
      const sessionDuration = Date.now() - sessionStart;
      analyticsService.trackCustomEvent('component_session_end', {
        session_duration_ms: sessionDuration,
      });
    };
  }, []);
};