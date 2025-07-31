import React, { ReactNode } from "react";
import { ChainProvider } from "./ChainContext";
import { ModalProvider } from "./ModalContext";
import { SearchAPIProvider } from "./SearchAPIContext";
import { PlayerDetailProvider } from "./PlayerDetailContext";

interface AppContextProviderProps {
  children: ReactNode;
}

/**
 * Clean context provider that composes focused contexts
 * No compatibility layers - components use contexts directly
 */
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  return (
    <ChainProvider>
      <ModalProvider>
        <SearchAPIProvider>
          <PlayerDetailProvider>
            {children}
          </PlayerDetailProvider>
        </SearchAPIProvider>
      </ModalProvider>
    </ChainProvider>
  );
};