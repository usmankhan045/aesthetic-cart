import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "rose" | "neutral" | "blush";
}

export function Badge({ className, tone = "rose", ...props }: BadgeProps) {
  const tones = {
    rose: "bg-rose/40 text-charcoal border-rose-gold/30",
    neutral: "bg-ivory text-warm-gray border-warm-gray/20",
    blush: "bg-blush text-rose-gold-dark border-rose-gold/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] border",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
