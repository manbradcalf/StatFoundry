// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock chunk catalog globally with simple test data to keep unit tests small and deterministic.
jest.mock("./hooks/useChunkGenerator", () => ({
  useChunkGenerator: () => {
    const generatedChunks = [
      {
        English: "Players",
        Cypher: "MATCH (p:Player)",
        QueryType: "MATCH_START",
        Requires: [],
        Provides: [{ Name: "p", AliasType: "Player" }],
        Slots: [],
      },
      {
        English: "RB",
        Cypher: "WHERE p.position = 'RB'",
        QueryType: "FILTER",
        Requires: [{ Name: "p", AliasType: "Player" }],
        Provides: [],
        Slots: [],
      },
    ];
    return {
      generatedChunks,
      allChunks: generatedChunks,
      isLoading: false,
      error: null,
    };
  },
}));

// Suppress console warnings during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("ReactDOMTestUtils.act is deprecated") ||
        args[0].includes("react-modal: App element is not defined"))
    ) {
      return;
    }
    originalConsoleError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});