import { NavLink } from "react-router-dom";
import { phases } from "@/data/phases";
import { useProgress } from "@/hooks/useProgress";
import { cn, phaseAccent } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

/**
 * Sidebar navigation: displays phases and modules with
 * progress status (read / unread).
 */
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { progress } = useProgress();

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile/tablet overlay */}
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] transition lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      />

      {/* Sidebar panel (drawer on mobile, static rail on desktop) */}
      <aside
        className={cn(
          "fixed lg:sticky top-[6.5rem] left-0 z-40 lg:z-auto h-[calc(100vh-6.5rem)]",
          "w-72 flex-shrink-0 bg-bg-2/95 lg:bg-bg-2/40",
          "py-6 overflow-y-auto transition-all duration-200 ease-out",
          isOpen ? "border-r border-base px-4 lg:w-72" : "px-4 border-r border-base lg:w-0 lg:px-0 lg:border-r-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:-translate-x-full",
        )}
      >
        <div
          className={cn(
            "text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-3 px-2 transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 lg:opacity-0",
          )}
        >
          Track
        </div>
        <nav
          className={cn(
            "space-y-4 transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 lg:pointer-events-none",
          )}
        >
          {phases.map((phase) => {
            const accent = phaseAccent(phase.color);
            return (
              <div key={phase.id}>
                <NavLink
                  to={`/react/phase/${phase.id}`}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
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
                          to={`/react/module/${mod.id}`}
                          onClick={() => {
                            if (window.innerWidth < 1024) onClose();
                          }}
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
    </>
  );
}
