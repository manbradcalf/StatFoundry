import { useEffect, useState } from "react";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { Subscription } from "../types/Subscription";
import StripeCheckoutButton from "./StripeCheckoutButton";

export const UserSubscriptionSection: React.FC = () => {
  const {
    getUserSubscriptions,
    upgradeToProWithStripe,
    createStripePortalSession,
    loading,
    error,
    clearError,
  } = useSubscriptions();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      let subs = await getUserSubscriptions();
      setSubscriptions(subs);
    };
    fetchSubscriptions();
  }, [getUserSubscriptions]);
  const handleManageSubscription = async () => {
    // Get the Stripe customer ID from the active subscription
    const activeSubscription = subscriptions.find(sub => sub.isPro && sub.stripeCustomerId);
    if (!activeSubscription || !activeSubscription.stripeCustomerId) {
      console.error("No active subscription with customer ID found");
      return;
    }

    setActionLoading(true);
    try {
      const portalUrl = await createStripePortalSession(activeSubscription.stripeCustomerId);
      if (portalUrl) {
        window.location.href = portalUrl;
      }
    } catch (err) {
      console.error("Failed to open customer portal:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const hasPro = subscriptions.some((sub) => sub.isPro);

  return (
    <div className="user-info-section">
      <div className="section-header">
        <h2>Subscriptions</h2>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={clearError} className="btn-secondary">
            Dismiss
          </button>
        </div>
      )}

      <div className="subscription-content">
        {subscriptions.length === 0 ? (
          <div className="no-subscription">
            <p>No active subscriptions</p>
            <p>Upgrade to Pro to unlock advanced features!</p>

            <div className="subscription-actions">
              <StripeCheckoutButton
                className="btn-primary upgrade-button"
                onError={(error) => console.error("Checkout error:", error)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Upgrade to Pro"}
              </StripeCheckoutButton>
            </div>
          </div>
        ) : (
          <div className="subscription-list">
            {subscriptions.map((subscription: Subscription) => (
              <div key={subscription.id} className="subscription-item">
                <div className="subscription-details">
                  <p className="subscription-date">
                    Created:{" "}
                    {new Date(
                      subscription.createdAt?.seconds * 1000,
                    ).toLocaleDateString()}
                  </p>
                  <p className="subscription-status">
                    <b>Status:</b> {subscription.isPro ? "✅ Pro" : "🚫 Free"}
                  </p>
                </div>

                {subscription.isPro && (
                  <div className="pro-features">
                    <h4>Pro Features Included:</h4>
                    <ul>
                      <li>✅ Export capabilities</li>
                      <li>✅ Save Searches</li>
                      <li>✅ Access to Discord Server</li>
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div className="subscription-actions">
              {!hasPro ? (
                <StripeCheckoutButton
                  className="btn-primary upgrade-button"
                  onError={(error) => console.error("Checkout error:", error)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Upgrade to Pro"}
                </StripeCheckoutButton>
              ) : (
                <div className="manage-subscription">
                  <p>
                    Manage your subscription, update payment methods, or view
                    billing history:
                  </p>
                  <button
                    onClick={handleManageSubscription}
                    disabled={actionLoading}
                    className="btn-secondary manage-button"
                  >
                    {actionLoading ? "Loading..." : "Manage Subscription"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
