import { cn } from "@/lib/utils";

interface DividerProps {
  /** Text shown between the two segments (uppercase mono). */
  label?: string;
  className?: string;
}

/**
 * Horizontal divider with an optional centered label.
 * Used to separate distinct blocks inside forms and cards.
 */
export function Divider({ label, className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={cn("flex items-center gap-3", className)}
    >
      <span aria-hidden className="flex-1 h-px bg-base" />
      {label && (
        <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3 whitespace-nowrap">
          {label}
        </span>
      )}
      <span aria-hidden className="flex-1 h-px bg-base" />
    </div>
  );
}
