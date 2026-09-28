import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      className="mb-3 h-10 w-full rounded-md border-0 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:ring-2 focus:ring-orange-400/60"
      {...props}
    />
  );
}
