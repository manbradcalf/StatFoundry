import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-status-container">
      <div className="payment-status-content cancel">
        <h2>❌ Payment Cancelled</h2>
        <p>Your payment was cancelled. No charges have been made to your account.</p>
        
        <div className="cancel-info">
          <h3>What happened?</h3>
          <p>
            You cancelled the payment process before completing your Pro subscription.
            You can try again anytime to unlock Pro features.
          </p>
        </div>

        <div className="pro-reminder">
          <h3>Pro features you're missing:</h3>
          <ul>
            <li>🔒 Unlimited query complexity</li>
            <li>🔒 Advanced analytics features</li>
            <li>🔒 Priority support</li>
            <li>🔒 Export capabilities</li>
            <li>🔒 Early access to new features</li>
          </ul>
        </div>

        <div className="payment-actions">
          <button 
            onClick={() => navigate('/account')} 
            className="btn-primary"
          >
            Try Again
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="btn-secondary"
          >
            Continue with Free
          </button>
        </div>

        <div className="support-info">
          <p>
            Need help? <a href="mailto:support@statfoundry.com">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;