import React from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { Chunk } from '../feature/Chunks/Types/Chunk';

interface ChainDisplayProps {
  title?: string;
}
export const ChunkItem: React.FC<{chunk: Chunk}> = ({chunk}) => {
  return (
    <div className="chunk-item">
      <strong>{chunk.English}</strong>
      <br />
      <button onClick={()=>{}}>Edit</button>
    </div>
  );
};

export const ChainDisplay: React.FC<ChainDisplayProps> = ({
  title = "Current Chain"
}) => {
  const { chain } = useSearchContext();
  const chainArray = chain.toArray();

  return (
    <div className="chain-debug">
      <h4>{title} ({chainArray.length} chunks):</h4>
      {chainArray.map((chunk, index) => (
        <ChunkItem key={index} chunk={chunk}></ChunkItem>
      ))}
    </div>
  );
}; 