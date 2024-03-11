import { searchDTO } from "../../dtos/searchDTO";

interface Props {
  searches: searchDTO[];
}

export function SearchesGrid({ searches }: Props) {
  return (
    <div className="flex flex-wrap justify-between gap-y-10">
      {searches.map((search) => (
        <div
          className="flex flex-col gap-2 border-2 w-72 p-5 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-50"
          key={search.id}
        >
          <h1 className="text-base text-center">{search.search}</h1>

          <img
            alt={`${search.search} flag`}
            src={search.flag}
            className="w-40 self-center"
          />

          <div className="flex flex-col mt-auto items-start">
            <span>Primeiro resultado: {search.name}</span>
            <span>Países na busca: {search.companiesQty}</span>

            <a
              href={`/${search.search}`}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-100"
            >
              Refazer busca
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
