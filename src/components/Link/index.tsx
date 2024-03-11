import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  text: string;
  href: "/history" | "/";
}

export function Link({ icon, text, href }: Props) {
  return (
    <a
      className="cursor-pointer flex items-center gap-2 text-white hover:text-gray-400 transition-colors duration-200"
      href={href}
    >
      {icon}
      <span className="hidden md:block opacity-0 text-sm group-hover:opacity-100 transition-opacity duration-200">
        {text}
      </span>
    </a>
  );
}
