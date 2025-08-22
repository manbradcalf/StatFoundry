import { useFeatureAccess } from "../hooks/useSubscriptions";

export const UserSubscriptionSection: React.FC = () => {
  const { hasAccess, disabledReason, restrictionType } = useFeatureAccess({ 
    requireAuth: true, 
    requirePro: true 
  });

  return (
    <div>
      <h1>Pro Access?</h1>
      <br />
      <div>
        <p><strong>Has Access:</strong> {hasAccess ? 'Yes' : 'No'}</p>
        <p><strong>Restriction Type:</strong> {restrictionType}</p>
        {disabledReason && (
          <p><strong>Disabled Reason:</strong> {disabledReason}</p>
        )}
      </div>
    </div>
  );
};
