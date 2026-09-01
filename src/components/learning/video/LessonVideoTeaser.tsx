import type { LessonVideo } from "@/types";
import { useT } from "@/i18n/useT";
import { LessonVideoShell } from "./LessonVideoShell";

interface LessonVideoTeaserProps {
  video: LessonVideo;
}

export function LessonVideoTeaser({ video }: LessonVideoTeaserProps) {
  const t = useT();

  if (video.provider !== "youtube" || !video.providerId?.trim()) {
    return null;
  }

  return (
    <LessonVideoShell
      title={video.title}
      durationSeconds={video.durationSeconds}
      label={t("video.teaser")}
    >
      <iframe
        title={video.title ?? t("learn.courseVideo")}
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.providerId)}`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </LessonVideoShell>
  );
}
