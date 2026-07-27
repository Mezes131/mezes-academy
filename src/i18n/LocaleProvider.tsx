import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { messagesEn } from "./messages/en";
import { messagesFr, type MessageTree } from "./messages/fr";
import { readStoredLocale, writeStoredLocale } from "./storage";
import type { Locale } from "./types";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  messages: MessageTree;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const catalogs: Record<Locale, MessageTree> = {
  fr: messagesFr,
  en: messagesEn,
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStoredLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStoredLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      messages: catalogs[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
