import { FileCsv, SmileyWink, SquaresFour, Table } from "@phosphor-icons/react";

import { PrimaryButton } from "../../components/PrimaryButton";
import { SearchesTable } from "../../components/SearchesTable";
import { SearchesGrid } from "../../components/SearchesGrid";

import { useUserPreference } from "../../hooks/UseUserPreference";
import { useHistory } from "../../hooks/UseHistory";
import { FileUtils } from "../../utils/FileUtils";

export function History() {
  const { view, handleSetViewPreference } = useUserPreference();
  const { searchHistory } = useHistory();

  return (
    <div className="bg-blue-900 flex-1 p-5 text-white overflow-y-scroll flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-xl">Histórico de buscas</h1>

        <div className="flex gap-2">
          <PrimaryButton
            icon={<Table size={20} />}
            onClick={() => handleSetViewPreference("table")}
          />
          <PrimaryButton
            icon={<SquaresFour size={20} />}
            onClick={() => handleSetViewPreference("grid")}
          />
          <PrimaryButton
            icon={<FileCsv size={20} />}
            onClick={() => FileUtils.downloadTable("history")}
          />
        </div>
      </div>

      {searchHistory.length > 0 ? (
        <div className="flex-1 mt-10">
          {view === "table" ? (
            <SearchesTable searches={searchHistory} />
          ) : (
            <SearchesGrid searches={searchHistory} />
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <SmileyWink size={64} />

          <span className="text-base mt-2">
            Parece que você ainda não efetuou nenhuma busca.
          </span>
          <span className="text-sm">
            Faça uma busca clicando{" "}
            <a
              href="/"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-100"
            >
              aqui
            </a>
            para ver os resultados!
          </span>
        </div>
      )}
    </div>
  );
}
