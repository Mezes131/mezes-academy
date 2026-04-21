import { useEffect } from "react";
import { useProgress } from "./useProgress";

/**
 * Applies the `dark` or `light` class to <html> whenever theme changes,
 * so Tailwind and CSS variables stay in sync.
 */
export function useThemeEffect() {
  const { progress, setTheme } = useProgress();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(progress.theme);
  }, [progress.theme]);

  return { theme: progress.theme, setTheme };
}
