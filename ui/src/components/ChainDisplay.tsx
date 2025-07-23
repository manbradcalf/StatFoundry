import React from "react";
import { useChainContext } from "../contexts/ChainContext";
import { ChunkChainItem } from "./ChunkChainItem";

interface ChainDisplayProps {
  title?: string;
}

export const ChainDisplay: React.FC<ChainDisplayProps> = ({
  title = "Current Search",
}) => {
  const { chain, clearChain, insertChunkAt } = useChainContext();
  const chainArray = chain.toArray();

  return (
    <div className="chain-display">
      <h4>
        {title} ({chainArray.length} chunks):
      </h4>
      {chainArray.map((chunk, index) => (
        <React.Fragment key={index}>
          <div className="insert-button-container">
            <button
              className="insert-button"
              onClick={() => insertChunkAt(index)}
              title="Insert chunk here"
            >
              ➕
            </button>
          </div>
          <ChunkChainItem
            chunk={chunk}
            index={index}
          ></ChunkChainItem>
        </React.Fragment>
      ))}
      <div className="insert-button-container">
        <button
          className="insert-button"
          onClick={() => insertChunkAt(chainArray.length)}
          title="Add chunk at end"
        >
          ➕
        </button>
      </div>
      <div className="chain-display-reset-button-container">
        <button
          className="chain-display-reset-button"
          onClick={clearChain}
          title="Reset the chain"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
