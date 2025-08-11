import React from "react";
import { Link } from "react-router-dom";

export const HelpBar: React.FC = () => {
  return (
    <div className="helpbar-wrapper">
      <Link className="helpbar-text" to="/">
        Search
      </Link>
      <div className="helpbar-divider" />
      <Link className="helpbar-text" to="/video-tutorials">
        Video Tutorials
      </Link>
      <div className="helpbar-divider" />
      <Link className="helpbar-text" to="/faqs">
        FAQs
      </Link>
      <div className="helpbar-divider" />
      <Link className="helpbar-text" to="/stats">
        Stats
      </Link>
      <div className="helpbar-divider" />
      <Link className="helpbar-text" to="/about">
        About
      </Link>
    </div>
  );
};
