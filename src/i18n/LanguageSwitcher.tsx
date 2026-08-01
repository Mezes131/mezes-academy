import { useT } from "./useT";
import { useLocaleSwitch } from "./useLocaleSwitch";
import type { Locale } from "./types";
import { cn } from "@/lib/utils";

const options: Locale[] = ["fr", "en"];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, select } = useLocaleSwitch();
  const t = useT();

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={cn(
        "inline-flex items-center rounded-lg border border-base p-0.5 text-[12px] font-semibold",
        className,
      )}
    >
      {options.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => select(code)}
          aria-pressed={locale === code}
          className={cn(
            "min-w-11 min-h-11 rounded-md px-2 transition",
            locale === code
              ? "bg-bg-3 text-fg"
              : "text-fg-2 hover:text-fg",
          )}
        >
          {t(code === "fr" ? "language.fr" : "language.en")}
        </button>
      ))}
    </div>
  );
}
