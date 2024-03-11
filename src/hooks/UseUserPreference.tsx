import { useContext } from "react";

import {
  UserPreferenceContext,
  UserPreferenceProps,
} from "../contexts/UserPreferenceContext";

export function useUserPreference(): UserPreferenceProps {
  const context = useContext(UserPreferenceContext);

  return context;
}
