# StatFoundry Hook Refactor Plan

## Executive Summary

**Goal**: Refactor the chunk-related hooks to eliminate code duplication, improve performance, and create a more maintainable architecture.

**Risk Level**: VERY LOW - All changes contained within `SearchContext.tsx`, zero component changes required.

**Current Status**: Tests failing, need regression test suite before refactoring.

---

## Current State Analysis

### Hook Issues Identified

#### 🔴 **useSuggestionEngine** (Major Issues)
- **Duplicate Logic**: `suggestions` useMemo and `showNextSuggestions` do identical work
- **Unnecessary State**: `chainSuggestions` + useEffect just duplicates useMemo logic  
- **Over-engineered**: `contextChain` memoization for insertion mode too complex
- **Dead Code**: `getUserInput()` function just returns `query.trim()`
- **Inconsistent Behavior**: Different Fuse usage patterns

#### 🟡 **useChainOperations** (Moderate Issues)  
- **Massive Duplication**: `appendChunk`, `insertChunk`, `updateChunkAtIndex` nearly identical
- **Repeated Patterns**: `newChain = new ChunkChain()` → `forEach/splice` → `compile()` → `setChain()` → `setQuery("")`
- **Inefficient**: Converting to array, modifying, rebuilding vs using ChunkChain methods
- **Inconsistent Validation**: Some functions validate, others don't

#### 🔴 **useFocusManagement** (Over-engineered)
- **Unnecessary Abstraction**: 25 lines for simple boolean state toggle
- **Single Use**: Only used in SearchContext  
- **No Complex Logic**: No side effects or complex state transitions

#### 🟡 **useSearchAPI** (Minor Issues)
- **Debug Code**: console.log statements should be removed
- **Basic Error Handling**: Generic "HTTP error" messages  
- **Missing Cancellation**: No AbortController for request cleanup

#### 🟢 **useSuggestionSelection** (Good)
- Well-structured, focused, minimal optimization needed

---

## New Architecture Design

### Proposed Hook Structure

```
Current (5 hooks):                    Proposed (4 hooks):
├── useSuggestionEngine (complex)  →  ├── useChainState (combined)
├── useChainOperations (duplicate)  ↗  ├── useSuggestions (simplified)  
├── useFocusManagement (trivial)   ↗   ├── useSearchAPI (enhanced)
├── useSuggestionSelection (good)   →  └── useKeyboardNavigation (extracted)
└── useSearchAPI (basic)           ↗
```

### New Hook Responsibilities

#### **useChainState** (Combines useChainOperations + useFocusManagement)
**Why Combine**: Chain operations and UI state are tightly coupled

```typescript
const useChainState = () => {
  const [chain, setChain] = useState(new ChunkChain());
  const [query, setQuery] = useState("");
  const [shouldFocusSearchBar, setShouldFocusSearchBar] = useState(false);

  // Shared chain rebuilding logic
  const updateChain = (modifyFn: (chain: ChunkChain) => ChunkChain) => {
    const newChain = modifyFn(chain.clone());
    newChain.compile();
    setChain(newChain);
    setQuery(""); // Always clear search bar
  };

  const operations = {
    append: (chunk) => updateChain(chain => chain.append(chunk)),
    insert: (index, chunk) => updateChain(chain => chain.insertAt(index, chunk)),
    remove: (index) => updateChain(chain => chain.removeAt(index)),
    edit: (index, chunk) => updateChain(chain => chain.updateAt(index, chunk))
  };

  return { chain, query, setQuery, shouldFocusSearchBar, setShouldFocusSearchBar, ...operations };
};
```

#### **useSuggestions** (Simplified useSuggestionEngine)
**Why Simplify**: Single responsibility - just suggestion computation

```typescript
const useSuggestions = (query: string, chain: ChunkChain, insertingAtIndex?: number) => {
  return useMemo(() => {
    const contextChain = insertingAtIndex ? chain.sliceToIndex(insertingAtIndex) : chain;
    const validChunks = contextChain.getNextValidChunks();
    
    if (query.trim() === "") {
      return getContextualSuggestions(validChunks, chain);
    } else {
      return searchChunks(validChunks, query);
    }
  }, [query, chain, insertingAtIndex]);
};
```

#### **useKeyboardNavigation** (Extracted from useSuggestionSelection)
**Why Extract**: More generic, reusable component

#### **useSearchAPI** (Enhanced)
**Why Enhance**: Add missing features like request cancellation

---

## Migration Strategy

### Phase 0: Regression Testing (FIRST PRIORITY)

**Create comprehensive test suite before any refactoring**

#### Essential Regression Tests:

1. **Core User Journey** (`tests/integration/search-workflow.test.tsx`)
   - Complete search workflow end-to-end
   - Chunk with slots workflow
   - Chunk without slots workflow

2. **Search Bar & Suggestions** (`tests/integration/search-suggestions.test.tsx`)
   - Search bar clears after adding chunks
   - Contextual suggestions appear after chain changes
   - Real-time search while typing
   - Empty search bar behavior

3. **Chain Operations** (`tests/unit/chain-operations.test.tsx`)
   - All CRUD operations work correctly
   - Chain state consistency (English, Cypher, Aliases)

4. **Individual Hook Baseline** (`tests/unit/hooks/`)
   - Current behavior of each hook
   - Safety net for refactor

5. **Component Integration** (`tests/integration/component-integration.test.tsx`)
   - Components work together correctly

