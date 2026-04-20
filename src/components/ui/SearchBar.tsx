import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher une leçon, un concept…",
  autoFocus,
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border-base bg-bg-2 px-3 h-10 focus-within:border-accent/50",
        className,
      )}
    >
      <Search size={16} className="text-fg-3 flex-shrink-0" />
      <input
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="flex-1 bg-transparent outline-none text-sm text-fg placeholder:text-fg-3"
      />
      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          className="text-fg-3 hover:text-fg text-xs"
          aria-label="Effacer la recherche"
        >
          ✕
        </button>
      )}
    </div>
  );
}
