
type PlayerInfo = {
  gsisId: string
}
export const PlayerInfo: React.FC<PlayerInfo> = ({ gsisId: gsisId }) => {

  // Success state - info
  return (
    <div>
      <h1>PlayerInfo</h1>
      <p>{gsisId}</p>
    </div>
  );
}
