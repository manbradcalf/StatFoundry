import React from "react";
import { useSearchContext } from "../contexts/SearchContext";

export const AliasesDisplay: React.FC = () => {
  const { chain, activeAliases, toggleAlias } = useSearchContext();

  // Don't render if no aliases exist
  if (chain.Aliases.length === 0) {
    return null;
  }

  const isLastActiveAlias = (aliasName: string) => {
    return activeAliases.has(aliasName) && activeAliases.size === 1;
  };

  return (
    <div className="aliases-display">
      <div className="aliases-container">
        <span className="aliases-label">Available entities:</span>
        <div className="aliases-list">
          {chain.Aliases.map((alias, index) => {
            const isActive = activeAliases.has(alias.Name);
            const isLast = isLastActiveAlias(alias.Name);

            return (
              <div
                key={`${alias.Name}-${index}`}
                className={`alias-item ${isActive ? "active" : "inactive"} ${isLast ? "required" : ""}`}
                onClick={() => toggleAlias(alias.Name)}
                title={
                  isLast
                    ? `At least one entity must remain active`
                    : `Click to ${isActive ? "hide" : "show"} columns for ${alias.Name} (${alias.Label})`
                }
              >
                <span className="alias-name">{alias.Name}</span>
                <span className="alias-type">{alias.Label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
