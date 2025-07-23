# Chunks Data Simplification

## What Was Simplified

### Before
- **6 separate files** with complex, repetitive logic
- **Manual chunk creation** for every stat with hardcoded templates
- **Inconsistent patterns** across different stat types
- **Maintenance nightmare** - adding a stat required updating multiple files

### After
- **2 new files** with consolidated logic
- **Automated chunk generation** using a single function
- **Consistent patterns** across all stat types
- **Easy maintenance** - add a stat to one array, get all chunks automatically

## Files Changed

### New Files
- `stat-chunk-generator.ts` - Single function to generate stat chunks
- `chunks-data-simplified.ts` - Consolidated data using the generator

### Modified Files
- `chunks-data.ts` - Now imports from simplified version

### Files That Can Be Removed (Optional)
- `passing-stats-chunks.ts` - Replaced by generator
- `flex-stats-chunks.ts` - Replaced by generator

## Benefits

1. **Reduced Duplication**: Eliminated ~200 lines of repetitive code
2. **Consistent Logic**: All stat chunks follow identical patterns
3. **Easier Maintenance**: Add new stats by updating arrays, not writing chunks
4. **Better Defaults**: Sensible default values for each stat type
5. **Type Safety**: Centralized stat definitions with proper typing

## Migration Path

The changes are backward compatible. The old files still exist and can be removed when confident in the new system.

To fully migrate:
1. Verify functionality works as expected
2. Remove old chunk files (`passing-stats-chunks.ts`, `flex-stats-chunks.ts`)
3. Update any direct imports to use the simplified version