import { Link, useParams, Navigate } from "react-router-dom";
import { findAreaModule, useCourseArea } from "@/components/layout/courseArea";
import { ModuleView } from "@/components/learning/ModuleView";
import { useT } from "@/i18n/useT";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ModulePage() {
  const t = useT();
  const { moduleId } = useParams<{ moduleId: string }>();
  const area = useCourseArea();
  const { basePath, phases } = area;
  const found = moduleId ? findAreaModule(area, moduleId) : undefined;

  if (!found) return <Navigate to={basePath} replace />;

  const { phase, module } = found;

  // Find previous and next modules across all phases
  const flatModules = phases.flatMap((p) =>
    p.modules.map((m) => ({ phaseId: p.id, moduleId: m.id, title: m.title })),
  );
  const idx = flatModules.findIndex((m) => m.moduleId === module.id);
  const prev = idx > 0 ? flatModules[idx - 1] : undefined;
  const next = idx < flatModules.length - 1 ? flatModules[idx + 1] : undefined;

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
      {/* `key` forces a full remount of ModuleView (and its stateful
          children like <Quiz />) when navigating between modules. Without
          it, React reuses the previous instance and internal state
          (submitted quiz, selected answers, …) leaks across modules. */}
      <ModuleView key={module.id} phase={phase} module={module} />

      {/* ─── Previous / next navigation ──────── */}
      <div className="mt-10 pt-6 flex items-stretch gap-3">
        {prev ? (
          <Link
            to={`${basePath}/module/${prev.moduleId}`}
            className={cn(
              "flex-1 group rounded-lg border-base bg-bg-2 p-4 hover:border-accent/30 transition",
              "flex items-center gap-3 text-left",
            )}
          >
            <div className="min-w-0">
              <div className="flex text-[11px] font-mono uppercase tracking-wider text-fg-3">
                <ChevronLeft
                  size={18}
                  className="text-fg-3 group-hover:text-fg transition flex-shrink-0"
                />
                {t("common.previous")}
              </div>
              <div className="text-sm font-semibold truncate">{prev.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            to={`${basePath}/module/${next.moduleId}`}
            className={cn(
              "flex-1 group rounded-lg border-base bg-bg-2 p-4 hover:border-accent/30 transition",
              "flex items-center gap-3 text-right justify-end",
            )}
          >
            <div className="min-w-0 text-right">
              <div className="flex text-[11px] font-mono uppercase tracking-wider text-fg-3">
                {t("common.next")}
                <ChevronRight
                  size={18}
                  className="text-fg-3 group-hover:text-fg transition flex-shrink-0"
                />
              </div>
              <div className="text-sm font-semibold truncate">{next.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}
