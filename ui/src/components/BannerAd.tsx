import React from "react";
import { Adsense } from "@ctrl/react-adsense";
import { config } from "../config";

interface BannerAdProps {
  placement?: "search-results" | "player-detail" | "sidebar";
}

export const BannerAd: React.FC<BannerAdProps> = ({ placement = "player-detail" }) => {
  // Don't render ads if disabled in config
  if (!config.showAds) {
    return null;
  }

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <Adsense
        client="ca-pub-9761689709275841"
        slot="7455192803"
        style={{ display: "block" }}
        format="auto"
        responsive
      />
    </div>
  );
};
