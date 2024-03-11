import {
  CircleNotch,
  FileCsv,
  MagnifyingGlass,
  SmileyNervous,
  SmileyWink,
  SquaresFour,
  Table,
} from "@phosphor-icons/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";

import { PrimaryButton } from "../../components/PrimaryButton";
import { CountriesTable } from "../../components/CountriesTable";
import { CountriesGrid } from "../../components/CountriesGrid";
import { HistoryAside } from "../../components/HistoryAside";

import { countryType } from "../../dtos/countryDTO";
import { searchDTO } from "../../dtos/searchDTO";

import { getStoredSearches, storeSearch } from "../../storage/SearchStorage";

import { useUserPreference } from "../../hooks/UseUserPreference";
import { useHistory } from "../../hooks/UseHistory";
import { FileUtils } from "../../utils/FileUtils";

export function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [countries, setCountries] = useState<countryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const { view, handleSetViewPreference } = useUserPreference();
  const { searchHistory, setSearchHistory } = useHistory();
  const { search } = useParams();

  const handleSearchCountry = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    searchCountry(searchInput);
  };

  const searchCountry = async (search: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${search}`
      );

      const formattedCountries: countryType[] = response.data.map(
        (countries: any) => {
          return {
            name: countries.name.common,
            capital: countries.capital
              ? countries.capital[0]
              : "Informação indisponível",
            population: countries.population,
            currencyName: countries.currencies
              ? countries.currencies[Object.keys(countries.currencies)[0]].name
              : "Informação indisponível",
            language: countries.languages
              ? countries.languages[Object.keys(countries.languages)[0]]
              : "Informação indisponível",
            flag: countries.flags.svg || countries.flags.png || "",
          };
        }
      );

      setCountries(formattedCountries);
      storeSearch(
        search,
        formattedCountries.length,
        formattedCountries[0].flag,
        formattedCountries[0].name
      );

      const newValue: searchDTO = {
        search: search,
        date: new Date(),
        id: uuid(),
        companiesQty: formattedCountries.length,
        flag: formattedCountries[0].flag,
        name: formattedCountries[0].name,
      };

      if (!searchHistory || searchHistory.length == 0) {
        const storedSearches = await getStoredSearches();

        const updatedValue = [newValue, ...storedSearches];
        setSearchHistory(storedSearches);

        setSearchHistory(updatedValue);
        setHasError(false);

        setSearchInput("");

        return;
      }

      const updatedValue = [newValue, ...searchHistory];

      setSearchHistory(updatedValue);
      setHasError(false);

      setSearchInput("");
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      searchCountry(search);
    }
  }, []);

  return (
    <div className="bg-blue-900 flex-1 p-5 text-white overflow-y-scroll flex flex-col">
      <h1>Países</h1>

      <form
        className="flex gap-2 mt-4"
        onSubmit={(e) => handleSearchCountry(e)}
      >
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 px-2 p-1 text-black rounded-lg outline-0 text-sm placeholder:text-sm"
          placeholder="Digite o nome do país"
          name="country"
        />

        <PrimaryButton
          icon={<MagnifyingGlass />}
          type="submit"
          disabled={!searchInput || searchInput.trim().length == 0}
        />
      </form>

      <div className="flex flex-col mt-4 gap-2">
        <span className="text-sm">Tipo de exibição:</span>

        <div className="flex gap-2">
          <PrimaryButton
            icon={<Table size={20} />}
            onClick={() => handleSetViewPreference("table")}
          />

          <PrimaryButton
            icon={<SquaresFour size={20} />}
            onClick={() => handleSetViewPreference("grid")}
          />

          {countries.length > 0 && (
            <PrimaryButton
              icon={<FileCsv size={20} />}
              onClick={() => FileUtils.downloadTable(countries[0].name)}
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 items-start gap-16 mt-10">
        <div className="flex flex-1">
          {countries && countries.length > 0 && !isLoading && !hasError ? (
            <div className=" flex-1">
              {view == "table" ? (
                <CountriesTable countries={countries} />
              ) : (
                <CountriesGrid countries={countries} />
              )}
            </div>
          ) : isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <CircleNotch className="animate-spin h-10 w-10" />
            </div>
          ) : hasError ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <SmileyNervous size={64} />

              <span className="text-base mt-2">
                Encontramos um erro ao efetuar a busca.
              </span>
              <span className="text-sm">
                Por favor, confirme sua busca e tente novamente.
              </span>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <SmileyWink size={64} />

              <span className="text-base mt-2">
                Parece que você ainda não efetuou a busca.
              </span>
              <span className="text-sm">
                Faça uma busca para ver os resultados!
              </span>
            </div>
          )}
        </div>

        {searchHistory.length > 0 && (
          <HistoryAside
            setSearchInput={(search) => setSearchInput(search)}
            handleSearchCountry={(search) => searchCountry(search)}
          />
        )}
      </div>
    </div>
  );
}
