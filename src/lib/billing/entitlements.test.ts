import { describe, expect, it } from "vitest";
import { hasVideoAccess, isEntitlementActive } from "./entitlements";

describe("isEntitlementActive", () => {
  it("returns true when expires_at is null", () => {
    expect(isEntitlementActive({ expires_at: null }, new Date())).toBe(true);
  });

  it("returns true when not yet expired", () => {
    expect(
      isEntitlementActive(
        { expires_at: "2030-01-01T00:00:00Z" },
        new Date("2026-01-01"),
      ),
    ).toBe(true);
  });

  it("returns false when expired", () => {
    expect(
      isEntitlementActive(
        { expires_at: "2020-01-01T00:00:00Z" },
        new Date("2021-01-01"),
      ),
    ).toBe(false);
  });
});

describe("hasVideoAccess", () => {
  it("returns false for empty list", () => {
    expect(hasVideoAccess([])).toBe(false);
  });

  it("returns true if any entitlement is active", () => {
    expect(
      hasVideoAccess([
        { expires_at: "2020-01-01T00:00:00Z" },
        { expires_at: "2030-01-01T00:00:00Z" },
      ]),
    ).toBe(true);
  });
});
