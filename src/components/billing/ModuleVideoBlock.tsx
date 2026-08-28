import type { LessonVideo } from "@/types";
import { useT } from "@/i18n/useT";
import { useEntitlement } from "@/hooks/useEntitlement";
import { VideoPaywall } from "@/components/billing/VideoPaywall";

interface ModuleVideoBlockProps {
  video: LessonVideo;
}

export function ModuleVideoBlock({ video }: ModuleVideoBlockProps) {
  const t = useT();
  const { hasAccess, loading } = useEntitlement("video_access");

  if (!video.providerId?.trim()) return null;

  if (loading) {
    return (
      <div className="my-6 aspect-video w-full max-w-3xl animate-pulse rounded-xl border-base bg-bg-2" />
    );
  }

  if (!hasAccess) {
    return <VideoPaywall video={video} />;
  }

  if (video.provider === "youtube") {
    return (
      <div className="my-6 aspect-video w-full max-w-3xl overflow-hidden rounded-xl border-base bg-bg-2">
        <iframe
          title={video.title ?? t("learn.courseVideo")}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.providerId)}`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <a
      href={video.providerId}
      target="_blank"
      rel="noreferrer"
      className="my-6 flex items-center gap-3 rounded-xl border-base bg-bg-2 p-4 text-sm font-semibold transition hover:bg-bg-3"
    >
      <i className="fa-solid fa-play text-accent-2" />
      {video.title ?? t("learn.openVideo")}
      {video.durationSeconds != null && (
        <span className="ml-auto font-mono text-[11px] text-fg-3">
          {Math.round(video.durationSeconds / 60)} min
        </span>
      )}
    </a>
  );
}
