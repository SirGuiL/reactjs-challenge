import { ReactNode } from "react";

import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  text?: string;
}

export function PrimaryButton({ icon, text, ...rest }: Props) {
  return (
    <button
      className="bg-blue-500 p-3 rounded-lg text-white flex flex-col items-center hover:bg-blue-400 transition-colors duration-200 outline-none focus:bg-blue-400 disabled:cursor-not-allowed"
      type="button"
      {...rest}
    >
      {icon}
      {text && <span className="text-sm">{text}</span>}
    </button>
  );
}
