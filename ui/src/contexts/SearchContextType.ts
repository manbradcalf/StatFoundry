import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { Label } from "../feature/Chunks/Enums/Label";
import { Suggestion } from "./Suggestion";

export interface SearchContextType {
  // Core state
  userInput: string;
  chain: ChunkChain;
  shouldFocusSearchBar: boolean;

  // Computed values
  suggestions: Suggestion[];
  builtQuery: ChunkChain | null;
  selectedIndex: number;
  searchResults: any;
  aliasesToReturn: string[]
  isSearching: boolean;
  searchError: string | null;

  // Actions
  setUserInput: (input: string) => void;
  selectSuggestion: (suggestion: Suggestion) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearAll: () => void;
  search: () => void;
  editChunk: (index: number) => void;
  insertChunkAt: (index: number) => void;
  removeChunk: (index: number) => void;
  focusSearchBar: () => void;
  resetFocusFlag: () => void;
}
