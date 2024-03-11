import { ClockCounterClockwise, House } from "@phosphor-icons/react";
import { Link } from "../Link";

export function Sidebar() {
  return (
    <nav className="group flex items-center justify-between md:items-start md:justify-start md:flex-col md:gap-3 pl-20 pr-20 pb-5 pt-5 md:p-5 bg-blue-950 w-full md:h-full overflow-hidden md:w-15 md:hover:w-32 transition-all duration-200">
      <Link
        icon={
          <House className="min-w-8 w-8 min-h-8 h-8 md:min-w-5 md:w-5 md:min-h-5 md:h-5" />
        }
        text="Inicio"
        href="/"
      />
      <Link
        icon={
          <ClockCounterClockwise className="min-w-8 w-8 min-h-8 h-8 md:min-w-5 md:w-5 md:min-h-5 md:h-5" />
        }
        text="Histórico"
        href="/history"
      />
    </nav>
  );
}
