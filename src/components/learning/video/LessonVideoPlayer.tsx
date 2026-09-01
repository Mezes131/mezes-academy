import type { LessonVideo } from "@/types";
import { useT } from "@/i18n/useT";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";
import { trackBillingEvent } from "@/lib/analytics";
import { LessonVideoShell } from "./LessonVideoShell";
import { LessonVideoState } from "./LessonVideoState";

interface LessonVideoPlayerProps {
  video: LessonVideo;
  moduleId: string;
  onError?: () => void;
}

export function LessonVideoPlayer({
  video,
  moduleId,
  onError,
}: LessonVideoPlayerProps) {
  const t = useT();
  const { url, loading, error, retry } = useVideoPlayback(video.providerId);

  if (loading) {
    return (
      <div className="my-6 aspect-video w-full max-w-3xl animate-pulse rounded-xl border-base bg-bg-2" />
    );
  }

  if (error || !url) {
    return (
      <LessonVideoState
        mode="incident"
        posterUrl={video.posterUrl}
        onRetry={() => {
          retry();
        }}
      />
    );
  }

  return (
    <LessonVideoShell
      title={video.title}
      durationSeconds={video.durationSeconds}
      label={t("video.fullLesson")}
    >
      <video
        controls
        playsInline
        poster={video.posterUrl}
        src={url}
        className="h-full w-full"
        onPlay={() =>
          trackBillingEvent("video_play_start", {
            module_id: moduleId,
            provider: video.provider,
          })
        }
        onError={() => {
          trackBillingEvent("video_play_error", {
            module_id: moduleId,
            provider: video.provider,
          });
          onError?.();
        }}
      />
    </LessonVideoShell>
  );
}
