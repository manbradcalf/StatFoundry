import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { config } from "../config";

interface PlayerDetailContextType {
  player: any | null;
  isLoading: boolean;
  error: string | null;
  fetchPlayerByGsisId: (gsisId: string) => Promise<void>;
}

const PlayerDetailContext = createContext<PlayerDetailContextType | undefined>(undefined);

export const usePlayerDetailContext = () => {
  const context = useContext(PlayerDetailContext);
  if (!context) {
    throw new Error("usePlayerDetailContext must be used within a PlayerDetailProvider");
  }
  return context;
};

interface PlayerDetailProviderProps {
  children: ReactNode;
}

export const PlayerDetailProvider: React.FC<PlayerDetailProviderProps> = ({ children }) => {
  const [player, setPlayer] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayerByGsisId = useCallback(async (gsisId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.serviceUrl}/api/player/${gsisId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Player not found");
        }
        throw new Error(`Failed to fetch player: ${response.statusText}`);
      }

      const data = await response.json();
      setPlayer(data);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Failed to fetch player:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: PlayerDetailContextType = {
    player,
    isLoading,
    error,
    fetchPlayerByGsisId,
  };

  return (
    <PlayerDetailContext.Provider value={value}>
      {children}
    </PlayerDetailContext.Provider>
  );
};