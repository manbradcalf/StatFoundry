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
      <small>Cypher: {chunk.Cypher}</small>
      <br />
      <small>Inputs: [{chunk.Inputs.map((input) => `${input.Name}<${input.Label}>`).join(', ')}]</small>
      <br />
      <small>Outputs: [{chunk.Outputs.map((output) => `${output.Name}<${output.Label}>`).join(', ')}]</small>
      <br />
      <small>Slots: [{chunk.Slots.map((slot) => `${slot.Name}<${slot.Value}>`).join(', ')}]</small>
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
      <small>Aliases: [{chain.Aliases.map((alias) => alias.Name).join(', ')}]</small>
      <br />
      <small>cypher: {chain.Cypher}</small>
      {chainArray.map((chunk, index) => (
        <ChunkItem key={index} chunk={chunk}></ChunkItem>
      ))}
    </div>
  );
}; 