import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSubscriptions } from '../hooks/useSubscriptions';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getUserSubscriptions } = useSubscriptions();
  
  // Get session_id from URL parameters
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Give Stripe webhooks time to process
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Refresh subscription data
        await getUserSubscriptions();
        
        setLoading(false);
      } catch (err) {
        setError('Failed to verify payment status');
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setError('No session ID found');
      setLoading(false);
    }
  }, [sessionId, getUserSubscriptions]);

  if (loading) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-content">
          <div className="loading-spinner"></div>
          <h2>Processing your payment...</h2>
          <p>Please wait while we confirm your Pro subscription.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-content error">
          <h2>⚠️ Payment Verification Error</h2>
          <p>{error}</p>
          <div className="payment-actions">
            <button onClick={() => navigate('/account')} className="btn-primary">
              Go to Account
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-status-container">
      <div className="payment-status-content success">
        <h2>🎉 Payment Successful!</h2>
        <p>Welcome to StatFoundry Pro! Your subscription is now active.</p>
        
        <div className="pro-benefits">
          <h3>Your Pro benefits include:</h3>
          <ul>
            <li>✅ Unlimited query complexity</li>
            <li>✅ Advanced analytics features</li>
            <li>✅ Priority support</li>
            <li>✅ Export capabilities</li>
            <li>✅ Early access to new features</li>
          </ul>
        </div>

        <div className="payment-actions">
          <button onClick={() => navigate('/')} className="btn-primary">
            Start Exploring
          </button>
          <button onClick={() => navigate('/account')} className="btn-secondary">
            Manage Subscription
          </button>
        </div>

        {sessionId && (
          <p className="payment-details">
            Payment Reference: <code>{sessionId}</code>
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;