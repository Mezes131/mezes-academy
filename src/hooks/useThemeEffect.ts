import { useEffect } from "react";
import { useProgress } from "./useProgress";

/**
 * Applique la classe `dark` ou `light` au <html> dès que le thème change,
 * pour que Tailwind et les variables CSS suivent.
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
