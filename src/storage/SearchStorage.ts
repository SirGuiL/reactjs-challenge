import { v4 as uuid } from "uuid";

import { searchDTO } from "../dtos/searchDTO";
import { searchKey } from "./storageConfig";

export const getStoredSearches = () => {
  const storedSearches = localStorage.getItem(searchKey);

  if (!storedSearches) {
    return [];
  }

  const parsedSearches = JSON.parse(storedSearches);

  return parsedSearches.reverse();
};

export const storeSearch = (
  search: string,
  qty: number,
  flag: string,
  name: string
) => {
  const storedSearches: searchDTO[] = getStoredSearches();

  const newSearches = [
    ...storedSearches,
    {
      search,
      date: new Date(),
      id: uuid(),
      companiesQty: qty,
      flag,
      name,
    },
  ];

  localStorage.setItem(searchKey, JSON.stringify(newSearches));
};

export const removeStoredSearch = () => {
  localStorage.removeItem(searchKey);
};
