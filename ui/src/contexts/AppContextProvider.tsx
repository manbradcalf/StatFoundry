import React, { ReactNode } from "react";
import { ChainProvider } from "./ChainContext";
import { ModalProvider } from "./ModalContext";
import { SearchAPIProvider } from "./SearchAPIContext";
import { IntegratedSearchProvider } from "./IntegratedSearchContext";

interface AppContextProviderProps {
  children: ReactNode;
}

/**
 * Master context provider that wires together all the focused contexts
 * Provides backwards compatibility through IntegratedSearchProvider
 */
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  return (
    <ChainProvider>
      <ModalProvider>
        <SearchAPIProvider>
          <IntegratedSearchProvider>
            {children}
          </IntegratedSearchProvider>
        </SearchAPIProvider>
      </ModalProvider>
    </ChainProvider>
  );
};