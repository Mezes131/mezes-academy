import type { ModuleVideo } from "@/types";

export type LessonVideoViewState =
  | "incident"
  | "coming_soon"
  | "teaser_only"
  | "paywall"
  | "loading"
  | "ready";

export interface ResolveLessonVideoViewInput {
  video?: ModuleVideo;
  entitlementLoading: boolean;
  hasAccess: boolean;
  playbackError?: boolean;
}

export function resolveLessonVideoView(
  input: ResolveLessonVideoViewInput,
): LessonVideoViewState {
  if (input.playbackError) return "incident";
  if (!input.video) return "coming_soon";
  if (input.video.status === "incident") return "incident";
  if (input.video.status === "coming_soon") return "coming_soon";

  const hasTeaser = Boolean(input.video.teaser?.providerId?.trim());
  const hasFull = Boolean(input.video.full?.providerId?.trim());

  if (!hasTeaser && !hasFull) return "coming_soon";
  if (input.entitlementLoading) return "loading";
  if (hasFull && !input.hasAccess) return "paywall";
  if (!hasFull && hasTeaser) return "teaser_only";
  return "ready";
}
