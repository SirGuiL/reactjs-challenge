import { countryType } from "../../dtos/countryDTO";

interface Props {
  countries: countryType[];
}

export function CountriesTable({ countries }: Props) {
  return (
    <table className="table-auto w-full">
      <thead className="border-b-2">
        <tr>
          <th className="text-left text-xs md:text-base">Nome</th>
          <th className="text-left text-xs md:text-base">Capital</th>
          <th className="text-left text-xs md:text-base">População</th>
          <th className="text-left text-xs md:text-base">Nome da moeda</th>
          <th className="text-left text-xs md:text-base">Idioma</th>
        </tr>
      </thead>
      <tbody className="mt-10">
        {countries.map((country, index) => {
          return (
            <tr key={index} className="mt-1">
              <td className="text-xs md:text-base">{country.name}</td>
              <td className="text-xs md:text-base">{country.capital}</td>
              <td className="text-xs md:text-base">
                {country.population.toLocaleString("pt-BR")}
              </td>
              <td className="text-xs md:text-base">{country.currencyName}</td>
              <td className="text-xs md:text-base">{country.language}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
