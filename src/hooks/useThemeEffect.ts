import { useEffect } from "react";
import { useProgress } from "./useProgress";

/**
 * Applies the `dark` or `light` class to <html> whenever theme changes,
 * so Tailwind and CSS variables stay in sync.
 * Invalid / missing values fall back to dark (product default).
 */
export function useThemeEffect() {
  const { progress, setTheme } = useProgress();
  const theme = progress.theme === "light" ? "light" : "dark";

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return { theme, setTheme };
}
