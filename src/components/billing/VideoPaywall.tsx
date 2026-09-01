import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock, Play } from "lucide-react";
import type { LessonVideo } from "@/types";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { trackBillingEvent } from "@/lib/analytics";

interface VideoPaywallProps {
  video: LessonVideo;
}

export function VideoPaywall({ video }: VideoPaywallProps) {
  const t = useT();
  const lp = useLocalePath();
  const { profile } = useAuth();
  const trialAvailable = profile?.trialUsed === false;

  useEffect(() => {
    trackBillingEvent("video_paywall_view", { has_trial: trialAvailable });
  }, [trialAvailable]);

  function onCtaClick() {
    trackBillingEvent("video_paywall_cta_click", {
      cta: trialAvailable ? "trial" : "subscribe",
    });
  }

  return (
    <div className="my-6 w-full max-w-3xl overflow-hidden rounded-xl border-base bg-bg-2">
      <div
        className="relative aspect-video flex items-center justify-center bg-bg-3"
        style={
          video.posterUrl
            ? {
                backgroundImage: `url(${video.posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-bg/80 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-bg-2">
            <Lock size={20} className="text-accent-2" />
          </div>
          <div>
            <p className="text-sm font-semibold text-fg">
              {t("billing.paywall.title")}
            </p>
            <p className="mt-1 max-w-sm text-[13px] text-fg-2">
              {t("billing.paywall.body")}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to={lp("/pricing")} onClick={onCtaClick}>
              <Button>
                <Play size={14} />
                {trialAvailable
                  ? t("billing.paywall.ctaTrial")
                  : t("billing.paywall.ctaSubscribe")}
              </Button>
            </Link>
            <Link
              to={lp("/pricing")}
              onClick={onCtaClick}
              className="text-[13px] text-fg-2 underline-offset-2 hover:text-fg hover:underline"
            >
              {t("billing.paywall.ctaPricing")}
            </Link>
          </div>
        </div>
      </div>
      {video.title && (
        <div className="border-t border-white/5 px-4 py-3 text-sm font-medium text-fg-2">
          {video.title}
          {video.durationSeconds != null && (
            <span className="ml-2 font-mono text-[11px] text-fg-3">
              {Math.round(video.durationSeconds / 60)} min
            </span>
          )}
        </div>
      )}
    </div>
  );
}
