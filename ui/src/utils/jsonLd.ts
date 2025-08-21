import { PlayerProperties } from "../feature/Chunks/Entities/Player";

interface JsonLdData {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

export function generatePlayerPersonJsonLd(
  player: PlayerProperties,
): JsonLdData {
  const jsonLd: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: player.display_name,
    givenName: player.first_name,
    familyName: player.last_name,
    athlete: true,
    height: player.height ? `${player.height} inches` : undefined,
    birthDate: player.birth_date || undefined,
    jobTitle: player.position || undefined,
  };

  // Add team affiliation if available
  if (player.team_abbr) {
    jsonLd.worksFor = {
      "@type": "SportsTeam",
      name: player.team_abbr,
      sport: "American Football",
      memberOf: {
        "@type": "SportsOrganization",
        name: "National Football League",
        alternateName: "NFL",
      },
    };
  }

  // Add college if available
  if (player.college_name) {
    jsonLd.alumniOf = {
      "@type": "CollegeOrUniversity",
      name: player.college_name,
    };
  }

  // Remove undefined values
  return Object.fromEntries(
    Object.entries(jsonLd).filter(([_, value]) => value !== undefined),
  ) as JsonLdData;
}

export function generateWebsiteJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "StatFoundry",
    alternateName: "StatFoundry NFL Stats",
    url: "https://www.statfoundry.com",
    description:
      "Advanced NFL player statistics search and analysis tool for fantasy football fans",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.statfoundry.com/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    creator: {
      "@type": "Person",
      name: "Ben Medcalf",
      url: "https://www.benmedcalf.com",
    },
    provider: {
      "@type": "Organization",
      name: "Medcalf Software Solutions",
      url: "https://www.medcalfsoftwaresolutions.com",
    },
  };
}

export function generateOrganizationJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "StatFoundry",
    url: "https://www.statfoundry.com",
    description: "NFL statistics analysis platform",
    founder: {
      "@type": "Person",
      name: "Ben Medcalf",
      url: "https://www.benmedcalf.com",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Medcalf Software Solutions",
      url: "https://www.medcalfsoftwaresolutions.com",
    },
  };
}

export function generateBreadcrumbJsonLd(
  breadcrumbs: Array<{ name: string; url: string }>,
): JsonLdData {
  return {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function injectJsonLd(data: JsonLdData | JsonLdData[]): string {
  const jsonData = Array.isArray(data) ? data : [data];
  return JSON.stringify(
    jsonData.length === 1 ? jsonData[0] : jsonData,
    null,
    2,
  );
}
