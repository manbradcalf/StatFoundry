import React from "react";
import { useChainContext } from "../contexts/ChainContext";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useModalContext } from "../contexts/ModalContext";

interface BreadcrumbChainProps {
  className?: string;
}

interface BreadcrumbItemProps {
  chunk: Chunk;
  index: number;
  isLast: boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ chunk, index, isLast }) => {
  const modalContext = useModalContext();

  const handleEdit = () => {
    modalContext.openSlotModal(chunk, chunk.Slots, index)
  };

  // const handleRemove = () => {
  //   chainContext.removeChunk(index);
  // };

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
        {/* <button
          className="breadcrumb-remove-button"
          onClick={handleRemove}
          title="Remove chunk"
        >
          ×
        </button> */}
      </div>
      {!isLast && <span className="breadcrumb-separator">→</span>}
    </div>
  );
};

export const BreadcrumbChain: React.FC<BreadcrumbChainProps> = ({ className = "" }) => {
  const chainContext = useChainContext();
  const chainArray = chainContext.chain.toArray();

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
              {/* {index > 0 && (
                <button
                  className="breadcrumb-insert-button"
                  onClick={() => chainContext.insertChunkAt(index)}
                  title={`Insert chunk before "${chunk.English}"`}
                >
                  +
                </button>
              )} */}
              <BreadcrumbItem
                chunk={chunk}
                index={index}
                isLast={index === chainArray.length - 1}
              />
            </React.Fragment>
          ))}
        </div>
        {/* <div className="breadcrumb-controls">
          <button
            className="breadcrumb-add-button"
            onClick={() => chainContext.insertChunkAt(chainArray.length)}
            title="Add chunk"
          >
            +
          </button>
          <button
            className="breadcrumb-clear-button"
            onClick={chainContext.clearChain}
            title="Clear all"
          >
            Clear
          </button>
        </div> */}
      </div>
    </div>
  );
};
