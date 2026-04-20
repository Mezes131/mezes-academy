import { Moon, Sun } from "lucide-react";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeEffect();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      className={cn(
        "w-9 h-9 rounded-lg flex items-center justify-center",
        "border-base hover:bg-bg-3 transition text-fg-2 hover:text-fg",
        className,
      )}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
