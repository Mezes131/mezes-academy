import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { academyStats, catalog, type CatalogCourse } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * Landing catalog section.
 * Displays all available tracks (active and upcoming)
 * in a <CourseCard /> grid.
 */
export function Catalog() {
  return (
    <section id="catalog" className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-3">
            <i className="fa-solid fa-layer-group mr-1.5" /> Catalogue
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Choisis par où tu veux commencer.
          </h2>
          <p className="mt-3 text-fg-2 max-w-xl leading-relaxed">
            {academyStats.coursesActive} parcours sont déjà ouverts, d&apos;autres
            arrivent. Chacun te prend par la main : une idée claire, un exercice
            tout de suite, et tu vois où tu en es.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:items-start">
          {catalog.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Private subcomponents ─────────────────────────────────── */

function CourseCard({ course }: { course: CatalogCourse }) {
  const isActive = course.status === "active";
  const cardInner = (
    <div
      className={cn(
        "group relative rounded-2xl border-base bg-bg-2 p-5 sm:p-6 transition",
        isActive
          ? "hover:border-accent/40 duration-200"
          : "opacity-80",
      )}
    >
      {/* Header: logo + title + badge on one row */}
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

      {/* Body: full width under the header */}
      <div className="mt-4">
        <p className="text-[13px] text-fg-2 font-mono">{course.tagline}</p>
        <p className="text-[13.5px] text-fg-2 leading-relaxed mt-2 line-clamp-4 sm:line-clamp-none">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
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

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-5 pt-4 border-t border-base text-[12px] font-mono text-fg-3">
        <span className="inline-flex items-center gap-1.5">
          <i className="fa-solid fa-signal text-fg-2" aria-hidden="true" /> {course.level}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="fa-regular fa-clock text-fg-2" aria-hidden="true" /> {course.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <i className="fa-solid fa-layer-group text-fg-2" aria-hidden="true" /> {course.modules}{" "}
          modules
        </span>
        {isActive && (
          <span className="sm:ml-auto text-accent-2 inline-flex items-center gap-1 font-semibold normal-case">
            Accéder
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

  if (isActive && course.href) {
    return (
      <Link to={course.href} className="block self-start">
        {cardInner}
      </Link>
    );
  }
  return <div aria-disabled="true" className="self-start">{cardInner}</div>;
}

function StatusBadge({
  status,
  eta,
}: {
  status: CatalogCourse["status"];
  eta?: string;
}) {
  if (status === "active") {
    return (
      <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-700/35 dark:border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
        En ligne
      </span>
    );
  }
  if (status === "soon") {
    return (
      <span className="text-[10px] font-mono uppercase tracking-wider bg-accent/10 text-accent-2 border border-accent/30 px-2 py-0.5 rounded-full">
        Bientôt{eta ? ` · ${eta}` : ""}
      </span>
    );
  }
  return (
    <span className="text-[10px] font-mono uppercase tracking-wider bg-bg-4 text-fg-3 border-base px-2 py-0.5 rounded-full">
      Prévu{eta ? ` · ${eta}` : ""}
    </span>
  );
}
