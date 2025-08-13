import { useEffect, useState } from "react";
import { useSavedSearches } from "../hooks/useSavedSearches";
import { SavedSearch } from "../types/SavedSearch";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const AccountDetail: React.FC = () => {
  return (
    <div className="account-page">
      <div className="account-container">
        <UserInfoSection />
        <SavedSearchesComponent />
      </div>
    </div>
  );
};

const UserInfoSection: React.FC = () => {
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
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Format join date from Firebase creation time
  const formatJoinDate = (user: any): string => {
    if (user.metadata?.creationTime) {
      const date = new Date(user.metadata.creationTime);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    }
    return 'Recently';
  };

  const displayName = user.displayName || user.email?.split('@')[0] || 'User';
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

export const SavedSearchesComponent: React.FC = () => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[] | null>([]);
  const { getUserSavedSearches, deleteSavedSearch } = useSavedSearches();
  const { executeSearch } = useSearchAPIContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserSavedSearches()
      .then((x: SavedSearch[]) => {
        console.log(x);
        setSavedSearches(x);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [getUserSavedSearches, setSavedSearches]);

  const handleSearchFromSavedSearch = (savedSearch: SavedSearch) => {
    executeSearch(savedSearch.cypher, savedSearch.aliases, "");
    navigate("/", { state: { message: "hello" } });
  };

  const handleDeleteSavedSearch = async (searchId: string) => {
    if (window.confirm("Are you sure you want to delete this saved search?")) {
      const success = await deleteSavedSearch(searchId);
      if (success && savedSearches) {
        // Remove the deleted search from the local state
        setSavedSearches(savedSearches.filter(search => search.id !== searchId));
      }
    }
  };

  if (!savedSearches || savedSearches.length === 0) {
    return (
      <div className="saved-searches-section">
        <div className="section-header">
          <h2>Saved Searches</h2>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p className="empty-title">No saved searches yet</p>
          <p className="empty-subtitle">Save your first search to see it here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-searches-section">
      <div className="section-header">
        <h2>Saved Searches</h2>
        <span className="search-count">{savedSearches.length}</span>
      </div>
      <div className="saved-searches-grid">
        {savedSearches.map((search) => {
          return (
            <div key={search.id} className="saved-search-card">
              <div className="search-header">
                <h3 className="search-name">{search.name}</h3>
                <div className="search-actions">
                  <button 
                    className="action-button run-button"
                    onClick={() => handleSearchFromSavedSearch(search)}
                    title="Run this search"
                  >
                    ▶️
                  </button>
                  <button 
                    className="action-button delete-button"
                    onClick={() => handleDeleteSavedSearch(search.id)}
                    title="Delete search"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {search.description && (
                <p className="search-description">{search.description}</p>
              )}
              <div className="search-footer">
                <span className="search-date">Created Dec 15, 2024</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SavedSearchComponent: React.FC<SavedSearch> = (
  savedSearch: SavedSearch,
) => {
  return <div>SavedSearch: {savedSearch.name}</div>;
};
