import { cn } from "@/lib/cn";

interface BowAccentProps {
  className?: string;
}

export function BowAccent({ className }: BowAccentProps) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={cn("text-rose-gold", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden
    >
      <path d="M30 15 C20 5, 8 5, 5 12 C2 19, 14 22, 30 15" strokeLinecap="round" />
      <path d="M30 15 C40 5, 52 5, 55 12 C58 19, 46 22, 30 15" strokeLinecap="round" />
      <path d="M30 15 C28 18, 28 22, 30 24 C32 22, 32 18, 30 15" strokeLinecap="round" />
      <circle cx="30" cy="15" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
