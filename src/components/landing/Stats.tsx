import { Link } from "react-router-dom";
import { ArrowRight, Atom, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import {
  FLAGSHIP_COURSE_PATH,
  REACT_COURSE_PATH,
} from "@/lib/flagshipContinue";

/**
 * Landing closing CTA. One job: get the learner into a track.
 */
export function Stats() {
  const t = useT();
  const lp = useLocalePath();

  return (
    <section className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl border-base bg-bg-2 p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("landing.ctaTitle")}
          </h2>
          <p className="mt-3 text-fg-2 max-w-xl mx-auto leading-relaxed">
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
      </div>
    </section>
  );
}
