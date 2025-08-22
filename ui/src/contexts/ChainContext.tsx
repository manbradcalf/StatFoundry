import React, { createContext, useContext, ReactNode } from "react";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { useChainState } from "../hooks/useChainState";

interface ChainContextType {
  // State
  chain: ReturnType<typeof useChainState>['chain'];
  shouldFocusSearchBar: boolean;

  // Chain operations
  appendChunk: (chunk: Chunk) => void;
  insertChunk: (index: number, chunk: Chunk) => void;
  updateChunkAtIndex: (index: number, chunk: Chunk) => void;
  removeChunk: (index: number) => void;
  clearChain: () => void;
  loadChain: (chain: ReturnType<typeof useChainState>['chain']) => void;

  // Focus management
  focusSearchBar: () => void;
  resetFocusFlag: () => void;

  // Edit operations
  editChunk: (index: number) => void;
  insertChunkAt: (index: number) => void;
}

const ChainContext = createContext<ChainContextType | undefined>(undefined);

export const useChainContext = () => {
  const context = useContext(ChainContext);
  if (!context) {
    throw new Error("useChainContext must be used within a ChainProvider");
  }
  return context;
};

interface ChainProviderProps {
  children: ReactNode;
}

export const ChainProvider: React.FC<ChainProviderProps> = ({ children }) => {
  const chainState = useChainState();

  const value: ChainContextType = {
    // State
    chain: chainState.chain,
    shouldFocusSearchBar: chainState.shouldFocusSearchBar,

    // Chain operations
    appendChunk: chainState.appendChunk,
    insertChunk: chainState.insertChunk,
    updateChunkAtIndex: chainState.updateChunkAtIndex,
    removeChunk: chainState.removeChunk,
    clearChain: chainState.clearAll,
    loadChain: chainState.loadChain,

    // Focus management
    focusSearchBar: chainState.focusSearchBar,
    resetFocusFlag: chainState.resetFocusFlag,

    // Edit operations
    editChunk: chainState.editChunk,
    insertChunkAt: chainState.insertChunkAt,
  };

  return (
    <ChainContext.Provider value={value}>
      {children}
    </ChainContext.Provider>
  );
};