import { AlertTriangle, Clock } from "lucide-react";
import { useT } from "@/i18n/useT";
import { Button } from "@/components/ui/Button";
import { LessonVideoShell } from "./LessonVideoShell";

interface LessonVideoStateProps {
  mode: "coming_soon" | "incident";
  posterUrl?: string;
  onRetry?: () => void;
}

export function LessonVideoState({
  mode,
  posterUrl,
  onRetry,
}: LessonVideoStateProps) {
  const t = useT();
  const isIncident = mode === "incident";

  return (
    <LessonVideoShell>
      <div
        className="relative flex h-full min-h-[12rem] flex-col items-center justify-center gap-4 px-6 py-10 text-center"
        style={
          posterUrl
            ? {
                backgroundImage: `url(${posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {posterUrl && <div className="absolute inset-0 bg-bg/85 backdrop-blur-[2px]" />}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-bg-2">
            {isIncident ? (
              <AlertTriangle size={20} className="text-amber-400" />
            ) : (
              <Clock size={20} className="text-fg-3" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-fg">
              {isIncident ? t("video.incident.title") : t("video.comingSoon.title")}
            </p>
            <p className="mt-1 max-w-sm text-[13px] text-fg-2">
              {isIncident ? t("video.incident.body") : t("video.comingSoon.body")}
            </p>
          </div>
          {isIncident && onRetry && (
            <Button type="button" variant="subtle" onClick={onRetry}>
              {t("video.error.retry")}
            </Button>
          )}
        </div>
      </div>
    </LessonVideoShell>
  );
}
