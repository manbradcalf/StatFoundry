import React from "react";
import { useSearchContext } from "../contexts/IntegratedSearchContext";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface BreadcrumbChainProps {
  className?: string;
}

interface BreadcrumbItemProps {
  chunk: Chunk;
  index: number;
  isLast: boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ chunk, index, isLast }) => {
  const { editChunk, removeChunk } = useSearchContext();

  const handleEdit = () => {
    editChunk(index);
  };

  const handleRemove = () => {
    removeChunk(index);
  };

  return (
    <div className="breadcrumb-item">
      <span className="breadcrumb-text">{chunk.English}</span>
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
        <button
          className="breadcrumb-remove-button"
          onClick={handleRemove}
          title="Remove chunk"
        >
          ×
        </button>
      </div>
      {!isLast && <span className="breadcrumb-separator">→</span>}
    </div>
  );
};

export const BreadcrumbChain: React.FC<BreadcrumbChainProps> = ({ className = "" }) => {
  const { chain, clearAll, insertChunkAt } = useSearchContext();
  const chainArray = chain.toArray();

  if (chainArray.length === 0) {
    return (
      <div className={`breadcrumb-chain empty ${className}`}>
        <span className="breadcrumb-placeholder">Start building your query...</span>
      </div>
    );
  }

  return (
    <div className="breadcrumb-wrapper">
      <div className={`breadcrumb-chain ${className}`}>
        <div className="breadcrumb-items">
          {chainArray.map((chunk, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <button
                  className="breadcrumb-insert-button"
                  onClick={() => insertChunkAt(index)}
                  title={`Insert chunk before "${chunk.English}"`}
                >
                  +
                </button>
              )}
              <BreadcrumbItem
                chunk={chunk}
                index={index}
                isLast={index === chainArray.length - 1}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="breadcrumb-controls">
          <button
            className="breadcrumb-add-button"
            onClick={() => insertChunkAt(chainArray.length)}
            title="Add chunk"
          >
            +
          </button>
          <button
            className="breadcrumb-clear-button"
            onClick={clearAll}
            title="Clear all"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
