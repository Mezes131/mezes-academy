import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Globe } from "lucide-react";
import { useLocale } from "./LocaleProvider";
import { useT } from "./useT";
import { switchLocalePath } from "./localePath";
import type { Locale } from "./types";
import { cn } from "@/lib/utils";

const options: Locale[] = ["fr", "en"];

/**
 * Compact globe icon → language dropdown.
 * For guests (signed-in users switch language in account preferences).
 */
export function LanguageMenu({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const t = useT();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    function onMouseDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function select(code: Locale) {
    setOpen(false);
    if (code === locale) return;
    const next = switchLocalePath(
      location.pathname,
      location.search,
      location.hash,
      code,
    );
    setLocale(code);
    navigate(next);
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("language.label")}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-lg border-base transition",
          "text-fg-2 hover:text-fg hover:bg-bg-3",
          open && "bg-bg-3 text-fg",
        )}
      >
        <Globe size={16} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t("language.label")}
          className={cn(
            "absolute right-0 top-[calc(100%+6px)] z-50 min-w-[9rem] overflow-hidden rounded-xl border-base bg-bg-2 shadow-soft",
            "animate-fade-in origin-top-right",
          )}
        >
          {options.map((code) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={locale === code}
              onClick={() => select(code)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-3 h-10 text-[13px] transition",
                locale === code
                  ? "bg-bg-3 font-semibold text-fg"
                  : "text-fg-2 hover:bg-bg-3 hover:text-fg",
              )}
            >
              <span>{t(code === "fr" ? "language.fr" : "language.en")}</span>
              {locale === code && (
                <Check size={14} className="text-accent-2" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
