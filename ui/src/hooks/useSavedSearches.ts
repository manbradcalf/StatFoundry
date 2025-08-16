import { useState, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { savedSearchService } from "../services/savedSearchService";
import { SavedSearch } from "../types/SavedSearch";
import { ChunkChain } from "../feature/Chunks/ChunkChain";

export const useSavedSearches = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveSavedSearch = useCallback(
    async (
      chain: ChunkChain,
      name: string,
      description?: string,
    ): Promise<string | null> => {
      if (!user) {
        setError("User must be logged in to save searches");
        return null;
      }

      if (chain.toArray().length === 0) {
        setError("Cannot save empty search");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("Starting save process for:", { name, description });
        
        const savedSearchData = savedSearchService.chainToSaveData(
          chain,
          name,
          description,
        );
        
        console.log("About to save to Firebase with data:", savedSearchData);
        
        const savedSearchId = await savedSearchService.saveSavedSearch(
          user.uid,
          savedSearchData,
        );
        
        console.log("Save completed successfully with ID:", savedSearchId);
        return savedSearchId;
      } catch (err) {
        console.error("Save failed with error:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to save search";
        console.error("Setting error message:", errorMessage);
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const loadSavedSearch = useCallback(
    async (savedSearchId: string): Promise<ChunkChain | null> => {
      setLoading(true);
      setError(null);

      try {
        const savedSearch =
          await savedSearchService.getSavedSearchById(savedSearchId);
        if (!savedSearch) {
          setError("Search not found");
          return null;
        }

        // Check if user owns this search
        if (user && savedSearch.userId !== user.uid) {
          setError("Access denied");
          return null;
        }

        return savedSearchService.mapSaveDataToChain(savedSearch);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load search");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  const getUserSavedSearches = useCallback(async (): Promise<SavedSearch[]> => {
    if (!user) {
      setError("User must be logged in");
      return [];
    }

    setLoading(true);
    setError(null);

    try {
      return await savedSearchService.getUserSavedSearches(user.uid);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load searches");
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deleteSavedSearch = useCallback(
    async (savedSearchId: string): Promise<boolean> => {
      setLoading(true);
      setError(null);

      try {
        await savedSearchService.deleteSavedSearch(savedSearchId);
        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete search",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    saveSavedSearch,
    loadSavedSearch,
    getUserSavedSearches,
    deleteSavedSearch,
    loading,
    error,
    clearError: () => setError(null),
  };
};
