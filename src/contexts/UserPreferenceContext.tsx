import { ReactNode, createContext, useEffect, useState } from "react";
import {
  getViewPreference,
  setViewPreference,
} from "../storage/UserPreferenceStorage";

type viewType = "table" | "grid";

export type UserPreferenceProps = {
  view: viewType;
  handleSetViewPreference: (view: viewType) => void;
};

type UserPreferenceContextProviderProps = {
  children: ReactNode;
};

export const UserPreferenceContext = createContext<UserPreferenceProps>(
  {} as UserPreferenceProps
);

export function UserPreferenceContextProvider({
  children,
}: UserPreferenceContextProviderProps) {
  const [view, setView] = useState<viewType>("table");

  const handleSetViewPreference = (view: viewType) => {
    setViewPreference(view);
    setView(view);
  };

  useEffect(() => {
    setView(getViewPreference());
  }, []);

  return (
    <UserPreferenceContext.Provider value={{ view, handleSetViewPreference }}>
      {children}
    </UserPreferenceContext.Provider>
  );
}
