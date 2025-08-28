import React from "react";
import { config } from "../config";

interface BannerAdProps {
  placement?: "search-results" | "player-detail" | "sidebar";
}

export const BannerAd: React.FC<BannerAdProps> = ({
  placement = "player-detail",
}) => {
  // Don't render ads if disabled in config
  if (!config.showAds) {
    return null;
  }

  // Placeholder for ads - can be re-enabled later
  return (
    <div style={{ 
      margin: "20px 0", 
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f0f0f0",
      minHeight: "90px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "12px",
      color: "#666"
    }}>
      Banner Ad Space ({placement})
    </div>
  );
};
