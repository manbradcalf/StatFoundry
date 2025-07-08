import { useCallback } from 'react';
import { ChunkChain } from '../feature/Chunks/ChunkChain';
import { Chunk } from '../feature/Chunks/Types/Chunk';

interface UseChainOperationsParams {
  chain: ChunkChain;
  setChain: (chain: ChunkChain) => void;
  setQuery: (query: string) => void;
  onEditChunk?: (index: number, chunk: Chunk) => void;
  onInsertMode?: (index: number) => void;
  onFocusSearchBar?: () => void;
}

interface UseChainOperationsReturn {
  editChunk: (index: number) => void;
  insertChunkAt: (index: number) => void;
  removeChunk: (index: number) => void;
  appendChunk: (chunk: Chunk) => void;
  insertChunk: (index: number, chunk: Chunk) => void;
  updateChunkAtIndex: (index: number, chunk: Chunk) => void;
}

export const useChainOperations = ({
  chain,
  setChain,
  setQuery,
  onEditChunk,
  onInsertMode,
  onFocusSearchBar
}: UseChainOperationsParams): UseChainOperationsReturn => {

  // Opens the slot modal to edit an existing chunk at the specified index
  const editChunk = useCallback((index: number) => {
    const chainArray = chain.toArray();
    if (index < 0 || index >= chainArray.length) {
      console.error('Invalid chunk index:', index);
      return;
    }

    const chunkToEdit = chainArray[index];

    // Only editable chunks have slots
    if (chunkToEdit.Slots.length === 0) {
      console.error('Cannot edit chunk with no slots:', chunkToEdit.English);
      return;
    }

    // Create a copy with the original templates restored for editing
    const chunkCopy = {
      ...chunkToEdit,
      English: chunkToEdit.EnglishTemplate!,   // Restore template version
      Cypher: chunkToEdit.CypherTemplate!,     // Restore template version  
      Slots: chunkToEdit.Slots.map((s) => ({ ...s }))  // Keep current values for pre-filling
    };

    onEditChunk?.(index, chunkCopy);
  }, [chain, onEditChunk]);

  // Sets up insertion mode at the specified index
  const insertChunkAt = useCallback((index: number) => {
    onInsertMode?.(index);
    setQuery(''); // Clear query to show all suggestions
    onFocusSearchBar?.(); // Trigger focus
  }, [setQuery, onInsertMode, onFocusSearchBar]);

  // Remove a chunk from the chain at the specified index
  const removeChunk = useCallback((index: number) => {
    const chainArray = chain.toArray();
    if (index < 0 || index >= chainArray.length) return;

    // Rebuild chain without the chunk at the specified index
    const newChain = new ChunkChain();
    chainArray.forEach((chunk, i) => {
      if (i !== index) {
        newChain.append(chunk);
      }
    });

    setChain(newChain);
    newChain.compile();
    setQuery(newChain.English);
  }, [chain, setChain, setQuery]);

  // Append a chunk to the end of the chain
  const appendChunk = useCallback((chunk: Chunk) => {
    const newChain = new ChunkChain();
    chain.toArray().forEach(existingChunk => newChain.append(existingChunk));
    newChain.append(chunk);
    newChain.compile();
    setChain(newChain);
    setQuery(newChain.English);
  }, [chain, setChain, setQuery]);

  // Insert a chunk at a specific index
  const insertChunk = useCallback((index: number, chunk: Chunk) => {
    const newChain = new ChunkChain();
    const chainArray = chain.toArray();
    chainArray.splice(index, 0, chunk);
    chainArray.forEach(existingChunk => newChain.append(existingChunk));
    newChain.compile();
    setChain(newChain);
    setQuery(newChain.English);
  }, [chain, setChain, setQuery]);

  // Update an existing chunk at a specific index
  const updateChunkAtIndex = useCallback((index: number, chunk: Chunk) => {
    const newChain = new ChunkChain();
    const chainArray = chain.toArray();
    chainArray[index] = chunk;
    chainArray.forEach(existingChunk => newChain.append(existingChunk));
    newChain.compile();
    setChain(newChain);
    setQuery(newChain.English);
  }, [chain, setChain, setQuery]);

  return {
    editChunk,
    insertChunkAt,
    removeChunk,
    appendChunk,
    insertChunk,
    updateChunkAtIndex
  };
};