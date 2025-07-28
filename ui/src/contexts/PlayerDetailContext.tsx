import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { config } from "../config";

interface PlayerDetailContextType {
  player: any | null;
  playerGames: [] | null
  playerSeasons: [] | null
  isLoadingPlayerInfo: boolean;
  isLoadingPlayerGames: boolean;
  isLoadingPlayerSeasons: boolean;
  error: string | null;
  fetchPlayerInfo: (gsisId: string) => Promise<void>;
  fetchPlayerGames: (gsisId: string) => Promise<void>;
  fetchPlayerSeasons: (gsisId: string) => Promise<void>;
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
  const [playerGames, setPlayerGames] = useState<any | null>(null)
  const [playerSeasons, setPlayerSeasons] = useState<any | null>(null)
  const [isPlayerInfoLoading, setIsLoading] = useState<boolean>(false);
  const [isPlayerGamesLoading, setIsPlayerGamesLoading] = useState<boolean>(false);
  const [isPlayerSeasonsLoading, setIsPlayerSeasonsLoading] = useState<boolean>(false);
  const [playerInfoError, setPlayerInfoError] = useState<string | null>(null);

  const fetchPlayerByGsisId = useCallback(async (gsisId: string) => {
    setIsLoading(true);
    setPlayerInfoError(null);

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
      setPlayerInfoError(errorMessage);
      console.error("Failed to fetch player:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);


  const fetchPlayerGamesByGsisId = useCallback(async (gsisId: string) => {
    setIsPlayerGamesLoading(true);
    setPlayerInfoError(null)

    try {
      const response = await fetch(`${config.serviceUrl}/api/player/${gsisId}/games`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("PlayerGames not found!")
        }
        throw new Error(`Failed to fetch player: ${response.statusText}`)
      }

      const data = await response.json();
      setPlayerGames(data);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch playerGames:", err)
      setPlayerInfoError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchPlayerSeasonsByGsisId = useCallback(async (gsisId: string) => {
    setIsPlayerSeasonsLoading(true);
    setPlayerInfoError(null)

    try {
      const response = await fetch(`${config.serviceUrl}/api/player/${gsisId}/seasons`)

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("PlayerGames not found!")
        }
        throw new Error(`Failed to fetch player: ${response.statusText}`)
      }

      const data = await response.json();
      setPlayerSeasons(data);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch playerSeasons:", err)
      setPlayerInfoError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const value: PlayerDetailContextType = {
    player,
    playerGames,
    playerSeasons,
    isLoadingPlayerInfo: isPlayerInfoLoading,
    isLoadingPlayerGames: isPlayerGamesLoading,
    isLoadingPlayerSeasons: isPlayerSeasonsLoading,
    error: playerInfoError,
    fetchPlayerInfo: fetchPlayerByGsisId,
    fetchPlayerGames: fetchPlayerGamesByGsisId,
    fetchPlayerSeasons: fetchPlayerSeasonsByGsisId,
  };

  return (
    <PlayerDetailContext.Provider value={value}>
      {children}
    </PlayerDetailContext.Provider>
  );
};
