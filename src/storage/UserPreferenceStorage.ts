import { preferenceKey } from "./storageConfig";

export const setViewPreference = (view: "table" | "grid") => {
  localStorage.setItem(preferenceKey, view);
};

export const getViewPreference = () => {
  const preference = localStorage.getItem(preferenceKey) as "table" | "grid";

  if (!preference) {
    return "table";
  }

  return preference;
};
