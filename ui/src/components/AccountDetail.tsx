import { SavedSearchesComponent } from "./SavedSearches";
import { UserInfoSection } from "./UserInfoSection";
import { UserSubscriptionSection } from "./UserSubscriptionSection";

export const AccountDetail: React.FC = () => {
  return (
    <div className="account-page">
      <div className="account-container">
        <UserInfoSection />
        <UserSubscriptionSection />
        <SavedSearchesComponent />
      </div>
    </div>
  );
};
