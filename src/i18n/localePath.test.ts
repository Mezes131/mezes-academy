import { describe, expect, it } from "vitest";
import {
  localeFromPathname,
  localePath,
  stripLocalePrefix,
  switchLocalePath,
} from "./localePath";

describe("localeFromPathname", () => {
  it("detects en prefix", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/react")).toBe("en");
    expect(localeFromPathname("/react")).toBe("fr");
    expect(localeFromPathname("/")).toBe("fr");
  });
});

describe("stripLocalePrefix", () => {
  it("strips /en", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
    expect(stripLocalePrefix("/en/react")).toBe("/react");
    expect(stripLocalePrefix("/react")).toBe("/react");
  });
});

describe("localePath", () => {
  it("leaves fr paths unchanged", () => {
    expect(localePath("/react", "fr")).toBe("/react");
    expect(localePath("/#catalog", "fr")).toBe("/#catalog");
  });

  it("prefixes en paths", () => {
    expect(localePath("/", "en")).toBe("/en");
    expect(localePath("/react", "en")).toBe("/en/react");
    expect(localePath("/#catalog", "en")).toBe("/en#catalog");
    expect(localePath("/auth?next=%2Freact", "en")).toBe(
      "/en/auth?next=%2Freact",
    );
  });

  it("is idempotent for already-prefixed en paths", () => {
    expect(localePath("/en/react", "en")).toBe("/en/react");
  });

  it("strips en when targeting fr", () => {
    expect(localePath("/en/react", "fr")).toBe("/react");
  });
});

describe("switchLocalePath", () => {
  it("round-trips fr ↔ en", () => {
    expect(switchLocalePath("/react/progress", "", "", "en")).toBe(
      "/en/react/progress",
    );
    expect(switchLocalePath("/en/react/progress", "", "", "fr")).toBe(
      "/react/progress",
    );
    expect(switchLocalePath("/", "", "#catalog", "en")).toBe("/en#catalog");
  });
});
