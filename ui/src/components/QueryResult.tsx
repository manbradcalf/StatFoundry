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
        <strong>English:</strong> {builtQuery.english}
      </div>
      <div className="cypher-query">
        <strong>Cypher:</strong>
        <pre>{builtQuery.cypher}</pre>
      </div>
      <div className="outputs">
        <strong>Outputs:</strong> {builtQuery.aliases.map(alias => alias.name).join(', ')}
      </div>
    </div>
  );
}; 