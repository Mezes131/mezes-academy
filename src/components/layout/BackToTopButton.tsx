import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/useT";

interface BackToTopButtonProps {
  /** Scroll distance (px) after which the button appears. */
  threshold?: number;
}

/**
 * Floating button that scrolls back to the top.
 * Appears only after the user has scrolled beyond the threshold,
 * with an entrance animation and accessible focus ring.
 */
export function BackToTopButton({ threshold = 320 }: BackToTopButtonProps) {
  const t = useT();
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
      aria-label={t("common.backToTop")}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-20 right-4 z-[55] w-11 h-11 rounded-full lg:bottom-6 lg:right-6",
        "bg-accent text-white shadow-soft",
        "flex items-center justify-center",
        "border border-accent/40",
        "transition-[transform,opacity,background-color] duration-200 ease-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-0.5 hover:bg-accent-2 active:scale-[0.97]",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none",
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