6. **Error Handling** (`tests/integration/error-handling.test.tsx`)
   - Network errors, edge cases, rapid interactions

#### Test Infrastructure Setup:
- Mock fetch for useSearchAPI
- Mock Modal.setAppElement for react-modal  
- Test utilities for common scenarios
- Predictable mock chunk data

### Phase 1: Fix Existing Failing Tests

1. **Fix slotFiller bug**: Operator quoting issue (`'>='` → `>=`)
2. **Fix SearchContext test**: Infrastructure and assertion issues
3. **Ensure all tests pass** before proceeding

### Phase 2: Create New Hooks (Zero Risk)

1. Implement new hooks alongside existing ones
2. Keep old hooks temporarily for backwards compatibility
3. No existing code changes yet

### Phase 3: Update SearchContext (Low Risk)

**Only file that needs changes**: `SearchContext.tsx`

**Before:**
```typescript
const { searchResults, isSearching, searchError, executeSearch, clearSearch } = useSearchAPI();
const { shouldFocusSearchBar, focusSearchBar, resetFocusFlag } = useFocusManagement();
const { editChunk, insertChunkAt, removeChunk, appendChunk, insertChunk, updateChunkAtIndex } = useChainOperations({...});
const { suggestions, showNextSuggestions } = useSuggestionEngine({...});
const { selectedIndex, selectedSuggestion, setKeyboardNavigationEnabled, handleKeyDown, clearSelection } = useSuggestionSelection({...});
```

**After:**
```typescript
const { chain, query, setQuery, shouldFocusSearchBar, focusSearchBar, resetFocusFlag, append, insert, remove, edit, insertAt, update } = useChainState();
const suggestions = useSuggestions(query, chain, insertingAtIndex);
const { searchResults, isSearching, searchError, executeSearch, clearSearch } = useSearchAPI();
const { selectedIndex, handleKeyDown, clearSelection } = useKeyboardNavigation(suggestions, handleSuggestionClick);
```

**Critical**: Maintain identical `SearchContextType` interface - zero breaking changes

### Phase 4: Cleanup (Zero Risk)

1. Delete old hook files
2. Remove unused imports  
3. Update documentation

---

## Impact Analysis

### Components Using SearchContext (NO CHANGES NEEDED):
- `SearchBar.tsx`
- `ChunkChainItem.tsx`
- `BreadcrumbChain.tsx`  
- `AliasesDisplay.tsx`
- `SearchResults.tsx`
- `ChainDisplay.tsx`

### Why Zero Component Changes:
- All hooks only used in `SearchContext.tsx`
- Components consume through `SearchContextType` interface
- Interface preserved exactly - perfect abstraction barrier
- Context pattern isolates implementation details

---

## Bug Fixes Completed

### Issues Recently Fixed:
1. **Search bar not clearing**: Fixed by updating query state properly
2. **Suggestions not updating**: Fixed timing issue between manual and automatic triggers  
3. **ChunkChain.compile() missing English**: Added `this.English = englishParts.join(" and ")`
4. **Inconsistent suggestion triggering**: Removed manual triggers, use automatic only

---

## Risk Assessment

### Why This Refactor is Very Safe:

1. **Single Point of Integration**: Hooks only used in SearchContext
2. **Interface Isolation**: Components consume through stable interface
3. **Behavioral Preservation**: New hooks provide same functionality  
4. **Incremental Migration**: Can be done step by step
5. **Comprehensive Testing**: Full regression suite before starting

### Testing Requirements:
- All regression tests pass before refactor
- All regression tests pass after each phase
- No component-level testing changes needed

---

## Expected Benefits

- **~60% less hook code** 
- **Eliminates code duplication** in chain operations
- **Single source of truth** for suggestion logic
- **Better performance** (fewer re-renders, request cancellation)
- **Easier maintenance** (less duplication, clearer responsibilities)
- **Consistent patterns** across chain operations

---

## Implementation Checklist

### Phase 0: Testing
- [ ] Set up test infrastructure (mocks, utilities)
- [ ] Create core user journey tests
- [ ] Create search bar & suggestions tests  
- [ ] Create chain operations tests
- [ ] Create individual hook baseline tests
- [ ] Fix existing failing tests
- [ ] All tests passing

### Phase 1: New Hooks
- [ ] Implement `useChainState`
- [ ] Implement `useSuggestions`
- [ ] Implement enhanced `useSearchAPI`
- [ ] Implement `useKeyboardNavigation`
- [ ] Unit tests for new hooks

### Phase 2: Migration
- [ ] Update `SearchContext.tsx` to use new hooks
- [ ] Maintain identical `SearchContextType` interface
- [ ] All regression tests still passing
- [ ] Manual testing of core workflows

### Phase 3: Cleanup
- [ ] Delete old hook files
- [ ] Remove unused imports
- [ ] Update documentation
- [ ] Final test run

---

## Context Preservation

This plan preserves all analysis and decisions made during the investigation. Key insights:

- **Root cause of search bar issue**: Missing `this.English` assignment in ChunkChain.compile()
- **Root cause of suggestion issue**: Mixed manual/automatic triggering in SearchContext  
- **Architecture insight**: Context pattern provides perfect isolation for refactor
- **Testing insight**: Must test first to avoid breaking existing functionality

**Status**: Ready to begin Phase 0 (Regression Testing)