import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { config } from "../config";
import { PlayerProperties } from "../feature/Chunks/Views/PlayerLabelView";
import { PlayerGameProperties } from "../feature/Chunks/Views/PlayerGameLabelView";
import { PlayerSeasonProperties } from "../feature/Chunks/Views/PlayerSeasonLabelView";

interface PlayerDetailContextType {
  // state
  playerInfo: PlayerProperties | null;
  playerGames: PlayerGameProperties[];
  playerSeasons: PlayerSeasonProperties[];
  isLoadingPlayerInfo: boolean;
  isLoadingPlayerGames: boolean;
  isLoadingPlayerSeasons: boolean;
  isPlayerInfoLoaded: boolean;
  isPlayerGamesLoaded: boolean;
  isPlayerSeasonsLoaded: boolean;
  playerInfoError: string | null;
  playerGamesError: string | null;
  playerSeasonsError: string | null;
  showSeason2000Warning: boolean;

  // actions
  fetchPlayerInfo: (gsisId: string) => Promise<void>;
  fetchPlayerGames: (gsisId: string) => Promise<void>;
  fetchPlayerSeasons: (gsisId: string) => Promise<void>;
  clearPlayerData: () => void;
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
  const [isPlayerInfoLoaded, setIsPlayerInfoLoaded] =
    useState<boolean>(false);
  const [isPlayerGamesLoaded, setIsPlayerGamesLoaded] =
    useState<boolean>(false);
  const [isPlayerSeasonsLoaded, setIsPlayerSeasonsLoaded] =
    useState<boolean>(false);
  const [playerInfoError, setPlayerInfoError] = useState<string | null>(null);
  const [playerGamesError, setPlayerGamesError] = useState<string | null>(null);
  const [playerSeasonsError, setPlayerSeasonsError] = useState<string | null>(
    null,
  );
  const [showSeason2000Warning, setShowSeason2000Warning] =
    useState<boolean>(false);

  const fetchPlayerInfoByGsisId = useCallback(async (gsisId: string) => {
    console.log("fetchPlayerInfoByGsisId called with:", gsisId);
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
      setIsPlayerInfoLoaded(true);
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
    console.log("fetchPlayerGamesByGsisId called with:", gsisId);
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
      setIsPlayerGamesLoaded(true);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch playerGames:", err);
      setPlayerGamesError(errorMessage);
    } finally {
      setIsPlayerGamesLoading(false);
    }
  }, []);

  const fetchPlayerSeasonsByGsisId = useCallback(async (gsisId: string) => {
    console.log("fetchPlayerSeasonsByGsisId called with:", gsisId);
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
      if (
        // if they have a season from 2000, tell the user we dont go further back
        data.filter((x: { ps: PlayerSeasonProperties }) => x.ps.season === 2000)
          .length !== 0
      ) {
        setShowSeason2000Warning(true);
      }
      setPlayerSeasons(data);
      setIsPlayerSeasonsLoaded(true);
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Failed to fetch playerSeasons:", err);
      setPlayerSeasonsError(errorMessage);
    } finally {
      setIsPlayerSeasonsLoading(false);
    }
  }, []);

  const clearPlayerData = useCallback(() => {
    setPlayerGames([]);
    setPlayerSeasons([]);
  }, []);

  const value: PlayerDetailContextType = {
    playerInfo: playerInfo,
    playerGames: playerGames,
    playerSeasons: playerSeasons,
    isLoadingPlayerInfo: isPlayerInfoLoading,
    isLoadingPlayerGames: isPlayerGamesLoading,
    isLoadingPlayerSeasons: isPlayerSeasonsLoading,
    isPlayerInfoLoaded: isPlayerInfoLoaded,
    isPlayerGamesLoaded: isPlayerGamesLoaded,
    isPlayerSeasonsLoaded: isPlayerSeasonsLoaded,
    playerInfoError: playerInfoError,
    playerGamesError: playerGamesError,
    playerSeasonsError: playerSeasonsError,
    showSeason2000Warning: showSeason2000Warning,
    fetchPlayerInfo: fetchPlayerInfoByGsisId,
    fetchPlayerGames: fetchPlayerGamesByGsisId,
    fetchPlayerSeasons: fetchPlayerSeasonsByGsisId,
    clearPlayerData: clearPlayerData,
  };

  return (
    <PlayerDetailContext.Provider value={value}>
      {children}
    </PlayerDetailContext.Provider>
  );
};
