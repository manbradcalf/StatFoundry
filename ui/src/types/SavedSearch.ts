import { Timestamp } from "firebase/firestore";
import { Chunk } from "../feature/Chunks/Types/Chunk";
import { Alias } from "../feature/Chunks/Types/Alias";

export interface SavedSearch {
  id: string;
  name: string;
  description?: string;
  userId: string;
  chunks: Chunk[];
  aliases: Alias[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  cypher: string;
  english: string;
}

export interface CreateSavedSearchData {
  name: string;
  description?: string;
  chunks: Chunk[];
  aliases: Alias[];
  cypher: string;
  english: string;
}
