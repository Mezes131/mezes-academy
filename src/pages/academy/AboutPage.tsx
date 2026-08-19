import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticleCanvas } from "@/components/ui/ParticleHero";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { ThesisDiff } from "@/components/academy/ThesisDiff";
import { MethodLesson } from "@/components/academy/MethodLesson";
import { useT } from "@/i18n/useT";
import { useLocale } from "@/i18n/LocaleProvider";
import { useLocalePath } from "@/i18n/useLocalePath";
import {
  FLAGSHIP_COURSE_PATH,
  REACT_COURSE_PATH,
} from "@/lib/flagshipContinue";
import { cn } from "@/lib/utils";
import stackSvc from "@/assets/about/stack-svc.png";
import stackReact from "@/assets/about/stack-react.png";

/**
 * About: each chapter fills the viewport minus the sticky nav.
 */
export function AboutPage() {
  const t = useT();
  const { locale } = useLocale();
  const lp = useLocalePath();

  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    document.title = t("academy.about.seoTitle");
    meta?.setAttribute("content", t("academy.about.seoDesc"));
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, [locale, t]);

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("academy.about.methodTitle"),
    description: t("academy.about.methodBody"),
    step: [
      {
        "@type": "HowToStep",
        name: t("academy.about.step1Title"),
        text: t("academy.about.step1Body"),
      },
      {
        "@type": "HowToStep",
        name: t("academy.about.step2Title"),
        text: t("academy.about.step2Body"),
      },
      {
        "@type": "HowToStep",
        name: t("academy.about.step3Title"),
        text: t("academy.about.step3Body"),
      },
    ],
  };

  return (
    <article className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }}
      />
      <section className="about-hero about-screen relative bg-bg text-fg">
        <ParticleCanvas />
        <div className="about-screen-inner pointer-events-none relative z-10 justify-center">
          <div className="about-hero-copy max-w-3xl">
            <p className="font-mono text-[12px] tracking-[0.08em] text-fg-3">
              {t("academy.about.name")}
            </p>
            <h1 className="mt-5 max-w-[14ch] text-[clamp(2.25rem,6.5vw,4.75rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-fg">
              {t("academy.about.title")}
            </h1>
            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-fg-2 md:text-[17px]">
              {t("academy.about.lead")}
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
              <Link to={lp(FLAGSHIP_COURSE_PATH)}>
                <Button size="md">
                  {t("landing.ctaSvc")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </Link>
              <Link to={lp(REACT_COURSE_PATH)}>
                <Button variant="ghost" size="md">
                  {t("landing.ctaReact")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-screen about-rise">
        <div className="about-screen-inner min-h-0 flex-col gap-8 overflow-hidden lg:max-w-none lg:flex-row lg:items-stretch lg:gap-12 lg:px-10 lg:py-6">
          <div className="shrink-0 lg:flex lg:min-w-0 lg:flex-1 lg:basis-0 lg:flex-col lg:justify-center">
            <p className="font-mono text-[12px] tracking-[0.08em] text-accent-2">
              {t("academy.about.thesisLabel")}
            </p>
            <h2 className="mt-3 max-w-[20ch] text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg">
              {t("academy.about.thesisTitle")}
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.7] text-fg-2 md:text-[16px]">
              {t("academy.about.thesisLead")}
            </p>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.7] text-fg-2 md:text-[16px]">
              {t("academy.about.thesisBody")}
            </p>
          </div>
          <ThesisDiff className="lg:h-[88%] lg:min-w-0 lg:flex-1 lg:basis-0 lg:self-center" />
        </div>
      </section>

      <section id="methode" className="about-screen about-rise">
        <div className="about-screen-inner min-h-0 flex-col gap-8 overflow-hidden lg:max-w-none lg:flex-row lg:items-stretch lg:gap-12 lg:px-10 lg:py-6">
          <div className="shrink-0 lg:order-2 lg:flex lg:min-w-0 lg:flex-1 lg:basis-0 lg:flex-col lg:justify-center">
            <p className="font-mono text-[12px] tracking-[0.08em] text-accent-2">
              {t("academy.about.methodKicker")}
            </p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg">
              {t("academy.about.methodTitle")}
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-[1.7] text-fg-2 md:text-[16px]">
              {t("academy.about.methodBody")}
            </p>
          </div>
          <MethodLesson className="lg:order-1 lg:h-[88%] lg:min-w-0 lg:flex-1 lg:basis-0 lg:self-center" />
        </div>
      </section>

      <TrackPane
        index="03"
        label={t("academy.about.tracksLabel")}
        image={stackSvc}
        alt={t("academy.about.imgSvcAlt")}
        title={t("academy.about.svcTitle")}
        body={t("academy.about.svcBody")}
        href={lp(FLAGSHIP_COURSE_PATH)}
        cta={t("academy.about.svcCta")}
      />
      <TrackPane
        reverse
        image={stackReact}
        alt={t("academy.about.imgReactAlt")}
        title={t("academy.about.reactTitle")}
        body={t("academy.about.reactBody")}
        href={lp(REACT_COURSE_PATH)}
        cta={t("academy.about.reactCta")}
      />

      <section className="about-screen about-rise">
        <div className="about-screen-inner min-h-0 justify-center">
          <ClosingCta className="w-full" />
        </div>
      </section>
    </article>
  );
}

function Still({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "about-still relative min-h-0 min-w-0 flex-1 overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

function TrackPane({
  index,
  label,
  image,
  alt,
  title,
  body,
  href,
  cta,
  reverse = false,
}: {
  index?: string;
  label?: string;
  image: string;
  alt: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  reverse?: boolean;
}) {
  return (
    <section className="about-screen about-rise">
      <div className="about-screen-inner min-h-0 gap-6 overflow-hidden lg:flex-row lg:gap-12">
        <Still className={reverse ? "lg:order-2" : undefined}>
          <img
            src={image}
            alt={alt}
            width={720}
            height={960}
            loading="lazy"
            decoding="async"
          />
        </Still>
        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col justify-center overflow-y-auto",
            reverse && "lg:order-1",
          )}
        >
          {index && label ? (
            <p className="font-mono text-[12px] tabular-nums tracking-[0.08em] text-accent-2">
              {index} {label}
            </p>
          ) : null}
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg">
            {title}
          </h2>
          <p className="mt-4 max-w-[42ch] text-[16px] leading-[1.65] text-fg-2">
            {body}
          </p>
          <Link to={href} className="mt-6 inline-flex">
            <Button size="md">
              {cta}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
