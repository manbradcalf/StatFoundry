import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";

export const PlayerGames: React.FC = () => {
  const { playerGames, playerGamesError, isLoadingPlayerGames } =
    usePlayerDetailContext();

  if (playerGamesError) {
    return <div>{playerGamesError}</div>;
  }

  if (isLoadingPlayerGames) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <h2>Games:</h2>
      {JSON.stringify(playerGames, null, 2)}
    </div>
  );
};
