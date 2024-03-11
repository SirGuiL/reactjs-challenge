import { countryType } from "../../dtos/countryDTO";

interface Props {
  countries: countryType[];
}

export function CountriesGrid({ countries }: Props) {
  return (
    <div className="flex flex-wrap justify-between gap-y-10">
      {countries.map((country) => (
        <div
          className="flex flex-col gap-2 border-2 w-72 p-5 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-50"
          key={country.name}
        >
          <h1 className="text-base text-center">{country.name}</h1>

          <img
            alt={`${country.name} flag`}
            src={country.flag}
            className="w-40 self-center"
          />

          <span>Capital: {country.capital}</span>
          <span>População: {country.population.toLocaleString("pt-BR")}</span>
          <span>Nome da moeda: {country.currencyName}</span>
          <span>Idioma: {country.language}</span>
        </div>
      ))}
    </div>
  );
}
