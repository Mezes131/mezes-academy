import { describe, expect, it } from "vitest";
import { humanizeAuthError } from "./authErrors";
import { messagesFr } from "@/i18n/messages/fr";

describe("humanizeAuthError", () => {
  it("maps rate limit", () => {
    expect(humanizeAuthError("Rate limit exceeded", messagesFr)).toBe(
      messagesFr.auth.errRateLimit,
    );
  });

  it("maps recovery failures", () => {
    expect(
      humanizeAuthError("Auth session missing for recovery", messagesFr),
    ).toBe(messagesFr.auth.errRecovery);
  });
});
