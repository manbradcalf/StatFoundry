import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSubscriptions } from "../hooks/useSubscriptions";

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "verified" | "failed"
  >("pending");
  const [verificationMessage, setVerificationMessage] = useState(
    "Confirming your Pro subscription...",
  );
  const { verifyStripeSession, clearSubscriptionCache } = useSubscriptions();

  // Get session_id from URL parameters
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const backgroundVerification = async () => {
      if (!sessionId) {
        return;
      }

      try {
        // Verify in background without blocking success UI
        const isProVerified = await verifyStripeSession(sessionId);

        if (isProVerified) {
          setVerificationMessage("✅ Pro subscription confirmed!");
          setVerificationStatus("verified");
          // Clear cache so fresh subscription data is fetched
          clearSubscriptionCache();
        } else {
          setVerificationMessage("⏳ Pro subscription activating...");
          setVerificationStatus("pending");
        }
      } catch (err: any) {
        console.error("Background verification failed:", err.message);
        setVerificationMessage("⚠️ Unable to confirm Pro status right now");
        setVerificationStatus("failed");
      }
    };

    // Start background verification after a short delay to let UI render
    const timer = setTimeout(backgroundVerification, 500);
    return () => clearTimeout(timer);
  }, [sessionId, verifyStripeSession, clearSubscriptionCache]);

  // Show error only if no session ID (shouldn't happen with proper Stripe redirect)
  if (!sessionId) {
    return (
      <div className="payment-status-container">
        <div className="payment-status-content error">
          <h2>⚠️ Payment Session Not Found</h2>
          <p>
            We couldn't find your payment session. If you just completed a
            payment, please check your account or contact support.
          </p>
          <div className="payment-actions">
            <button
              onClick={() => navigate("/account")}
              className="btn-primary"
            >
              Check Account
            </button>
            <button onClick={() => navigate("/")} className="btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show optimistic success - if Stripe redirected here, payment succeeded
  return (
    <div className="payment-status-container">
      <div className="payment-status-content success">
        <h2>🎉 Payment Successful!</h2>
        <p>
          Welcome to StatFoundry Pro! Your payment has been processed
          successfully.
        </p>

        {/* Background verification status */}
        <div className="verification-status">
          <p className={`verification-message ${verificationStatus}`}>
            {verificationMessage}
          </p>
        </div>

        <div className="pro-benefits">
          <h3>Your Pro benefits include:</h3>
          <ul>
            <li>✅ Export capabilities</li>
            <li>✅ Save Searches</li>
            <li>✅ Access to Discord Server</li>
          </ul>
        </div>

        <div className="payment-actions">
          <button onClick={() => navigate("/")} className="btn-primary">
            Start Exploring Pro Features
          </button>
          <button
            onClick={() => navigate("/account")}
            className="btn-secondary"
          >
            Manage Subscription
          </button>
        </div>

        <p className="payment-details">
          Payment Reference: <br />
          <p>{sessionId}</p>
          {verificationStatus === "verified" && (
            <span className="verification-badge">Confirmed</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

