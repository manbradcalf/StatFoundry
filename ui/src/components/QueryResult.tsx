import React from 'react';
import { useSearchContext } from '../contexts/SearchContext';

export const QueryResult: React.FC = () => {
  const { builtQuery } = useSearchContext();

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
        <strong>Outputs:</strong> {builtQuery.Aliases.map((alias) => alias.Name).join(', ')}
      </div>
    </div>
  );
}; 