import React, { useState, useMemo, useCallback } from "react";
import Modal from "react-modal";
import { Alias } from "../feature/Chunks/Types/Alias";
import { AliasType } from "../feature/Chunks/Enums/AliasType";
import { PLAYER_LABEL_PROPERTIES } from "../feature/Chunks/Views/PlayerLabelView";
import { PLAYERGAME_LABEL_PROPERTIES } from "../feature/Chunks/Views/PlayerGameLabelView";
import { PLAYERSEASON_LABEL_PROPERTIES } from "../feature/Chunks/Views/PlayerSeasonLabelView";
import { GAME_LABEL_PROPERTIES } from "../feature/Chunks/Views/GameLabelView";
import { SEASON_LABEL_PROPERTIES } from "../feature/Chunks/Views/SeasonLabelView";
import { TEAMGAME_LABEL_PROPERTIES } from "../feature/Chunks/Views/TeamGameLabelView";
import { PLAY_LABEL_PROPERTIES } from "../feature/Chunks/Views/PlayLabelView";
import { COLLEGE_LABEL_PROPERTIES } from "../feature/Chunks/Views/CollegeLabelView";
import { COLLEGECONFERENCE_LABEL_PROPERTIES } from "../feature/Chunks/Views/CollegeConferenceLabelView";

interface PropertyInfo {
  key: string;
  type: string;
}

interface ReturnPropertySelectorProps {
  isOpen: boolean;
  aliases: Alias[];
  onSave: (selectedProperties: string[]) => void;
  onCancel: () => void;
}

// Get properties for an alias type
const getPropertiesForAliasType = (aliasType: AliasType): PropertyInfo[] => {
  switch (aliasType) {
    case AliasType.Player:
      return PLAYER_LABEL_PROPERTIES;
    case AliasType.PlayerGame:
    case AliasType.PassingGame:
    case AliasType.FlexGame:
      return PLAYERGAME_LABEL_PROPERTIES;
    case AliasType.PlayerSeason:
    case AliasType.PassingSeason:
    case AliasType.FlexSeason:
      return PLAYERSEASON_LABEL_PROPERTIES;
    case AliasType.Game:
      return GAME_LABEL_PROPERTIES;
    case AliasType.Season:
      return SEASON_LABEL_PROPERTIES;
    case AliasType.TeamGame:
      return TEAMGAME_LABEL_PROPERTIES;
    case AliasType.Play:
      return PLAY_LABEL_PROPERTIES;
    case AliasType.College:
      return COLLEGE_LABEL_PROPERTIES;
    case AliasType.CollegeConference:
      return COLLEGECONFERENCE_LABEL_PROPERTIES;
    default:
      return [];
  }
};

// Property categories for quick selection
const PROPERTY_CATEGORIES: Record<string, string[]> = {
  "Passing Stats": [
    "completions",
    "attempts",
    "passing_yards",
    "passing_tds",
    "interceptions",
    "passing_epa",
    "passing_air_yards",
    "passing_yards_after_catch",
    "passing_first_downs",
    "passing_2pt_conversions",
    "sacks",
    "sack_yards",
  ],
  "Rushing Stats": [
    "carries",
    "rushing_yards",
    "rushing_tds",
    "rushing_epa",
    "rushing_first_downs",
    "rushing_fumbles",
    "rushing_fumbles_lost",
    "rushing_2pt_conversions",
    "yards_per_carry",
  ],
  "Receiving Stats": [
    "targets",
    "receptions",
    "receiving_yards",
    "receiving_tds",
    "receiving_epa",
    "receiving_first_downs",
    "receiving_air_yards",
    "receiving_yards_after_catch",
    "receiving_fumbles",
    "receiving_fumbles_lost",
    "receiving_2pt_conversions",
    "target_share",
    "air_yards_share",
  ],
  "Fantasy Stats": ["fantasy_points", "fantasy_points_ppr"],
  "Identifying Info": [
    "player_display_name",
    "display_name",
    "player_name",
    "name",
    "position",
    "recent_team",
    "team",
    "team_abbr",
    "season",
    "week",
    "season_type",
  ],
};

