import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { catalog, type CatalogCourse } from "@/data/catalog";
import { cn } from "@/lib/utils";

/**
 * Section catalogue de la landing.
 * Affiche tous les parcours disponibles (actifs et \u00e0 venir) sous forme
 * d'une grille de <CourseCard />.
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
            Un parcours actif,{" "}
            <span className="text-fg-2">plusieurs en préparation.</span>
          </h2>
          <p className="mt-3 text-fg-2 max-w-xl">
            Chaque parcours couvre un sujet de bout en bout : théorie,
            exercices, mini-projets et projets finaux.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {catalog.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sous-composants privés ─────────────────────────────────── */

function CourseCard({ course }: { course: CatalogCourse }) {
  const isActive = course.status === "active";
  const cardInner = (
    <div
      className={cn(
        "group relative h-full rounded-2xl border-base bg-bg-2 p-6 transition overflow-hidden",
        isActive
          ? "hover:border-accent/40 hover:-translate-y-0.5 duration-200"
          : "opacity-80",
      )}
    >
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition"
          style={{
            background:
              "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgb(108 99 255 / 0.08), transparent 40%)",
          }}
        />
      )}

      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl border",
            course.accent.bg,
            course.accent.text,
            course.accent.border,
          )}
        >
          <i className={`${course.iconFamily ?? "fa-solid"} ${course.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={cn("text-lg font-bold", course.accent.text)}>
              {course.title}
            </h3>
            <StatusBadge status={course.status} eta={course.eta} />
          </div>
          <p className="text-[13px] text-fg-3 font-mono mt-0.5">
            {course.tagline}
          </p>
          <p className="text-[13.5px] text-fg-2 leading-relaxed mt-3">
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
      </div>

      <div className="flex items-center gap-5 mt-6 pt-4 border-t border-base text-[12px] font-mono text-fg-3">
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-signal text-fg-2" /> {course.level}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa-regular fa-clock text-fg-2" /> {course.duration}
        </span>
        <span className="flex items-center gap-1.5">
          <i className="fa-solid fa-layer-group text-fg-2" /> {course.modules}{" "}
          modules
        </span>
        {isActive && (
          <span className="ml-auto text-accent-2 flex items-center gap-1 font-semibold normal-case">
            Accéder
            <ArrowRight
              size={13}
              className="group-hover:translate-x-0.5 transition"
            />
          </span>
        )}
      </div>
    </div>
  );

  if (isActive && course.href) {
    return (
      <Link to={course.href} className="block">
        {cardInner}
      </Link>
    );
  }
  return <div aria-disabled="true">{cardInner}</div>;
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
      <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
