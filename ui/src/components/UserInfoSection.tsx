import { useAuth } from "../contexts/AuthContext";

export const UserInfoSection: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="user-info-section">
        <div className="section-header">
          <h2>Profile</h2>
        </div>
        <div className="user-info-card">
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  // Generate initials for avatar
  const getInitials = (name: string | null, email: string | null): string => {
    if (name) {
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return "U";
  };

  // Format join date from Firebase creation time
  const formatJoinDate = (user: any): string => {
    if (user.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
    return "Recently";
  };

  const displayName = user.displayName || user.email?.split("@")[0] || "User";
  const initials = getInitials(user.displayName, user.email);

  return (
    <div className="user-info-section">
      <div className="section-header">
        <h2>Profile</h2>
      </div>
      <div className="user-info-card">
        <div className="user-avatar">
          <div className="avatar-placeholder">{initials}</div>
        </div>
        <div className="user-details">
          <div className="user-main-info">
            <h3 className="user-name">{displayName}</h3>
            <p className="user-email">{user.email}</p>
          </div>
          <div className="user-stats">
            <div className="stat">
              <span className="stat-label">Member since</span>
              <span className="stat-value">{formatJoinDate(user)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
