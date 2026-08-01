import { academyStats, getCatalog } from "@/data/catalog";
import { useT } from "@/i18n/useT";
import { useLocale } from "@/i18n/LocaleProvider";
import { CourseCard } from "./CourseCard";

/**
 * Landing catalog section.
 * Displays all available tracks (active and upcoming)
 * in a <CourseCard /> grid.
 */
export function Catalog() {
  const t = useT();
  const { locale } = useLocale();
  const courses = getCatalog(locale);
  const body = t("landing.catalogBody").replace(
    "{count}",
    String(academyStats.coursesActive),
  );

  return (
    <section id="catalog" className="relative py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-fg-3 mb-3">
            <i className="fa-solid fa-layer-group mr-1.5" /> {t("landing.catalogEyebrow")}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t("landing.catalogTitle")}
          </h2>
          <p className="mt-3 text-fg-2 max-w-xl leading-relaxed">{body}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
