import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CatalogCourse } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import { StatusBadge } from "./StatusBadge";

export function CourseCard({ course }: { course: CatalogCourse }) {
  const t = useT();
  const lp = useLocalePath();
  const isActive = course.status === "active";
  const href = course.href ? lp(course.href) : undefined;

  const cardInner = (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border-base bg-bg-2 p-5 sm:p-6 transition",
        isActive ? "hover:border-accent/40 duration-200" : "opacity-80",
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl border",
            course.accent.bg,
            course.accent.text,
            course.accent.border,
          )}
        >
          <i
            className={`${course.iconFamily ?? "fa-solid"} ${course.icon}`}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
          <h3
            className={cn(
              "text-base sm:text-lg font-bold leading-snug",
              course.accent.text,
            )}
          >
            {course.title}
          </h3>
          <StatusBadge status={course.status} eta={course.eta} />
        </div>
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <p className="text-[13px] text-fg-2 font-mono">{course.tagline}</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-fg-2 line-clamp-4 sm:line-clamp-none">
          {course.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-bg-3 text-fg-2 border-base"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t-base pt-4 text-[12px] font-mono text-fg-3">
        <span className="inline-flex items-center gap-1.5">
          <i className="fa-solid fa-signal text-fg-2" aria-hidden="true" />{" "}
          {course.level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="fa-regular fa-clock text-fg-2" aria-hidden="true" />{" "}
          {course.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="fa-solid fa-layer-group text-fg-2" aria-hidden="true" />{" "}
          {course.modules} {t("common.modules")}
        </span>
        {isActive && (
          <span className="sm:ml-auto text-accent-2 inline-flex items-center gap-1 font-semibold normal-case">
            {t("common.access")}
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition"
              aria-hidden="true"
            />
          </span>
        )}
      </div>
    </div>
  );

  if (isActive && href) {
    return (
      <Link to={href} className="block h-full">
        {cardInner}
      </Link>
    );
  }
  return (
    <div aria-disabled="true" className="h-full">
      {cardInner}
    </div>
  );
}
