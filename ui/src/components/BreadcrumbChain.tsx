import React from "react";
import { useChainContext } from "../contexts/ChainContext";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircle,
  faShareNodes,
  faFilter,
  faArrowLeft,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useModalContext } from "../contexts/ModalContext";
import { QueryType } from "../feature/Chunks/Enums/QueryType";

interface BreadcrumbChainProps {
  className?: string;
}

interface BreadcrumbItemProps {
  chunk: Chunk;
  index: number;
  isLast: boolean;
}

interface RelationshipPart {
  type: "entity" | "relationship";
  text: string;
  icon: any;
  color: string;
}

/**
 * Parses relationship text like "Player - HAD -> PlayerGame" into separate parts
 */
const parseRelationshipChunk = (text: string): RelationshipPart[] => {
  // Match pattern: "EntityA - RELATIONSHIP -> EntityB"
  const match = text.match(/^(.+?)\s*-\s*(.+?)\s*->\s*(.+)$/);

  if (!match) {
    // Fallback: treat as single relationship part if pattern doesn't match
    return [
      {
        type: "relationship",
        text: text,
        icon: faShareNodes,
        color: "#f97316",
      },
    ];
  }

  const [, fromEntity, relationship, toEntity] = match;

  return [
    {
      type: "entity",
      text: fromEntity.trim(),
      icon: faCircle,
      color: "#10b981",
    },
    {
      type: "relationship",
      text: relationship.trim(),
      icon: faShareNodes,
      color: "#f97316",
    },
    {
      type: "entity",
      text: toEntity.trim(),
      icon: faCircle,
      color: "#10b981",
    },
  ];
};

/**
 * Gets the appropriate icon and CSS class for a chunk's QueryType
 */
