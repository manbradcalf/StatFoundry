import { logEvent, setUserProperties, setUserId } from "firebase/analytics";
import { analytics } from "../firebase/config";
import { config } from "../config";

// Event parameter types for type safety
export interface SearchEventParams {
  search_term: string;
  chain_length: number;
  cypher_query: string;
  result_count?: number;
  search_duration_ms?: number;
}

export interface SuggestionEventParams {
  suggestion_text: string;
  suggestion_index: number;
  chain_state: string;
  query_string: string;
}

export interface PlayerViewEventParams {
  player_gsis_id: string;
  player_name: string;
  player_position?: string;
  referrer_page?: string;
}

export interface NavigationEventParams {
  link_text: string;
  destination: string;
  source_component: string;
}

export interface TableSortEventParams {
  table_type: string;
  column_name: string;
  sort_direction: 'asc' | 'desc' | null;
  data_count: number;
}

export interface ErrorEventParams {
  error_message: string;
  error_stack?: string;
  component_name?: string;
  user_action?: string;
}

export interface PerformanceEventParams {
  metric_name: string;
  metric_value: number;
  page_url?: string;
}

// Analytics utility class
class AnalyticsService {
  private isDevelopment = config.isDevelopment();

  // Initialize analytics for the session
  initializeAnalytics(userId?: string) {
    if (this.isDevelopment) {
      console.log('[Analytics] Development mode - events will be logged to console');
    }

    if (userId) {
      this.setUserId(userId);
    }

    // Set initial user properties
    this.setUserProperties({
      environment: config.environment,
      first_visit_timestamp: Date.now().toString(),
    });
  }

  // Set user ID for tracking
  setUserId(userId: string) {
    if (this.isDevelopment) {
      console.log('[Analytics] Setting user ID:', userId);
      return;
    }
    setUserId(analytics, userId);
  }

  // Set user properties
  setUserProperties(properties: { [key: string]: string }) {
    if (this.isDevelopment) {
      console.log('[Analytics] Setting user properties:', properties);
      return;
    }
    setUserProperties(analytics, properties);
  }

  // Track search events
  trackSearch(params: SearchEventParams) {
    this.logEvent('search', {
      search_term: params.search_term,
      chain_length: params.chain_length,
      cypher_query: params.cypher_query.substring(0, 500), // Limit length
      result_count: params.result_count,
      search_duration_ms: params.search_duration_ms,
    });
  }

  // Track suggestion selections
  trackSuggestionSelect(params: SuggestionEventParams) {
    this.logEvent('select_suggestion', {
      suggestion_text: params.suggestion_text,
      suggestion_index: params.suggestion_index,
      chain_state: params.chain_state.substring(0, 1000), // Limit length
      query_string: params.query_string,
    });
  }

  // Track player detail views
  trackPlayerView(params: PlayerViewEventParams) {
    this.logEvent('view_player_detail', {
      player_gsis_id: params.player_gsis_id,
      player_name: params.player_name,
      player_position: params.player_position,
      referrer_page: params.referrer_page,
    });
  }

  // Track navigation clicks
  trackNavigation(params: NavigationEventParams) {
    this.logEvent('select_content', {
      content_type: 'navigation_link',
      item_id: params.destination,
      link_text: params.link_text,
      source_component: params.source_component,
    });
  }

  // Track table sorting
  trackTableSort(params: TableSortEventParams) {
    this.logEvent('sort_table', {
      table_type: params.table_type,
      column_name: params.column_name,
      sort_direction: params.sort_direction || 'none',
      data_count: params.data_count,
    });
  }

  // Track errors and crashes
  trackError(params: ErrorEventParams) {
    this.logEvent('exception', {
      description: params.error_message.substring(0, 150), // Limit length
      fatal: false,
      component_name: params.component_name,
      user_action: params.user_action,
    });
  }

  // Track performance metrics
  trackPerformance(params: PerformanceEventParams) {
    this.logEvent('timing_complete', {
      name: params.metric_name,
      value: params.metric_value,
      page_url: params.page_url,
    });
  }

  // Track authentication events
  trackAuth(action: 'login' | 'logout' | 'signup', method?: string) {
    if (action === 'login') {
      this.logEvent('login', {
        method: method || 'unknown',
      });
    } else if (action === 'logout') {
      this.logEvent('logout', {});
    } else if (action === 'signup') {
      this.logEvent('sign_up', {
        method: method || 'unknown',
      });
    }
  }

  // Track page views
  trackPageView(pagePath: string, pageTitle?: string) {
    this.logEvent('page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }

  // Track custom events
  trackCustomEvent(eventName: string, parameters?: { [key: string]: any }) {
    this.logEvent(eventName, parameters);
  }

  // Private method to handle event logging
  private logEvent(eventName: string, parameters?: { [key: string]: any }) {
    if (this.isDevelopment) {
      console.log(`[Analytics] Event: ${eventName}`, parameters);
      return;
    }

    try {
      logEvent(analytics, eventName, parameters);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Helper functions for common tracking scenarios
export const trackSearchTiming = (startTime: number) => {
  const duration = Date.now() - startTime;
  analyticsService.trackPerformance({
    metric_name: 'search_duration',
    metric_value: duration,
  });
};

export const trackPageLoad = (startTime: number, pagePath: string) => {
  const loadTime = Date.now() - startTime;
  analyticsService.trackPerformance({
    metric_name: 'page_load_time',
    metric_value: loadTime,
    page_url: pagePath,
  });
};