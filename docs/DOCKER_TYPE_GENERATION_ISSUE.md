# Docker Build Type Generation Issue

## Problem Summary

StatFoundry's Docker build fails when running `npm run build` because the `generate-types` script tries to connect to `http://localhost:8000` to fetch the API schema, but the FastAPI service doesn't exist during Docker build time.

## Root Cause

The UI build process (`ui/package.json:31`):
```json
"build": "npm run generate-types && npm run generate-chunks && react-scripts build"
```

The `generate-types` script (`ui/scripts/generateReturnTypes.js`) fetches the Neo4j schema from the FastAPI service to generate TypeScript interfaces for the frontend.

**Build-time vs Runtime problem:**
- **Docker build phase**: Creates static files (HTML/JS/CSS) - no services running
- **Docker runtime phase**: Container runs both nginx (serving UI) and FastAPI (serving API)

The type generation needs a live API, but it runs during build when no API exists.

## Error Output

```
> npm run generate-types && npm run generate-chunks && react-scripts build

> statfoundry-ui@0.1.0 generate-types
> node scripts/generateReturnTypes.js

= Fetching schema from API for type generation...
> isCI: false
< Environment: Development
= API URL: http://localhost:8000
L Error generating types: connect ECONNREFUSED ::1:8000
```

## Why Docker Compose Can't Solve This

Docker Compose orchestrates **runtime** dependencies (service A needs service B *running*), not **build-time** dependencies (building image A needs service B *running*).

The Docker build happens *before* containers start:
```
docker-compose up --build
  └─> docker build (type generation fails here - no API exists)
      └─> docker-compose starts containers (API would be available here)
```

## Attempted Solution: Point to Production API

**Idea:** Use `REACT_APP_SERVICE_URL` build arg to point to production Azure API during build.

**Problem discovered:** React's `REACT_APP_*` variables are baked into the JavaScript bundle at build time. Setting `REACT_APP_SERVICE_URL=https://production-api.com` during build would:
- ✅ Allow type generation to fetch schema from production
- ❌ Hardcode production URL into the built JavaScript
- ❌ Break runtime API calls (UI would call production instead of container's local API at `/api/...`)

This creates a conflict:
- **Build time**: Need to hit `https://azure-api.com`
- **Runtime**: Need to hit `/api/...` (relative path, proxied by nginx to `localhost:8000`)

## Potential Solutions (Not Yet Implemented)

### Option 1: Commit Generated Types to Git
```bash
# Developer runs locally with API running:
npm run generate-types
git add src/feature/Chunks/Views/*.ts
git commit -m "Update generated types"

# Docker build:
npm run build  # Uses already-generated types
```

**Pros:**
- Simple, no build-time API dependency
- Types are versioned alongside code

**Cons:**
- Generated files in git (somewhat verbose)
- Requires manual regeneration when schema changes

### Option 2: Graceful Degradation
```javascript
// scripts/generateReturnTypes.js
try {
  const schema = await fetch('http://localhost:8000/api/schema');
  generateTypes(schema);
} catch (error) {
  console.log('⚠️  API not available, using existing types');
  // Don't fail the build
  process.exit(0);
}
```

**Pros:**
- Build works with or without API
- Uses latest types when available, falls back gracefully

**Cons:**
- Silently uses stale types if API unavailable
- Need to ensure fallback types exist

### Option 3: Separate Build Scripts
```json
// package.json
"build": "npm run generate-types && npm run generate-chunks && react-scripts build",
"build:docker": "react-scripts build"  // Skip type generation
```

**Pros:**
- Clean separation of local vs Docker builds

**Cons:**
- Docker builds don't get latest types
- Requires manual type generation before Docker build

### Option 4: Generate from OpenAPI Spec File
Instead of fetching schema from live API, generate types from a committed OpenAPI spec file.

**Pros:**
- No runtime dependency
- Spec file serves as documentation

**Cons:**
- Need to keep spec file in sync with API
- Requires refactoring type generation script

## Current Status

**Shelved** - No implementation chosen yet. The Docker build issue remains unresolved.

## Files Involved

- `ui/scripts/generateReturnTypes.js` - Type generation script
- `ui/package.json:31` - Build script that calls generate-types
- `Dockerfile` - Multi-stage build configuration
- `docker-compose.yml` - Orchestration config

## Related Architectural Notes

The `generateReturnTypes.js` script already has environment detection:
```javascript
const isCI = process.env.CI === "true";
const baseUrl = isCI
  ? process.env.REACT_APP_SERVICE_URL
  : "http://localhost:8000";
```

This was designed for CI/CD where the API URL is different, but doesn't solve the Docker build problem since Docker builds also need the API running.
