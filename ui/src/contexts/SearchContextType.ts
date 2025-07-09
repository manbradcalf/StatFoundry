import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { AliasType } from "../feature/Chunks/Enums/AliasType";
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
  aliasesToReturn: string[];
  isSearching: boolean;
  searchError: string | null;
  activeAliases: Set<string>;

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
  toggleAlias: (aliasName: string) => void;
}
