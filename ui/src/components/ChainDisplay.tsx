import React from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { ChunkChainItem } from "./ChunkChainItem";

interface ChainDisplayProps {
  title?: string;
}

export const ChainDisplay: React.FC<ChainDisplayProps> = ({
  title = "Current Search",
}) => {
  const { chain, clearAll } = useSearchContext();
  const chainArray = chain.toArray();

  return (
    <div className="chain-display">
      <h4>
        {title} ({chainArray.length} chunks):
      </h4>
      {chainArray.map((chunk, index) => (
        <ChunkChainItem
          key={index}
          chunk={chunk}
          index={index}
        ></ChunkChainItem>
      ))}
      <div className="chain-display-reset-button-container">
        <button
          className="chain-display-reset-button"
          onClick={clearAll}
          title="Reset the chain"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
