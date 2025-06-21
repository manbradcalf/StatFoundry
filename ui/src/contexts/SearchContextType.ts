import { ChunkChain } from "../feature/Chunks/ChunkChain";
import { Suggestion } from "./Suggestion";

export interface SearchContextType {
  // Core state
  userInput: string;
  chain: ChunkChain;

  // Computed values
  suggestions: Suggestion[];
  builtQuery: ChunkChain | null;
  selectedIndex: number;

  // Actions
  setUserInput: (input: string) => void;
  selectSuggestion: (suggestion: Suggestion) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  clearAll: () => void;
}
