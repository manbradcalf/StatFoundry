// TODO: we should have a firebaseDatabaseService, not specifically savedSearchService
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { SavedSearch, CreateSavedSearchData } from "../types/SavedSearch";
import { ChunkChain } from "../feature/Chunks/ChunkChain";

const COLLECTION_NAME = "ChunkChains";

export const savedSearchService = {
  /**
   * Save a new search for the current user
   */
  async saveSavedSearch(
    userId: string,
    savedSearchData: CreateSavedSearchData,
  ): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...savedSearchData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  /**
   * Get all saved searches for a user
   */
  async getUserSavedSearches(userId: string): Promise<SavedSearch[]> {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SavedSearch[];
  },

  /**
   * Get a specific saved search by ID
   */
  async getSavedSearchById(savedSearchId: string): Promise<SavedSearch | null> {
    const docRef = doc(db, COLLECTION_NAME, savedSearchId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as SavedSearch;
    }
    return null;
  },

  /**
   * Update an existing saved search
   */
  async updateSavedSearch(
    savedSearchId: string,
    updates: Partial<CreateSavedSearchData>,
  ): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, savedSearchId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Delete a saved search
   */
  async deleteSavedSearch(savedSearchId: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, savedSearchId);
    await deleteDoc(docRef);
  },

  /**
   * Convert a ChunkChain to saveable format
   */
  chainToSaveData(
    chain: ChunkChain,
    name: string,
    description?: string,
  ): CreateSavedSearchData {
    const compiledChain = chain.compile();
    return {
      name,
      description,
      chunks: chain.toArray(),
      cypher: compiledChain.Cypher,
      english: compiledChain.English,
      aliases: compiledChain.Aliases,
    };
  },

  /**
   * Convert saved search data back to ChunkChain
   */
  mapSaveDataToChain(savedSearch: SavedSearch): ChunkChain {
    const chain = new ChunkChain();
    savedSearch.chunks.forEach((chunk) => chain.append(chunk));
    chain.compile();
    return chain;
  },
};
