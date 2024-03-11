import { ReactNode, createContext, useEffect, useState } from "react";

import { getStoredSearches } from "../storage/SearchStorage";
import { searchDTO } from "../dtos/searchDTO";

export type HistoryContextProps = {
  searchHistory: searchDTO[];
  setSearchHistory: (search: searchDTO[]) => void;
};

type HistoryContextProviderProps = {
  children: ReactNode;
};

export const UserPreferenceContext = createContext<HistoryContextProps>(
  {} as HistoryContextProps
);

export function HistoryContextProvider({
  children,
}: HistoryContextProviderProps) {
  const [searchHistory, setSearchHistory] = useState<searchDTO[]>([]);

  useEffect(() => {
    const storedSearches = getStoredSearches();

    setSearchHistory(storedSearches);
  }, []);

  return (
    <UserPreferenceContext.Provider value={{ searchHistory, setSearchHistory }}>
      {children}
    </UserPreferenceContext.Provider>
  );
}
