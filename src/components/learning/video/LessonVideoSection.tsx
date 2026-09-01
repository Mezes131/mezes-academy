import { useState } from "react";
import type { ModuleVideo } from "@/types";
import { useT } from "@/i18n/useT";
import { useEntitlement } from "@/hooks/useEntitlement";
import { VideoPaywall } from "@/components/billing/VideoPaywall";
import { resolveLessonVideoView } from "@/lib/video/resolveLessonVideoView";
import { LessonVideoState } from "./LessonVideoState";
import { LessonVideoTeaser } from "./LessonVideoTeaser";
import { LessonVideoPlayer } from "./LessonVideoPlayer";

interface LessonVideoSectionProps {
  video?: ModuleVideo;
  moduleId: string;
}

export function LessonVideoSection({ video, moduleId }: LessonVideoSectionProps) {
  const t = useT();
  const { hasAccess, loading } = useEntitlement("video_access");
  const [playbackError, setPlaybackError] = useState(false);

  const view = resolveLessonVideoView({
    video,
    entitlementLoading: loading,
    hasAccess,
    playbackError,
  });

  if (view === "incident") {
    return (
      <LessonVideoState
        mode="incident"
        posterUrl={video?.full?.posterUrl ?? video?.teaser?.posterUrl}
        onRetry={() => setPlaybackError(false)}
      />
    );
  }

  if (view === "coming_soon") {
    return (
      <LessonVideoState
        mode="coming_soon"
        posterUrl={video?.full?.posterUrl ?? video?.teaser?.posterUrl}
      />
    );
  }

  if (view === "loading") {
    return (
      <div className="my-6 aspect-video w-full max-w-3xl animate-pulse rounded-xl border-base bg-bg-2" />
    );
  }

  return (
    <div className="space-y-2">
      {video?.teaser?.providerId?.trim() && (
        <LessonVideoTeaser video={video.teaser} />
      )}
      {view === "paywall" && video?.full && <VideoPaywall video={video.full} />}
      {view === "teaser_only" && (
        <p className="text-sm text-fg-2">{t("video.fullComingSoon")}</p>
      )}
      {view === "ready" && video?.full && (
        <LessonVideoPlayer
          video={video.full}
          moduleId={moduleId}
          onError={() => setPlaybackError(true)}
        />
      )}
    </div>
  );
}
