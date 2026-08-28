import { describe, expect, it } from "vitest";
import { hasFieldErrors, validateCheckoutFields } from "./fieldSchema";

const momoSchema = [
  { name: "operator", type: "select" as const, required: true },
  { name: "msisdn", type: "tel" as const, required: true },
];

describe("validateCheckoutFields", () => {
  it("flags missing required fields", () => {
    const errors = validateCheckoutFields(momoSchema, {});
    expect(errors.operator).toBe("required");
    expect(errors.msisdn).toBe("required");
    expect(hasFieldErrors(errors)).toBe(true);
  });

  it("accepts valid values", () => {
    const errors = validateCheckoutFields(momoSchema, {
      operator: "orange",
      msisdn: "221771234567",
    });
    expect(hasFieldErrors(errors)).toBe(false);
  });

  it("rejects invalid phone", () => {
    const errors = validateCheckoutFields(momoSchema, {
      operator: "orange",
      msisdn: "123",
    });
    expect(errors.msisdn).toBe("invalid_phone");
  });
});
