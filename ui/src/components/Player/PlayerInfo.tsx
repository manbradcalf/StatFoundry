import { usePlayerDetailContext } from "../../contexts/PlayerDetailContext";

export const PlayerInfo: React.FC = () => {
  const { playerInfo, isLoadingPlayerInfo, playerInfoError } =
    usePlayerDetailContext();

  if (playerInfoError) {
    return <div>{playerInfoError}</div>;
  }

  // Loading state - info
  if (isLoadingPlayerInfo) {
    return <div>Loading</div>;
  }
  // Success state - info
  return (
    <div>
      <h1>PlayerInfo</h1>
      <p>{JSON.stringify(playerInfo, null, 2)}</p>
    </div>
  );
};
