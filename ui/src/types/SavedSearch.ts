import { Timestamp } from "firebase/firestore";
import { Chunk } from "../feature/Chunks/Types/Chunk";

export interface SavedSearch {
  id: string;
  name: string;
  description?: string;
  userId: string;
  chunks: Chunk[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CreateSavedSearchData {
  name: string;
  description?: string;
  chunks: Chunk[];
  cypher: string;
  english: string;
}

