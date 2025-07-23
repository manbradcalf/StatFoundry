import { useSearchContext } from "../contexts/IntegratedSearchContext";
import { Chunk } from "../feature/Chunks/Types/Chunk";

export const ChunkChainItem: React.FC<{ chunk: Chunk; index: number }> = ({
  chunk,
  index,
}) => {
  const { editChunk, removeChunk } = useSearchContext();
  const handleEdit = () => {
    editChunk(index);
  };
  const handleRemove = () => {
    removeChunk(index);
  };

  return (
    <div className="chunk-item">
      <strong>{chunk.English}</strong>
      <div className="chunk-actions">
        {chunk.Slots.length > 0 && (
          <button className="edit-button" onClick={handleEdit} title="Edit chunk">
            ✏️
          </button>
        )}
        <button className="remove-button" onClick={handleRemove} title="Remove chunk">
          🗑️
        </button>
      </div>
    </div>
  );
};
