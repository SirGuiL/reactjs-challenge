import { format } from "date-fns";
import { useHistory } from "../../hooks/UseHistory";

interface Props {
  setSearchInput: (search: string) => void;
  handleSearchCountry: (search: string) => void;
}

export function HistoryAside({ setSearchInput, handleSearchCountry }: Props) {
  const { searchHistory } = useHistory();

  return (
    <div className="hidden md:flex flex-col border-2 border-white p-5 rounded-md">
      <h1 className="text-xl">
        {searchHistory.length > 5 ? "últimas 5 buscas" : "Últimas buscas"}
      </h1>

      <aside className="flex flex-col gap-2 mt-5">
        {searchHistory.map(
          (search, index) =>
            index < 5 && (
              <div className="flex gap-5" key={search.id}>
                <span className="text-sm flex-1">{search.search}</span>

                <time className="text-sm">
                  {format(search.date, "dd/MM/yyyy 'às' HH:mm")}
                </time>

                <button
                  onClick={() => {
                    setSearchInput(search.search);
                    handleSearchCountry(search.search);
                  }}
                  className="text-sm text-blue-300 cursor-pointer hover:text-blue-50 transition-colors duration-200"
                >
                  Ver busca
                </button>
              </div>
            )
        )}
        {history.length > 5 && (
          <a
            href="/history"
            className="text-sm text-blue-300 cursor-pointer hover:text-blue-50 transition-colors duration-200"
          >
            Ver todas as buscas
          </a>
        )}
      </aside>
    </div>
  );
}
