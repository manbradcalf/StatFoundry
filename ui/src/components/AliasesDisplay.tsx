import React from "react";
import { useChainContext } from "../contexts/ChainContext";
import { useSearchAPIContext } from "../contexts/SearchAPIContext";

export const AliasesDisplay: React.FC = () => {
  const { chain } = useChainContext();
  const { activeAliases, toggleAlias } = useSearchAPIContext();

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
        <span className="aliases-label">Filter Columns by Data Type: </span>
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
                    : `Click to ${isActive ? "hide" : "show"} columns for ${alias.Name} (${alias.AliasType})`
                }
              >
                <span className="alias-type">{alias.AliasType}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
