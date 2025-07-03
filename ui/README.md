# StatFoundry UI

React frontend application for testing the chunk-based query building system.

## Features

- **Smart Search Bar**: Type to search for query chunks with autocomplete
- **Chunk Chaining**: Build complex queries by selecting suggested chunks
- **Real-time Query Building**: See the English description and Cypher query update as you build
- **Keyboard Navigation**: Use arrow keys and Enter to navigate suggestions

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

## Development

Run the development server:

```bash
npm start
```

The application will be available at <http://localhost:3000>

## How to Use

1. Start typing in the search bar (e.g., "Receivers who")
2. Select from the dropdown suggestions
3. Continue building your query by typing more (e.g., "caught at least")
4. Watch as the system builds both English and Cypher queries automatically
5. Use the clear button (×) to start over

## Example Flow

1. Type "Receivers" → Select "Receivers who"
2. Type "caught" → Select "caught at least {receptions} receptions"
3. Type "broadcast" → Select "broadcast on NBC"
4. See the final query: "Receivers who caught at least 5 receptions broadcast on NBC"

## Building for Production

```bash
npm run build
```

This will create a production build in the `build` directory.
