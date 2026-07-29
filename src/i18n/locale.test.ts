import { beforeEach, describe, expect, it } from "vitest";
import { readStoredLocale, writeStoredLocale } from "./storage";

const store = new Map<string, string>();

beforeEach(() => {
  store.clear();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v);
      },
      clear: () => store.clear(),
      removeItem: (k: string) => {
        store.delete(k);
      },
    },
  });
});

describe("locale storage", () => {
  it("defaults to fr", () => {
    expect(readStoredLocale()).toBe("fr");
  });

  it("round-trips en", () => {
    writeStoredLocale("en");
    expect(readStoredLocale()).toBe("en");
  });
});
