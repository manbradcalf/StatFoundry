import { useEffect, useState } from "react";
import { useSubscriptions } from "../hooks/useSubscriptions";
import { Subscription } from "../types/Subscription";

export const UserSubscriptionSection: React.FC = () => {
  const { getUserSubscriptions } = useSubscriptions();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      let subs = await getUserSubscriptions();
      setSubscriptions(subs);
    };
    fetchSubscriptions();
  }, [getUserSubscriptions]);
  return (
    <div className="user-info-section">
      <div className="section-header">
        <h2>Subscriptions</h2>
      </div>
      <div>
        {subscriptions.length === 0 ? (
          <div>No Subscriptions :(</div>
        ) : (
          subscriptions.map((x: Subscription) => (
            <div key={x.id}>
              <div>{x.createdAt}</div>
              <p>
                <b>Pro Account:</b> {x.isPro ? "✅" : "🚫"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
