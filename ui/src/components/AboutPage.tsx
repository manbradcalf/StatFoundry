export const AboutPage: React.FC = () => {
  return (
    <div className="faqpage-wrapper">
      <div className="faqpage-question">What is StatFoundry?</div>
      <div className="faqpage-answer">
        <p>
          Unlike most stat websites who give you static pre-built tables,
          StatFoundry allows you to generate your <i>own</i> dynamic tables by
          writing and saving your own custom queries in a user-friendly way.
        </p>
        <p>
          No database, analytics or programming skills needed to get those rare,
          juicy, specific stats.
        </p>
      </div>
    </div>
  );
};
