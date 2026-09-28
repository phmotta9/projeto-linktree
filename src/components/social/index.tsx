import type { ReactNode } from "react";

interface SocialProps {
  url: string;
  label: string;
  children: ReactNode;
}

export function Social({ url, label, children }: SocialProps) {
  return (
    <a
      aria-label={label}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
    >
      {children}
    </a>
  );
}
