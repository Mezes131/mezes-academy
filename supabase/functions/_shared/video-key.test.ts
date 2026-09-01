import { describe, expect, it } from "vitest";
import { isValidVideoKey } from "./video-key";

describe("isValidVideoKey", () => {
  it("accepts valid course paths", () => {
    expect(
      isValidVideoKey("courses/react/phase-core/modules/06-jsx-basics.mp4"),
    ).toBe(true);
  });

  it("rejects empty key", () => {
    expect(isValidVideoKey("")).toBe(false);
  });

  it("rejects path traversal", () => {
    expect(isValidVideoKey("courses/../secret.mp4")).toBe(false);
    expect(isValidVideoKey("courses/react/../../etc/passwd")).toBe(false);
  });

  it("rejects keys outside courses prefix", () => {
    expect(isValidVideoKey("public/teaser.mp4")).toBe(false);
  });

  it("rejects backslashes", () => {
    expect(isValidVideoKey("courses\\react\\hack.mp4")).toBe(false);
  });
});
