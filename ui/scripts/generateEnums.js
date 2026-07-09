const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

// Cardinality guard: a property is treated as an enumerable (dropdown) only if
// it has at most this many distinct non-null values. We query LIMIT (MAX+1) and
// skip anything that hits the cap (names/ids/continuous columns).
const MAX_ENUM_VALUES = 50;

// String properties are the categorical candidates. A handful of numeric columns
// are enumerable too (small fixed domains) and are opted in by name here.
const NUMERIC_ENUM_ALLOWLIST = new Set(["season", "week"]);

// Open-ended entity columns (players, coaches, venue ids) are NOT closed
// categoricals: their true domain is unbounded, and their *observed* distinct
// count only dips under MAX_ENUM_VALUES when few rows are loaded. Cardinality
// alone would then wrongly promote them to dropdowns (a <select> of "whatever
// happens to be loaded", unable to express any other value). Exclude them by
// name regardless of type — these belong to a name->id autocomplete, not here.
const ENUM_DENY_PATTERNS = [
  /player_id$/,
  /player_name$/,
  /_id$/,
  /coach$/,
];

function isDeniedProperty(name) {
  return ENUM_DENY_PATTERNS.some((re) => re.test(name));
}

// Every team column shares ONE fixed domain. Hardcoded (not probed) because the
// NFL adds a team roughly once a decade — cheaper to edit this list by hand than
// to scan the DB on every build. Includes relocated franchises (OAK/SD/STL) so
// historical rows are filterable; JAX only (JAC is an ETL dupe).
const NFL_TEAMS = [
  "ARI", "ATL", "BAL", "BUF", "CAR", "CHI", "CIN", "CLE", "DAL", "DEN",
  "DET", "GB", "HOU", "IND", "JAX", "KC", "LA", "LAC", "LV", "MIA",
  "MIN", "NE", "NO", "NYG", "NYJ", "OAK", "PHI", "PIT", "SD", "SEA",
  "SF", "STL", "TB", "TEN", "WAS",
];

function isTeamProperty(name) {
  return /team$/.test(name) || name === "team_abbr";
}

// How many DISTINCT queries to run against the backend at once.
const CONCURRENCY = 6;

function cleanLabel(label) {
  return label.replace(/[:`]/g, "");
}

function fetchSchema(baseUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL("/api/schema", baseUrl);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname,
      method: "GET",
    };
    const requestModule = url.protocol === "https:" ? https : http;
    const req = requestModule.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error("Invalid JSON response from /api/schema"));
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

function postQuery(baseUrl, cypher) {
  return new Promise((resolve, reject) => {
    const url = new URL("/api/query", baseUrl);
    const body = JSON.stringify({ cypher_query: cypher });
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: url.pathname,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };
    const requestModule = url.protocol === "https:" ? https : http;
    const req = requestModule.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Invalid JSON response from /api/query for: ${cypher}`));
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function isEnumCandidate(prop) {
  if (isDeniedProperty(prop.name)) return false;
  if (prop.type === "String") return true;
  if (NUMERIC_ENUM_ALLOWLIST.has(prop.name)) return true;
  return false;
}

// Run tasks with a bounded concurrency pool.
async function runPool(items, worker, concurrency) {
  const results = [];
  let cursor = 0;
  async function runner() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
    }
  }
  const runners = [];
  for (let i = 0; i < Math.min(concurrency, items.length); i++) {
    runners.push(runner());
  }
  await Promise.all(runners);
  return results;
}

async function generateEnums() {
  const isCI = process.env.CI === "true";
  const baseUrl = isCI
    ? process.env.REACT_APP_SERVICE_URL
    : "http://localhost:8000";

  console.log("Fetching schema for enum generation...");
  console.log(`Environment: ${isCI ? "CI" : "Development"} | API URL: ${baseUrl}`);

  const schema = await fetchSchema(baseUrl);

  // Build the flat list of (label, property) candidates to probe.
  const candidates = [];
  schema.nodes.forEach((node) => {
    const label = cleanLabel(node.label);
    (node.properties || []).forEach((prop) => {
      if (prop && prop.name && isEnumCandidate(prop)) {
        candidates.push({ label, property: prop.name });
      }
    });
  });

  console.log(
    `Probing ${candidates.length} candidate properties (distinct-count <= ${MAX_ENUM_VALUES})...`,
  );

  const catalog = {};
  let kept = 0;

  await runPool(
    candidates,
    async ({ label, property }) => {
      const cypher =
        `MATCH (n:\`${label}\`) WHERE n.\`${property}\` IS NOT NULL ` +
        `RETURN DISTINCT n.\`${property}\` AS v ORDER BY v LIMIT ${MAX_ENUM_VALUES + 1}`;
      let rows;
      try {
        rows = await postQuery(baseUrl, cypher);
      } catch (e) {
        console.warn(`  ! Skipped ${label}.${property}: ${e.message}`);
        return;
      }
      if (!Array.isArray(rows)) return; // e.g. an error object
      // Over the cap => high-cardinality (names/ids) => not a dropdown.
      if (rows.length === 0 || rows.length > MAX_ENUM_VALUES) return;

      // DISTINCT dedupes on the DB's native types; different types that share a
      // string form (e.g. integer 1 and string "1") survive as separate rows and
      // must be re-deduped after String() to avoid duplicate <option>s.
      const values = [
        ...new Set(
          rows
            .map((r) => r.v)
            .filter(
              (v) => v !== null && v !== undefined && String(v).trim() !== "",
            )
            .map((v) => String(v)),
        ),
      ];
      if (values.length === 0) return;

      catalog[`${label}.${property}`] = values;
      kept++;
      console.log(`  + ${label}.${property} (${values.length})`);
    },
    CONCURRENCY,
  );

  // Overwrite every team column with the fixed NFL_TEAMS list.
  Object.keys(catalog).forEach((key) => {
    if (isTeamProperty(key.split(".").pop())) catalog[key] = NFL_TEAMS;
  });

  // Sort keys for stable, diff-friendly output.
  const sorted = {};
  Object.keys(catalog)
    .sort()
    .forEach((k) => (sorted[k] = catalog[k]));

  const outDir = path.join(__dirname, "../src/feature/Chunks/Data");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "generated-enums.json");
  fs.writeFileSync(outPath, JSON.stringify(sorted, null, 2) + "\n", "utf8");

  console.log(
    `Generated enum catalog: ${kept} enumerable properties -> ${outPath}`,
  );
}

if (require.main === module) {
  generateEnums().catch((error) => {
    console.error("Error generating enums:", error.message);
    process.exit(1);
  });
}

module.exports = { generateEnums };
