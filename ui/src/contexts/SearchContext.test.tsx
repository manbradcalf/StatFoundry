// @ts-nocheck
import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react';
import { SearchProvider, useSearch } from './SearchContext';
import { getAvailableChunks } from '../chunks-data';

const TriggerComponent: React.FC = () => {
  const search = useSearch();

  // On mount, select a suggestion with slots
  useEffect(() => {
    const chunkWithSlots = getAvailableChunks().find((c) => c.Slots.length > 0)!;
    search.selectSuggestion({ chunk: chunkWithSlots });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

describe('SearchContext slot filling integration', () => {
  it('replaces placeholders when selecting a suggestion with slots', async () => {
    let chainEnglish = '';

    const CaptureComponent: React.FC = () => {
      const { chain } = useSearch();
      useEffect(() => {
        chainEnglish = chain.English;
        // eslint-disable-next-line no-console
        console.log('slots values', chain.Tail?.chunk.Slots);
      }, [chain]);
      return null;
    };

    render(
      <SearchProvider>
        <TriggerComponent />
        <CaptureComponent />
      </SearchProvider>
    );

    await waitFor(() => {
      console.log('chainEnglish', chainEnglish);
      expect(chainEnglish).toContain('position = QB');
    });
  });
});