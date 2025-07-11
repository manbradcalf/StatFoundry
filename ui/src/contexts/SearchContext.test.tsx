// @ts-nocheck
import React, { useEffect } from 'react';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import { SearchProvider, useSearchContext } from './SearchContext';
import { getAllChunks } from '../feature/Chunks/Data/chunks-data';

const TriggerComponent: React.FC = () => {
  const search = useSearchContext();

  // On mount, select a suggestion with slots
  useEffect(() => {
    const chunkWithSlots = getAllChunks().find((c) => c.Slots.length > 0)!;
    search.selectSuggestion({ chunk: chunkWithSlots });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

describe('SearchContext slot filling integration', () => {
  it('replaces placeholders when selecting a suggestion with slots', async () => {
    let chainEnglish = '';

    const CaptureComponent: React.FC = () => {
      const { userInput } = useSearchContext();
      useEffect(() => {
        chainEnglish = userInput;
        // eslint-disable-next-line no-console
        // console.log('slots values', chain.Tail?.chunk.Slots);
      }, [userInput]);
      return null;
    };

    render(
      <SearchProvider>
        <TriggerComponent />
        <CaptureComponent />
      </SearchProvider>
    );

    // Click save on modal once it appears
    await waitFor(() => screen.findByText('Save'));
    fireEvent.click(await screen.findByText('Save'));

    await waitFor(() => {
      console.log('chainEnglish', chainEnglish);
      expect(chainEnglish).toContain("position = 'QB'");
    });
  });
});