// Format property name for display
const formatPropertyName = (key: string): string => {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const ReturnPropertySelector: React.FC<ReturnPropertySelectorProps> = ({
  isOpen,
  aliases,
  onSave,
  onCancel,
}) => {
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(aliases.map((a) => a.Name))
  );

  // Build property groups from aliases
  const propertyGroups = useMemo(() => {
    const groups: Record<
      string,
      { alias: Alias; properties: PropertyInfo[] }
    > = {};

    aliases.forEach((alias) => {
      const properties = getPropertiesForAliasType(alias.AliasType);
      if (properties.length > 0) {
        groups[alias.Name] = { alias, properties };
      }
    });

    return groups;
  }, [aliases]);

  // Filter properties based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return propertyGroups;

    const query = searchQuery.toLowerCase();
    const filtered: typeof propertyGroups = {};

    Object.entries(propertyGroups).forEach(([aliasName, group]) => {
      const matchingProperties = group.properties.filter(
        (prop) =>
          prop.key.toLowerCase().includes(query) ||
          formatPropertyName(prop.key).toLowerCase().includes(query)
      );
      if (matchingProperties.length > 0) {
        filtered[aliasName] = { ...group, properties: matchingProperties };
      }
    });

    return filtered;
  }, [propertyGroups, searchQuery]);

  // Toggle a single property
  const toggleProperty = useCallback((aliasName: string, propKey: string) => {
    const fullKey = `${aliasName}.${propKey}`;
    setSelectedProperties((prev) => {
      const next = new Set(prev);
      if (next.has(fullKey)) {
        next.delete(fullKey);
      } else {
        next.add(fullKey);
      }
      return next;
    });
  }, []);

  // Select all properties in a group
  const selectAllInGroup = useCallback(
    (aliasName: string) => {
      const group = propertyGroups[aliasName];
      if (!group) return;

      setSelectedProperties((prev) => {
        const next = new Set(prev);
        group.properties.forEach((prop) => {
          next.add(`${aliasName}.${prop.key}`);
        });
        return next;
      });
    },
    [propertyGroups]
  );

  // Clear all properties in a group
  const clearAllInGroup = useCallback(
    (aliasName: string) => {
      const group = propertyGroups[aliasName];
      if (!group) return;

      setSelectedProperties((prev) => {
        const next = new Set(prev);
        group.properties.forEach((prop) => {
          next.delete(`${aliasName}.${prop.key}`);
        });
        return next;
      });
    },
    [propertyGroups]
  );

  // Select properties by category
  const selectCategory = useCallback(
    (categoryName: string) => {
      const categoryProps = PROPERTY_CATEGORIES[categoryName] || [];
      setSelectedProperties((prev) => {
        const next = new Set(prev);
        Object.entries(propertyGroups).forEach(([aliasName, group]) => {
          group.properties.forEach((prop) => {
            if (categoryProps.includes(prop.key)) {
              next.add(`${aliasName}.${prop.key}`);
            }
          });
        });
        return next;
      });
    },
    [propertyGroups]
  );

  // Toggle group expansion
  const toggleGroupExpansion = useCallback((aliasName: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(aliasName)) {
        next.delete(aliasName);
      } else {
        next.add(aliasName);
      }
      return next;
    });
  }, []);

  // Count selected in a group
  const countSelectedInGroup = useCallback(
    (aliasName: string): number => {
      const group = propertyGroups[aliasName];
      if (!group) return 0;
      return group.properties.filter((prop) =>
        selectedProperties.has(`${aliasName}.${prop.key}`)
      ).length;
    },
    [propertyGroups, selectedProperties]
  );

  const handleSave = () => {
    onSave(Array.from(selectedProperties));
  };

  const handleClearAll = () => {
    setSelectedProperties(new Set());
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Select Return Properties"
      className="return-property-selector-modal"
      overlayClassName="slot-modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="return-property-selector">
        <div className="return-property-header">
          <h3>Select Columns to Return</h3>
          <p className="return-property-subtitle">
            Choose which properties to include in your query results.
            {selectedProperties.size > 0 && (
              <span className="selected-count">
                {" "}
                ({selectedProperties.size} selected)
              </span>
            )}
          </p>
        </div>

        {/* Search and quick actions */}
        <div className="return-property-controls">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="return-property-search"
          />
          <div className="return-property-quick-actions">
            <button
              type="button"
              onClick={handleClearAll}
              className="quick-action-btn"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Category shortcuts */}
        <div className="return-property-categories">
          <span className="category-label">Quick Select:</span>
          {Object.keys(PROPERTY_CATEGORIES).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => selectCategory(category)}
              className="category-btn"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Property groups */}
        <div className="return-property-groups">
          {Object.entries(filteredGroups).map(([aliasName, group]) => {
            const isExpanded = expandedGroups.has(aliasName);
            const selectedCount = countSelectedInGroup(aliasName);
            const totalCount = group.properties.length;

            return (
              <div key={aliasName} className="property-group">
                <div
                  className="property-group-header"
                  onClick={() => toggleGroupExpansion(aliasName)}
                >
                  <span className="expand-icon">{isExpanded ? "▼" : "▶"}</span>
                  <span className="group-name">
                    {aliasName} ({group.alias.AliasType})
                  </span>
                  <span className="group-count">
                    {selectedCount}/{totalCount}
                  </span>
                  <div className="group-actions">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAllInGroup(aliasName);
                      }}
                      className="group-action-btn"
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearAllInGroup(aliasName);
                      }}
                      className="group-action-btn"
                    >
                      None
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="property-list">
                    {group.properties.map((prop) => {
                      const fullKey = `${aliasName}.${prop.key}`;
                      const isSelected = selectedProperties.has(fullKey);

                      return (
                        <label key={prop.key} className="property-item">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProperty(aliasName, prop.key)}
                          />
                          <span className="property-name">
                            {formatPropertyName(prop.key)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="return-property-footer">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="save-btn"
            disabled={selectedProperties.size === 0}
          >
            Save ({selectedProperties.size} columns)
          </button>
        </div>
      </div>
    </Modal>
  );
};
