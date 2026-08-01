import { academyStats, catalog } from "@/data/catalog";
import { CourseCard } from "./CourseCard";

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

        <div className="grid gap-4 md:grid-cols-2">
          {catalog.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
