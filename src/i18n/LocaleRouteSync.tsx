import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "./LocaleProvider";
import { localeFromPathname } from "./localePath";

/**
 * Keep LocaleProvider in sync with the URL (`/en/...` → en, else fr).
 * Must render inside the router.
 */
export function LocaleRouteSync() {
  const { pathname } = useLocation();
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    const fromPath = localeFromPathname(pathname);
    if (fromPath !== locale) setLocale(fromPath);
  }, [pathname, locale, setLocale]);

  return null;
}
