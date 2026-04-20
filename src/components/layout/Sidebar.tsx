import { NavLink } from "react-router-dom";
import { phases } from "@/data/phases";
import { useProgress } from "@/hooks/useProgress";
import { cn, phaseAccent } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

/**
 * Sidebar navigation : affiche les phases et leurs modules avec état
 * de progression (lu / non lu).
 */
export function Sidebar() {
  const { progress } = useProgress();

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-base bg-bg-2/40 px-4 py-6 overflow-y-auto sticky top-14 self-start max-h-[calc(100vh-3.5rem)]">
      <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-3 px-2">
        Parcours
      </div>
      <nav className="space-y-4">
        {phases.map((phase) => {
          const accent = phaseAccent(phase.color);
          return (
            <div key={phase.id}>
              <NavLink
                to={`/phase/${phase.id}`}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] font-semibold transition",
                    isActive
                      ? cn(accent.bg, accent.text)
                      : cn("text-fg hover:bg-bg-3", accent.text),
                  )
                }
              >
                <i className={`fa-solid ${phase.icon} w-4 text-center`} />
                <span className="flex-1 truncate">{phase.label}</span>
                {phase.scaffoldOnly && (
                  <span className="text-[9px] font-mono uppercase bg-bg-4 text-fg-3 px-1.5 py-0.5 rounded">
                    wip
                  </span>
                )}
              </NavLink>
              <ul className="mt-1 ml-3 space-y-0.5 border-l border-base pl-2">
                {phase.modules.map((mod) => {
                  const isRead = progress.readModules.includes(mod.id);
                  return (
                    <li key={mod.id}>
                      <NavLink
                        to={`/module/${mod.id}`}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded text-[12px] transition",
                            isActive
                              ? "text-fg bg-bg-3 font-medium"
                              : "text-fg-2 hover:text-fg hover:bg-bg-3/60",
                          )
                        }
                      >
                        <span className="font-mono text-[10px] text-fg-3 w-8 flex-shrink-0">
                          {mod.index}
                        </span>
                        <span className="flex-1 truncate">{mod.title}</span>
                        {isRead && (
                          <CheckCircle2
                            size={12}
                            className="text-emerald-400 flex-shrink-0"
                          />
                        )}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
