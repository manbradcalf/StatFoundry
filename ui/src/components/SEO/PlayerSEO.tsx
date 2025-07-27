import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Player } from '../../feature/Chunks/Entities/Player';
import { playerToSlug } from '../../utils/playerUtils';

interface PlayerSEOProps {
  player: Player;
}

export const PlayerSEO: React.FC<PlayerSEOProps> = ({ player }) => {
  if (!player || !player.properties) {
    return null;
  }
  
  const { display_name, position, team_abbr, years_of_experience } = player.properties;
  
  const title = `${display_name} Stats & Bio | ${position} | StatFoundry`;
  const description = `View ${display_name}'s NFL statistics, career highlights, and player profile. ${position} for ${team_abbr} with ${years_of_experience} years experience.`;
  const canonicalUrl = `https://statfoundry.com/players/${playerToSlug(player)}`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph for social sharing */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="StatFoundry" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Structured data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": display_name,
          "jobTitle": position,
          "memberOf": {
            "@type": "SportsTeam",
            "name": team_abbr
          }
        })}
      </script>
    </Helmet>
  );
};