const getChunkTypeInfo = (queryType: QueryType) => {
  switch (queryType) {
    case QueryType.MATCH_START:
      return {
        icon: faCircle,
        className: "breadcrumb-icon--entity",
        color: "#10b981", // Green for entities
      };
    case QueryType.JUNCTION:
      return {
        icon: faShareNodes,
        className: "breadcrumb-icon--relationship",
        color: "#f97316", // Orange for relationships
      };
    case QueryType.FILTER:
      return {
        icon: faFilter,
        className: "breadcrumb-icon--filter",
        color: "#3b82f6", // Blue for filters
      };
    case QueryType.RETURN:
      return {
        icon: faArrowLeft,
        className: "breadcrumb-icon--return",
        color: "#8b5cf6", // Purple for return
      };
    default:
      return {
        icon: faPlay,
        className: "breadcrumb-icon--default",
        color: "#6b7280", // Gray for default
      };
  }
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  chunk,
  index,
  isLast,
}) => {
  const modalContext = useModalContext();
  const chunkTypeInfo = getChunkTypeInfo(chunk.QueryType);

  const handleEdit = () => {
    modalContext.openSlotModal(chunk, chunk.Slots, index);
  };

  // Handle relationship chunks by breaking them into parts
  if (chunk.QueryType === QueryType.JUNCTION && chunk.EnglishTemplate) {
    const parts = parseRelationshipChunk(chunk.EnglishTemplate);

    return (
      <>
        {parts.map((part, partIndex) => (
          <React.Fragment key={`${index}-${partIndex}`}>
            <div className="breadcrumb-item">
              <div className="breadcrumb-content">
                <FontAwesomeIcon
                  icon={part.icon}
                  className={`breadcrumb-icon ${part.type === "entity" ? "breadcrumb-icon--entity" : "breadcrumb-icon--relationship"}`}
                  style={{ color: part.color }}
                  size="sm"
                />
                <span className="breadcrumb-text">{part.text}</span>
              </div>
              <div className="breadcrumb-actions">
                {/* Only show edit button on the first part and if chunk has slots */}
                {partIndex === 0 && chunk.Slots.length > 0 && (
                  <button
                    className="breadcrumb-edit-button"
                    onClick={handleEdit}
                    title="Edit chunk"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                )}
              </div>
            </div>
            {/* Add separator after each part except the last one in the last chunk */}
            {!(isLast && partIndex === parts.length - 1) && (
              <span className="breadcrumb-separator">→</span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }

  // Regular chunk rendering
  return (
    <div className="breadcrumb-item">
      <div className="breadcrumb-content">
        <FontAwesomeIcon
          icon={chunkTypeInfo.icon}
          className={`breadcrumb-icon ${chunkTypeInfo.className}`}
          style={{ color: chunkTypeInfo.color }}
          size="sm"
        />
        <span className="breadcrumb-text">{chunk.English}</span>
      </div>
      <div className="breadcrumb-actions">
        {chunk.Slots.length > 0 && (
          <button
            className="breadcrumb-edit-button"
            onClick={handleEdit}
            title="Edit chunk"
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        )}
      </div>
      {!isLast && <span className="breadcrumb-separator">→</span>}
    </div>
  );
};

/**
 * Groups chunks into rows based on entity aliases (data model)
 * Each row represents an entity and the filters applied to it
 * - Row 1: Initial MATCH_START entity + filters applied to it
 * - Row 2+: JUNCTION that introduces new entity + filters applied to that entity
 * - RETURN chunks go on final row
 */
const groupChunksIntoRows = (chunks: Chunk[]): Chunk[][] => {
  if (chunks.length === 0) return [];

  // First pass: create entity rows (non-filter chunks)
  const entityRows: Chunk[][] = [];
  let currentRow: Chunk[] = [];
  let currentEntityAliases: Set<string> = new Set();

  chunks.forEach((chunk) => {
    if (chunk.QueryType === QueryType.FILTER) {
      // Skip filters in first pass - we'll place them correctly in second pass
      return;
    }

    if (chunk.QueryType === QueryType.MATCH_START) {
      // Start with the initial entity
      currentRow.push(chunk);
      // Track the aliases this chunk provides
      chunk.Provides.forEach((alias) => currentEntityAliases.add(alias.Name));
    } else if (chunk.QueryType === QueryType.JUNCTION) {
      // Check if this junction introduces new entities (aliases)
      const newAliases = chunk.Provides.filter(
        (alias) => !currentEntityAliases.has(alias.Name),
      );

      if (newAliases.length > 0) {
        // This junction introduces new entities - start a new row
        if (currentRow.length > 0) {
          entityRows.push([...currentRow]);
        }
        currentRow = [chunk];
        // Update our tracked aliases
        chunk.Provides.forEach((alias) => currentEntityAliases.add(alias.Name));
      } else {
        // This junction doesn't introduce new entities - add to current row
        currentRow.push(chunk);
      }
    } else if (chunk.QueryType === QueryType.RETURN) {
      // Return statements get their own row
      if (currentRow.length > 0) {
        entityRows.push([...currentRow]);
        currentRow = [chunk];
      } else {
        currentRow.push(chunk);
      }
    } else {
      // Other chunk types go with current row
      currentRow.push(chunk);
    }
  });

  // Add final row if it has content
  if (currentRow.length > 0) {
    entityRows.push(currentRow);
  }

  // Second pass: place filters in the correct rows based on what they filter
  const filterChunks = chunks.filter(
    (chunk) => chunk.QueryType === QueryType.FILTER,
  );

  filterChunks.forEach((filterChunk) => {
    // Find which row this filter belongs to by matching required aliases
    const requiredAliasTypes = new Set(
      filterChunk.Requires.map((req) => req.AliasType),
    );

    // Find the row that provides the aliases this filter requires
    let targetRowIndex = -1;
    for (let i = 0; i < entityRows.length; i++) {
      const rowAliasTypes = new Set();
      entityRows[i].forEach((chunk) => {
        chunk.Provides.forEach((alias) => rowAliasTypes.add(alias.AliasType));
      });

      // Check if this row provides all the aliases the filter needs
      const hasAllRequired = Array.from(requiredAliasTypes).every((required) =>
        rowAliasTypes.has(required),
      );

      if (hasAllRequired) {
        targetRowIndex = i;
        break;
      }
    }

    // Add filter to the appropriate row (or last row as fallback)
    if (targetRowIndex >= 0) {
      entityRows[targetRowIndex].push(filterChunk);
    } else if (entityRows.length > 0) {
      entityRows[entityRows.length - 1].push(filterChunk);
    }
  });

  return entityRows;
};

export const BreadcrumbChain: React.FC<BreadcrumbChainProps> = ({
  className = "",
}) => {
  const chainContext = useChainContext();
  const chainArray = chainContext.chain.toArray();

  if (chainArray.length === 0) {
    return (
      <div className={`breadcrumb-chain empty ${className}`}>
        <span className="breadcrumb-placeholder">
          Start building your query...
        </span>
      </div>
    );
  }

  const rows = groupChunksIntoRows(chainArray);

  return (
    <div className="breadcrumb-wrapper">
      <div className={`breadcrumb-chain ${className}`}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="breadcrumb-row">
            <div className="breadcrumb-items">
              {row.map((chunk, chunkIndex) => {
                // Calculate global index for the chunk
                const globalIndex = chainArray.findIndex((c) => c === chunk);
                return (
                  <React.Fragment key={globalIndex}>
                    <BreadcrumbItem
                      chunk={chunk}
                      index={globalIndex}
                      isLast={chunkIndex === row.length - 1}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
