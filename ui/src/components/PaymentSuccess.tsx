import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSubscriptions } from '../hooks/useSubscriptions';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionVerified, setSubscriptionVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('Verifying your payment...');
  const { verifyStripeSession, getUserSubscriptions } = useSubscriptions();
  
  // Get session_id from URL parameters
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('No session ID found in URL');
        setLoading(false);
        return;
      }

      // Polling configuration
      const maxAttempts = 10;
      const pollIntervalMs = 2000; // 2 seconds
      
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          // Update progress message
          if (attempt === 1) {
            setVerificationMessage('Verifying your payment...');
          } else if (attempt <= 3) {
            setVerificationMessage('Still processing... (this may take a moment)');
          } else if (attempt <= 6) {
            setVerificationMessage(`Almost there... confirming subscription (${attempt}/${maxAttempts})`);
          } else {
            setVerificationMessage(`Final verification steps... (${attempt}/${maxAttempts})`);
          }
          
          // Try to verify the Stripe session
          const isProVerified = await verifyStripeSession(sessionId);
          
          if (isProVerified) {
            setVerificationMessage('Payment verified successfully!');
            setSubscriptionVerified(true);
            // Refresh subscription data to ensure UI is up to date
            await getUserSubscriptions();
            setLoading(false);
            return; // Success - exit polling
          }
          
          // If verification returned false and this is the last attempt
          if (attempt === maxAttempts) {
            setError(`Unable to verify payment after ${maxAttempts} attempts. Your payment was processed successfully, but we're having trouble confirming your subscription. Please check your account or contact support.`);
            setLoading(false);
            return;
          }
          
        } catch (err: any) {
          console.log(`Verification attempt ${attempt} failed:`, err.message);
          
          // If it's the last attempt, show error
          if (attempt === maxAttempts) {
            setError(`Unable to verify payment after ${maxAttempts} attempts. Your payment was processed successfully, but we're having trouble confirming your subscription. Please check your account or contact support.`);
            setLoading(false);
            return;
          }
        }
        
        // Wait before next attempt (except on last iteration)
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
        }
      }
    };

    verifyPayment();
  }, [sessionId, verifyStripeSession, getUserSubscriptions]);

  if (loading) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-content">
          <div className="loading-spinner"></div>
          <h2>Processing your payment...</h2>
          <p>{verificationMessage}</p>
          <p className="verification-note">Please wait while we confirm your Pro subscription.</p>
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
        {subscriptionVerified ? (
          <p>Welcome to StatFoundry Pro! Your subscription has been verified and is now active.</p>
        ) : (
          <p>Your payment was processed successfully. Your Pro subscription should be active shortly.</p>
        )}
        
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
            {subscriptionVerified && <span className="verification-badge">✅ Verified</span>}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;