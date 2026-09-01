import { describe, expect, it } from "vitest";
import { resolveLessonVideoView } from "./resolveLessonVideoView";
import type { ModuleVideo } from "@/types";

const readyFull: ModuleVideo = {
  status: "ready",
  full: {
    provider: "minio",
    providerId: "courses/react/phase-core/modules/react-core-m06.mp4",
  },
};

const readyTeaser: ModuleVideo = {
  status: "ready",
  teaser: { provider: "youtube", providerId: "abc123" },
};

const readyBoth: ModuleVideo = {
  status: "ready",
  teaser: { provider: "youtube", providerId: "abc123" },
  full: {
    provider: "minio",
    providerId: "courses/react/phase-core/modules/react-core-m06.mp4",
  },
};

describe("resolveLessonVideoView", () => {
  it("returns coming_soon when video is absent", () => {
    expect(
      resolveLessonVideoView({
        entitlementLoading: false,
        hasAccess: false,
      }),
    ).toBe("coming_soon");
  });

  it("returns incident for editorial status", () => {
    expect(
      resolveLessonVideoView({
        video: { status: "incident" },
        entitlementLoading: false,
        hasAccess: true,
      }),
    ).toBe("incident");
  });

  it("returns incident on playback error", () => {
    expect(
      resolveLessonVideoView({
        video: readyFull,
        entitlementLoading: false,
        hasAccess: true,
        playbackError: true,
      }),
    ).toBe("incident");
  });

  it("returns paywall when full exists without access", () => {
    expect(
      resolveLessonVideoView({
        video: readyFull,
        entitlementLoading: false,
        hasAccess: false,
      }),
    ).toBe("paywall");
  });

  it("returns teaser_only when only teaser exists", () => {
    expect(
      resolveLessonVideoView({
        video: readyTeaser,
        entitlementLoading: false,
        hasAccess: false,
      }),
    ).toBe("teaser_only");
  });

  it("returns ready when full exists with access", () => {
    expect(
      resolveLessonVideoView({
        video: readyBoth,
        entitlementLoading: false,
        hasAccess: true,
      }),
    ).toBe("ready");
  });

  it("returns loading while entitlement loads", () => {
    expect(
      resolveLessonVideoView({
        video: readyFull,
        entitlementLoading: true,
        hasAccess: false,
      }),
    ).toBe("loading");
  });
});
