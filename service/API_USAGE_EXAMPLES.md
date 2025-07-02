# StatFoundry API Usage Examples

## Authentication

All protected endpoints require a Bearer token (API key) in the Authorization header:

```bash
Authorization: Bearer your-api-key-here
```

## Available API Keys (Development)

### Admin Key
- **Key**: `admin-dev-key-123` (or set via `STATFOUNDRY_ADMIN_API_KEY` env var)
- **Scopes**: `admin`, `query`, `schema`
- **Rate Limit**: None

### Partner Key  
- **Key**: `partner-dev-key-456` (or set via `STATFOUNDRY_PARTNER_API_KEY` env var)
- **Scopes**: `query`
- **Rate Limit**: 100 requests/hour

## Endpoint Examples

### Health Check (No Auth Required)
```bash
curl http://localhost:8000/api/healthcheck
```

### Get Database Schema (Requires 'schema' scope)
```bash
curl -H "Authorization: Bearer admin-dev-key-123" \
     http://localhost:8000/api/schema
```

### Execute Query (Requires 'query' scope)
```bash
curl -X POST \
     -H "Authorization: Bearer partner-dev-key-456" \
     -H "Content-Type: application/json" \
     -d '{"cypher_query": "MATCH (p:Player) RETURN p.name LIMIT 5"}' \
     http://localhost:8000/api/query
```

### Partner Info (Any valid key)
```bash
curl -H "Authorization: Bearer partner-dev-key-456" \
     http://localhost:8000/api/partner/info
```

## JavaScript Example (ESX Integration)

```javascript
const STATFOUNDRY_API_KEY = 'partner-dev-key-456';
const BASE_URL = 'https://your-statfoundry-api.com';

async function queryStatFoundry(cypherQuery) {
  const response = await fetch(`${BASE_URL}/api/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STATFOUNDRY_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cypher_query: cypherQuery
    })
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  return response.json();
}

// Example usage
queryStatFoundry("MATCH (p:Player {name: 'Patrick Mahomes'}) RETURN p")
  .then(data => console.log(data.result))
  .catch(err => console.error(err));
```

## Error Responses

### Invalid API Key (401)
```json
{
  "detail": "Invalid API key"
}
```

### Insufficient Permissions (403)
```json
{
  "detail": "Insufficient permissions. Required scope: schema"
}
```

## Production Setup

For production, set environment variables:

```bash
export STATFOUNDRY_ADMIN_API_KEY="your-secure-admin-key"
export STATFOUNDRY_PARTNER_API_KEY="your-secure-partner-key"
```

Add more keys to `VALID_API_KEYS` in `config.py` as needed.