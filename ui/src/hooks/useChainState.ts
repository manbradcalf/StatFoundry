import { useState, useCallback } from "react";
import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { Chunk } from "../feature/Chunks/Types/Chunk";

interface UseChainStateParams {
  onEditChunk?: (index: number, chunk: Chunk) => void;
  onInsertMode?: (index: number) => void;
}

interface UseChainStateReturn {
  // State
  chain: ChunkChain;
  query: string;
  shouldFocusSearchBar: boolean;

  // State setters
  setQuery: (query: string) => void;
  clearAll: () => void;

  // Focus management
  focusSearchBar: () => void;
  resetFocusFlag: () => void;

  // Chain operations
  editChunk: (index: number) => void;
  insertChunkAt: (index: number) => void;
  removeChunk: (index: number) => void;
  appendChunk: (chunk: Chunk) => void;
  insertChunk: (index: number, chunk: Chunk) => void;
  updateChunkAtIndex: (index: number, chunk: Chunk) => void;
}

export const useChainState = ({
  onEditChunk,
  onInsertMode,
}: UseChainStateParams = {}): UseChainStateReturn => {
  const [chain, setChain] = useState(new ChunkChain());
  const [query, setQuery] = useState("");
  const [shouldFocusSearchBar, setShouldFocusSearchBar] = useState(false);

  // Focus management
  const focusSearchBar = useCallback(() => {
    setShouldFocusSearchBar(true);
  }, []);

  const resetFocusFlag = useCallback(() => {
    setShouldFocusSearchBar(false);
  }, []);

  // Clear all state
  const clearAll = useCallback(() => {
    setChain(new ChunkChain());
    setQuery("");
    setShouldFocusSearchBar(false);
  }, []);

  // Shared chain rebuilding logic
  const updateChain = useCallback(
    (modifyFn: (chain: ChunkChain) => ChunkChain) => {
      const newChain = modifyFn(new ChunkChain());
      newChain.compile();
      setChain(newChain);
      setQuery(""); // Always clear search bar
    },
    [],
  );

  // Opens the slot modal to edit an existing chunk at the specified index
  const editChunk = useCallback(
    (index: number) => {
      const chainArray = chain.toArray();
      if (index < 0 || index >= chainArray.length) {
        console.error("Invalid chunk index:", index);
        return;
      }

      const chunkToEdit = chainArray[index];

      // Only editable chunks have slots
      if (chunkToEdit.Slots.length === 0) {
        console.error("Cannot edit chunk with no slots:", chunkToEdit.English);
        return;
      }

      // Create a copy with the original templates restored for editing
      const chunkCopy = {
        ...chunkToEdit,
        English: chunkToEdit.EnglishTemplate!, // Restore template version
        Cypher: chunkToEdit.CypherTemplate!, // Restore template version
        Slots: chunkToEdit.Slots.map((s) => ({ ...s })), // Keep current values for pre-filling
      };

      onEditChunk?.(index, chunkCopy);
    },
    [chain, onEditChunk],
  );

  // Sets up insertion mode at the specified index
  const insertChunkAt = useCallback(
    (index: number) => {
      onInsertMode?.(index);
      setQuery(""); // Clear query to show all suggestions
      focusSearchBar(); // Trigger focus
    },
    [onInsertMode, focusSearchBar],
  );

  // Remove a chunk from the chain at the specified index
  const removeChunk = useCallback(
    (index: number) => {
      const chainArray = chain.toArray();
      if (index < 0 || index >= chainArray.length) return;

      updateChain((newChain) => {
        chainArray.forEach((chunk, i) => {
          if (i !== index) {
            newChain.append(chunk);
          }
        });
        return newChain;
      });
    },
    [chain, updateChain],
  );

  // Append a chunk to the end of the chain
  const appendChunk = useCallback(
    (chunk: Chunk) => {
      updateChain((newChain) => {
        chain
          .toArray()
          .forEach((existingChunk) => newChain.append(existingChunk));
        newChain.append(chunk);
        return newChain;
      });
    },
    [chain, updateChain],
  );

  // Insert a chunk at a specific index
  const insertChunk = useCallback(
    (index: number, chunk: Chunk) => {
      updateChain((newChain) => {
        const chainArray = [...chain.toArray()];
        chainArray.splice(index, 0, chunk);
        chainArray.forEach((existingChunk) => newChain.append(existingChunk));
        return newChain;
      });
    },
    [chain, updateChain],
  );

  // Update an existing chunk at a specific index
  const updateChunkAtIndex = useCallback(
    (index: number, chunk: Chunk) => {
      updateChain((newChain) => {
        const chainArray = [...chain.toArray()];
        chainArray[index] = chunk;
        chainArray.forEach((existingChunk) => newChain.append(existingChunk));
        return newChain;
      });
    },
    [chain, updateChain],
  );

  return {
    // State
    chain,
    query,
    shouldFocusSearchBar,

    // State setters
    setQuery,
    clearAll,

    // Focus management
    focusSearchBar,
    resetFocusFlag,

    // Chain operations
    editChunk,
    insertChunkAt,
    removeChunk,
    appendChunk,
    insertChunk,
    updateChunkAtIndex,
  };
};
