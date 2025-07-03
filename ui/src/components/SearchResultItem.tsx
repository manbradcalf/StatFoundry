export const SearchResultItem: React.FC<{ result: any }> = ({ result }) => {
  const keys = Object.keys(result);
  const otherKeys = keys.filter(key => !key.includes('player_display_name'));

  return (
    <div className="search-result-item">
      {otherKeys.map((key) => (
        <div key={key} className="stat-item">
          <span className="stat-label">{key}</span>
          <span className="stat-value">{result[key]}</span>
        </div>
      ))}
    </div>
  );
};
