import { Link } from "react-router-dom";
import { ArrowRight, Atom, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import {
  FLAGSHIP_COURSE_PATH,
  REACT_COURSE_PATH,
} from "@/lib/flagshipContinue";
import { cn } from "@/lib/utils";

/**
 * Shared closing CTA: one job, get the learner into a track.
 */
export function ClosingCta({ className }: { className?: string }) {
  const t = useT();
  const lp = useLocalePath();

  return (
    <div
      className={cn(
        "rounded-2xl border-base bg-bg-2 p-10 text-center md:p-14",
        className,
      )}
    >
      <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
        {t("landing.ctaTitle")}
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-fg-2">
        {t("landing.ctaBody")}
      </p>
      <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2">
        <Link to={lp(FLAGSHIP_COURSE_PATH)}>
          <Button>
            <Shield size={16} aria-hidden="true" />
            {t("landing.ctaOpenSvc")}
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </Link>
        <Link to={lp(REACT_COURSE_PATH)}>
          <Button variant="ghost" className="border border-violet-500/40">
            <Atom
              size={16}
              className="text-violet-600 dark:text-violet-400"
              aria-hidden="true"
            />
            {t("landing.ctaOpenReact")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

/** Landing-page wrapper: vertical padding around the CTA card. */
export function ClosingCtaSection({ className }: { className?: string }) {
  return (
    <section className={cn("relative py-12 md:py-20", className)}>
      <div className="mx-auto max-w-6xl px-6">
        <ClosingCta />
      </div>
    </section>
  );
}
