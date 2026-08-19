import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ParticleCanvas } from "@/components/ui/ParticleHero";
import { ClosingCta } from "@/components/landing/ClosingCta";
import { ThesisDiff } from "@/components/academy/ThesisDiff";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import {
  FLAGSHIP_COURSE_PATH,
  REACT_COURSE_PATH,
} from "@/lib/flagshipContinue";
import { cn } from "@/lib/utils";
import orbitRead from "@/assets/about/orbit-read.png";
import orbitPractice from "@/assets/about/orbit-practice.png";
import orbitValidate from "@/assets/about/orbit-validate.png";
import stackSvc from "@/assets/about/stack-svc.png";
import stackReact from "@/assets/about/stack-react.png";

type Step = {
  id: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

/**
 * About: each chapter fills the viewport minus the sticky nav.
 */
export function AboutPage() {
  const t = useT();
  const lp = useLocalePath();

  const steps: Step[] = [
    {
      id: "read",
      title: t("academy.about.step1Title"),
      body: t("academy.about.step1Body"),
      image: orbitRead,
      alt: t("academy.about.imgReadAlt"),
    },
    {
      id: "practice",
      title: t("academy.about.step2Title"),
      body: t("academy.about.step2Body"),
      image: orbitPractice,
      alt: t("academy.about.imgPracticeAlt"),
    },
    {
      id: "validate",
      title: t("academy.about.step3Title"),
      body: t("academy.about.step3Body"),
      image: orbitValidate,
      alt: t("academy.about.imgValidateAlt"),
    },
  ];

  return (
    <article className="about-page">
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

      <section className="about-screen about-rise">
        <div className="about-screen-inner min-h-0">
          <div className="shrink-0">
            <p className="font-mono text-[12px] tabular-nums tracking-[0.08em] text-accent-2">
              02 {t("academy.about.methodLabel")}
            </p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg">
              {t("academy.about.methodTitle")}
            </h2>
            <p className="mt-3 max-w-[58ch] text-[15px] leading-[1.65] text-fg-2 md:text-[16px]">
              {t("academy.about.methodBody")}
            </p>
          </div>
          <MethodBoard steps={steps} label={t("academy.about.methodLabel")} />
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

function MethodBoard({ steps, label }: { steps: Step[]; label: string }) {
  const [active, setActive] = useState(0);
  const current = steps[active] ?? steps[0];

  return (
    <div className="mt-5 grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-5 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-none lg:gap-10">
      <div
        role="tablist"
        aria-label={label}
        className="flex min-h-0 flex-col overflow-y-auto"
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            setActive((i) => (i + 1) % steps.length);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            setActive((i) => (i - 1 + steps.length) % steps.length);
          }
        }}
      >
        {steps.map((step, index) => {
          const selected = index === active;
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`about-method-tab-${step.id}`}
              aria-selected={selected}
              aria-controls="about-method-panel"
              onClick={() => setActive(index)}
              className={cn(
                "min-h-11 border-t-base px-0 py-4 text-left",
                "transition-colors duration-200 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
                index === steps.length - 1 && "border-b-base",
              )}
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[12px] tabular-nums text-accent-2">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-base font-bold tracking-tight transition-colors duration-200 ease-out md:text-lg",
                    selected ? "text-fg" : "text-fg-3",
                  )}
                >
                  {step.title}
                </span>
              </span>
              {selected ? (
                <span className="mt-2 block max-w-[46ch] pl-8 text-[14px] leading-relaxed text-fg-2 md:text-[15px]">
                  {step.body}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        id="about-method-panel"
        role="tabpanel"
        aria-labelledby={`about-method-tab-${current.id}`}
        className="about-still relative min-h-0 overflow-hidden"
      >
        {steps.map((step) => (
          <img
            key={step.id}
            src={step.image}
            alt={step.id === current.id ? step.alt : ""}
            width={800}
            height={640}
            decoding="async"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-top",
              "transition-opacity duration-500 ease-out",
              step.id === current.id ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
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
