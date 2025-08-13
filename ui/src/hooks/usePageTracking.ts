import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: { [key: string]: any }
    ) => void;
  }
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Only track if gtag is available
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-WXE3QT8F8B', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}