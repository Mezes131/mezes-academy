import { useCallback } from "react";
import { useLocale } from "./LocaleProvider";
import { localePath } from "./localePath";

/** Prefix in-app paths for the active locale. */
export function useLocalePath() {
  const { locale } = useLocale();
  return useCallback((to: string) => localePath(to, locale), [locale]);
}
