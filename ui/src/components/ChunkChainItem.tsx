import { useSearchContext } from "../contexts/SearchContext";
import { Chunk } from "../feature/Chunks/Types/Chunk";

export const ChunkChainItem: React.FC<{ chunk: Chunk; index: number }> = ({
  chunk,
  index,
}) => {
  const { editChunk } = useSearchContext();
  const handleEdit = () => {
    editChunk(index);
  };

  return (
    <div className="chunk-item">
      <strong>{chunk.English}</strong>
      <br />
      {chunk.Slots.length > 0 && (
        <button className="edit-button" onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
};
