import type { LessonVideo } from "@/types";
import { useT } from "@/i18n/useT";
import { LessonVideoSection } from "@/components/learning/video/LessonVideoSection";

interface ModuleVideoBlockProps {
  video: LessonVideo;
}

/** Legacy content-block video — delegates to LessonVideoSection when possible. */
export function ModuleVideoBlock({ video }: ModuleVideoBlockProps) {
  const t = useT();

  if (!video.providerId?.trim()) return null;

  if (video.provider === "youtube") {
    return (
      <LessonVideoSection
        moduleId=""
        video={{ status: "ready", teaser: video }}
      />
    );
  }

  if (video.provider === "minio") {
    return (
      <LessonVideoSection
        moduleId=""
        video={{ status: "ready", full: video }}
      />
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
