import { format } from "date-fns";
import { searchDTO } from "../../dtos/searchDTO";

interface Props {
  searches: searchDTO[];
}

export function SearchesTable({ searches }: Props) {
  return (
    <table className="table-auto w-full border-spacing-y-5">
      <thead className="border-b-2">
        <tr>
          <th className="text-left text-xs md:text-base">Busca</th>
          <th className="text-left text-xs md:text-base">Dia</th>
          <th className="hidden md:block text-left text-xs md:text-base">
            Quantidade de empresas na busca
          </th>
          <th className="block md:hidden text-left text-xs md:text-base">
            Empresas
          </th>
          <th className="text-left text-xs md:text-base">Primeiro resultado</th>
        </tr>
      </thead>
      <tbody className="mt-10">
        {searches.map((search) => {
          return (
            <tr key={search.id} className="mt-1">
              <td className="text-xs md:text-base">{search.search}</td>
              <td className="block md:hidden text-xs md:text-base">
                {format(search.date, "dd/MM/yyyy")}
              </td>
              <td className="hidden md:block text-xs md:text-base">
                {format(search.date, "dd/MM/yyyy 'às' HH:mm")}
              </td>
              <td className="text-xs md:text-base">
                {search.companiesQty.toLocaleString("pt-BR")}
              </td>
              <td className="text-xs md:text-base">{search.name}</td>
              <td className="text-xs md:text-base">
                <a
                  href={`/${search.search}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-100"
                >
                  Refazer busca
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
