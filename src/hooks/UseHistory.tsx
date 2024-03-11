import { useContext } from "react";

import {
  UserPreferenceContext,
  HistoryContextProps,
} from "../contexts/HistoryContext";

export function useHistory(): HistoryContextProps {
  const context = useContext(UserPreferenceContext);

  return context;
}
