import React, { Component, ErrorInfo, ReactNode } from 'react';
import { analyticsService } from '../utils/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track the error with Firebase Analytics
    analyticsService.trackError({
      error_message: error.message,
      error_stack: error.stack,
      component_name: 'ErrorBoundary',
      user_action: 'component_render',
    });

    // Also log to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div style={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#d63031', marginBottom: '10px' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: '#636e72', marginBottom: '15px' }}>
            We've been notified about this error and will work to fix it.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0984e3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '15px', textAlign: 'left' }}>
              <summary style={{ cursor: 'pointer', color: '#636e72' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{
                fontSize: '12px',
                backgroundColor: '#f8f9fa',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
                marginTop: '10px'
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}