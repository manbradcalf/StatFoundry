import React, { useEffect } from "react";

interface BannerAdProps {
  placement?: "search-results" | "player-detail" | "sidebar";
}

export const BannerAd: React.FC<BannerAdProps> = ({ placement = "player-detail" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9761689709275841"
        data-ad-slot="7455192803"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

// Declare global adsbygoogle for TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
