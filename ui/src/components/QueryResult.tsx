import React from 'react';
import { useSearch } from '../contexts/SearchContext';

export const QueryResult: React.FC = () => {
  const { builtQuery } = useSearch();

  if (!builtQuery) {
    return null;
  }

  return (
    <div className="query-result">
      <h3>Built Query:</h3>
      <div className="english-query">
        <strong>English:</strong> {builtQuery.English}
      </div>
      <div className="cypher-query">
        <strong>Cypher:</strong>
        <pre>{builtQuery.Cypher}</pre>
      </div>
      <div className="outputs">
        <strong>Outputs:</strong> {builtQuery.Aliases.map((alias) => alias[0]).join(', ')}
      </div>
    </div>
  );
}; 