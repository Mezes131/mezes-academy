import { describe, expect, it } from "vitest";
import { getCatalog } from "./catalog";

describe("getCatalog", () => {
  it("lists Secure Vibe Coding first and marks it featured", () => {
    const catalog = getCatalog("fr");
    expect(catalog[0]?.slug).toBe("secure-vibe-coding");
    expect(catalog[0]?.featured).toBe(true);
    expect(catalog[1]?.slug).toBe("react");
    expect(catalog[1]?.featured).toBeFalsy();
  });

  it("keeps the same order in English", () => {
    const catalog = getCatalog("en");
    expect(catalog.map((c) => c.slug).slice(0, 2)).toEqual([
      "secure-vibe-coding",
      "react",
    ]);
  });
});
