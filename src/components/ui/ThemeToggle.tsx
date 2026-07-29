import { Moon, Sun } from "lucide-react";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeEffect();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      className={cn(
        "min-w-11 min-h-11 rounded-lg flex items-center justify-center",
        "border-base hover:bg-bg-3 transition text-fg-2 hover:text-fg",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className,
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
