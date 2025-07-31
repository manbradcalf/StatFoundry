import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { config } from "../config";
import { PlayerProperties } from "../feature/Chunks/Entities/Player";
import { PlayerGameProperties } from "../feature/Chunks/Entities/PlayerGame";
import { PlayerSeasonProperties } from "../feature/Chunks/Entities/PlayerSeason";

interface PlayerDetailContextType {
  // state
  playerInfo: PlayerProperties | null;
  playerGames: PlayerGameProperties[];
  playerSeasons: PlayerSeasonProperties[];
  isLoadingPlayerInfo: boolean;
  isLoadingPlayerGames: boolean;
  isLoadingPlayerSeasons: boolean;
  playerInfoError: string | null;
  playerGamesError: string | null;
  playerSeasonsError: string | null;

  // actions
  fetchPlayerInfo: (gsisId: string) => Promise<void>;
  fetchPlayerGames: (gsisId: string) => Promise<void>;
  fetchPlayerSeasons: (gsisId: string) => Promise<void>;
}

const PlayerDetailContext = createContext<PlayerDetailContextType | undefined>(
  undefined,
);

export const usePlayerDetailContext = () => {
  const context = useContext(PlayerDetailContext);
  if (!context) {
    throw new Error(
      "usePlayerDetailContext must be used within a PlayerDetailProvider",
    );
  }
  return context;
};

interface PlayerDetailProviderProps {
  children: ReactNode;
}

export const PlayerDetailProvider: React.FC<PlayerDetailProviderProps> = ({
  children,
}) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerProperties | null>(null);
  const [playerGames, setPlayerGames] = useState<PlayerGameProperties[]>([]);
  const [playerSeasons, setPlayerSeasons] = useState<PlayerSeasonProperties[]>(
    [],
  );
  const [isPlayerInfoLoading, setIsPlayerInfoLoading] =
    useState<boolean>(false);
  const [isPlayerGamesLoading, setIsPlayerGamesLoading] =
    useState<boolean>(false);
  const [isPlayerSeasonsLoading, setIsPlayerSeasonsLoading] =
    useState<boolean>(false);
  const [playerInfoError, setPlayerInfoError] = useState<string | null>(null);
  const [playerGamesError, setPlayerGamesError] = useState<string | null>(null);
  const [playerSeasonsError, setPlayerSeasonsError] = useState<string | null>(
    null,
  );

  const fetchPlayerInfoByGsisId = useCallback(async (gsisId: string) => {
    setIsPlayerInfoLoading(true);
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

      // since we are fetching by gsisId, we shouldnt every have duplicate players returned
      // so we should update the api to return a single player object
      // data returned as [{p: {display_name: "..." ,...},...}]
      setPlayerInfo(data[0].p);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setPlayerInfoError(errorMessage);
      console.error("Failed to fetch player:", err);
    } finally {
      setIsPlayerInfoLoading(false);
    }
  }, []);

  const fetchPlayerGamesByGsisId = useCallback(async (gsisId: string) => {
    setIsPlayerGamesLoading(true);
    setPlayerGamesError(null);

    try {
      const response = await fetch(
        `${config.serviceUrl}/api/player/${gsisId}/games`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("PlayerGames not found!");
        }
        throw new Error(`Failed to fetch player: ${response.statusText}`);
      }

      const data = await response.json();
      setPlayerGames(data);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch playerGames:", err);
      setPlayerInfoError(errorMessage);
    } finally {
      setIsPlayerGamesLoading(false);
    }
  }, []);

  const fetchPlayerSeasonsByGsisId = useCallback(async (gsisId: string) => {
    setIsPlayerSeasonsLoading(true);
    setPlayerSeasonsError(null);

    try {
      const response = await fetch(
        `${config.serviceUrl}/api/player/${gsisId}/seasons`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("PlayerGames not found!");
        }
        throw new Error(`Failed to fetch player: ${response.statusText}`);
      }

      const data = await response.json();
      setPlayerSeasons(data);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch playerSeasons:", err);
      setPlayerSeasonsError(errorMessage);
    } finally {
      setIsPlayerSeasonsLoading(false);
    }
  }, []);

  const value: PlayerDetailContextType = {
    playerInfo: playerInfo,
    playerGames: playerGames,
    playerSeasons: playerSeasons,
    isLoadingPlayerInfo: isPlayerInfoLoading,
    isLoadingPlayerGames: isPlayerGamesLoading,
    isLoadingPlayerSeasons: isPlayerSeasonsLoading,
    playerInfoError: playerInfoError,
    playerGamesError: playerGamesError,
    playerSeasonsError: playerSeasonsError,
    fetchPlayerInfo: fetchPlayerInfoByGsisId,
    fetchPlayerGames: fetchPlayerGamesByGsisId,
    fetchPlayerSeasons: fetchPlayerSeasonsByGsisId,
  };

  return (
    <PlayerDetailContext.Provider value={value}>
      {children}
    </PlayerDetailContext.Provider>
  );
};
