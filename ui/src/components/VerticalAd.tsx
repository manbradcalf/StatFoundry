import React from "react";
import { Adsense } from "@ctrl/react-adsense";
import { config } from "../config";

export const VerticalAd: React.FC = () => {
  // Don't render ads if disabled in config
  if (!config.showAds) {
    return null;
  }

  return (
    <div style={{ margin: "20px 0" }}>
      <Adsense
        client="ca-pub-9761689709275841"
        slot="3178156007"
        style={{
          display: "inline-block",
          width: "160px",
          height: "600px"
        }}
        format=""
      />
    </div>
  );
};