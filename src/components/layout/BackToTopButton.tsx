import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopButtonProps {
  /** Distance de scroll (en px) à partir de laquelle le bouton apparaît. */
  threshold?: number;
}

/**
 * Bouton flottant qui remonte en haut de la page.
 * N'apparaît qu'une fois que l'utilisateur a scrollé en dessous du seuil,
 * avec une animation d'entrée et un focus ring accessible.
 */
export function BackToTopButton({ threshold = 320 }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > threshold);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Retour en haut de la page"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full",
        "bg-accent text-white shadow-glow",
        "flex items-center justify-center",
        "border border-accent/40",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "hover:-translate-y-0.5 hover:bg-accent-2 active:translate-y-0",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
