import React from "react";
import { Link } from "react-router-dom";

export const FAQPage: React.FC = () => {
  return (
    <div>
      <div className="faqpage-wrapper">
        <div className="faqpage-question">How do I start?</div>
        <div className="faqpage-answer">
          <p>
            Watch our <Link to="/video-tutorials">video tutorials</Link>
          </p>
          <p>
            Read our <Link to="/stats">stats dictionary</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
