import React from "react";
import { PASSING_STATS } from "../feature/Chunks/Views/PassingStats";
import {
  RECEIVING_STATS,
  RUSHING_STATS,
} from "../feature/Chunks/Views/FlexStats";

// todo: does this get refreshed every time? should we take the stats in as props instead?
export const StatsPage: React.FC = () => {
  const passingStats = PASSING_STATS.map((x) => x.key);
  const rushingStats = RUSHING_STATS.map((x) => x.key);
  const receivingStats = RECEIVING_STATS.map((x) => x.key);

  // Format stat names for display
  const formatStatName = (key: string): string => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace(/Tds/g, "TDs")
      .replace(/Epa/g, "EPA")
      .replace(/2pt/g, "2-Point");
  };
  return (
    <div>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">Available Stats</div>
        <div className="faqpage-answer">
          <p>
            StatFoundry currently supports the following NFL player statistics,
            available for both individual games and full seasons, back to the
            year 2000:
          </p>
        </div>
      </div>

      <div className="faqpage-wrapper">
        <div className="faqpage-question">Passing Stats</div>
        <div className="faqpage-answer">
          <div className="stats-grid">
            {passingStats.map((stat) => (
              <div key={stat} className="stat-item-display">
                {formatStatName(stat)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faqpage-wrapper">
        <div className="faqpage-question">Rushing Stats</div>
        <div className="faqpage-answer">
          <div className="stats-grid">
            {rushingStats.map((stat) => (
              <div key={stat} className="stat-item-display">
                {formatStatName(stat)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faqpage-wrapper">
        <div className="faqpage-question">Receiving Stats</div>
        <div className="faqpage-answer">
          <div className="stats-grid">
            {receivingStats.map((stat) => (
              <div key={stat} className="stat-item-display">
                {formatStatName(stat)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="faqpage-wrapper">
        <div className="faqpage-question">Usage Examples</div>
        <div className="faqpage-answer">
          <p>Try searching for:</p>
          <p>"QB Games with &gt; 300 passing yards"</p>
          <p>"RB Seasons with &gt; 1000 rushing yards"</p>
          <p>"WR Games with &gt; 8 receptions during the 2024 season"</p>
        </div>
      </div>
    </div>
  );
};
