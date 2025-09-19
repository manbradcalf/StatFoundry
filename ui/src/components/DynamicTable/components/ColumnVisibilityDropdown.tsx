import React, { useState, useRef, useEffect } from "react";
import { formatColumnHeader } from "../../../utils/tableUtils";
import { groupColumns, getGroupToggleState } from "../utils/columnGrouping";
import { alwaysVisibleColumns } from "../config";
import { ColumnGroup } from "../types";

interface ColumnVisibilityDropdownProps {
  availableColumns: string[];
  visibleColumns: string[];
  isColumnVisible: (column: string) => boolean;
  toggleColumn: (column: string) => void;
  toggleGroup: (columns: string[]) => void;
  showAllColumns: () => void;
  hideAllNonEssential: () => void;
  resetToDefaults: () => void;
  canHideColumn: (column: string) => boolean;
  columnGroups?: ColumnGroup[];
}

export const ColumnVisibilityDropdown: React.FC<
  ColumnVisibilityDropdownProps
> = ({
  availableColumns,
  visibleColumns,
  isColumnVisible,
  toggleColumn,
  toggleGroup,
  showAllColumns,
  hideAllNonEssential,
  columnGroups,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const groups = groupColumns(availableColumns, columnGroups);
  const visibleCount = visibleColumns.length;
  const totalCount = availableColumns.length;

  // Filter groups and columns based on search term
  const filteredGroups = groups
    .map((group) => {
      const filteredColumns = group.columns.filter(
        (column) =>
          availableColumns.includes(column) &&
          formatColumnHeader(column)
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
      return { ...group, columns: filteredColumns };
    })
    .filter((group) => group.columns.length > 0);

  const handleToggleColumn = (column: string, event: React.MouseEvent) => {
    event.stopPropagation();
    toggleColumn(column);
  };

  const handleToggleGroup = (
    groupColumns: string[],
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    toggleGroup(groupColumns);
  };

  const handleQuickAction = (action: () => void, event: React.MouseEvent) => {
    event.stopPropagation();
    action();
  };

  return (
    <div className="column-visibility-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        type="button"
        className="column-visibility-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Column visibility menu. ${visibleCount} of ${totalCount} columns visible.`}
      >
        <span className="column-visibility-icon">⚏</span>
        <span>Columns</span>
        <span className="column-visibility-count">
          ({visibleCount}/{totalCount})
        </span>
        <span className={`column-visibility-chevron ${isOpen ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="column-visibility-menu" role="menu">
          {/* Quick actions */}
          <div className="column-visibility-actions">
            <button
              type="button"
              className="column-visibility-action-button"
              onClick={(e) =>
                handleQuickAction(
                  visibleCount === totalCount
                    ? hideAllNonEssential
                    : showAllColumns,
                  e,
                )
              }
              role="menuitem"
            >
              Toggle All
            </button>
          </div>

          <div className="column-visibility-divider"></div>

          {/* Search input */}
          <div className="column-visibility-search">
            <input
              type="text"
              placeholder="Search columns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setSearchTerm("");
                }
              }}
              className="column-visibility-search-input"
            />
          </div>

          <div className="column-visibility-divider"></div>

          {/* Column groups */}
          <div className="column-visibility-groups">
            {filteredGroups.map((group) => {
              const groupState = getGroupToggleState(
                group.columns,
                new Set(visibleColumns),
              );
              const availableGroupColumns = group.columns.filter((col) =>
                availableColumns.includes(col),
              );

              return (
                <div key={group.name} className="column-visibility-group">
                  <div className="column-visibility-group-header">
                    <button
                      type="button"
                      className="column-visibility-group-toggle"
                      onClick={(e) =>
                        handleToggleGroup(availableGroupColumns, e)
                      }
                      role="menuitem"
                      aria-label={`Toggle all ${group.label} columns`}
                    >
                      <span
                        className={`column-visibility-group-checkbox ${groupState}`}
                      >
                        {groupState === "all" && "✓"}
                        {groupState === "partial" && "−"}
                      </span>
                      <span className="column-visibility-group-label">
                        {group.label}
                      </span>
                    </button>
                  </div>

                  <div className="column-visibility-group-columns">
                    {availableGroupColumns.map((column) => {
                      const isVisible = isColumnVisible(column);
                      const isAlwaysVisible =
                        alwaysVisibleColumns.includes(column);

                      return (
                        <label
                          key={column}
                          className={`column-visibility-column ${isAlwaysVisible ? "always-visible" : ""}`}
                          role="menuitemcheckbox"
                          aria-checked={isVisible}
                          title={
                            isAlwaysVisible
                              ? "This column cannot be hidden"
                              : `Toggle ${formatColumnHeader(column)}`
                          }
                        >
                          <input
                            type="checkbox"
                            checked={isVisible}
                            disabled={isAlwaysVisible}
                            onChange={(e) =>
                              handleToggleColumn(column, e as any)
                            }
                            aria-label={`${isVisible ? "Hide" : "Show"} ${formatColumnHeader(column)} column`}
                          />
                          <span className="column-visibility-column-checkbox">
                            {isVisible && "✓"}
                          </span>
                          <span className="column-visibility-column-label">
                            {formatColumnHeader(column)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
