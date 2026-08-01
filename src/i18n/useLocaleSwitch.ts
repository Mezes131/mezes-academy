import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocale } from "./LocaleProvider";
import { switchLocalePath } from "./localePath";
import type { Locale } from "./types";

/** Switch UI locale and navigate to the equivalent path. */
export function useLocaleSwitch() {
  const { locale, setLocale } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useCallback(
    (code: Locale) => {
      if (code === locale) return;
      const next = switchLocalePath(
        location.pathname,
        location.search,
        location.hash,
        code,
      );
      setLocale(code);
      navigate(next);
    },
    [locale, location.hash, location.pathname, location.search, navigate, setLocale],
  );

  return { locale, select };
}
