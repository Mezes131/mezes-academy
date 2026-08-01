import { NavLink, Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { stripLocalePrefix } from "@/i18n/localePath";
import { useT } from "@/i18n/useT";

export type BottomNavItem =
  | {
      kind: "link";
      to: string;
      end?: boolean;
      label: string;
      icon: LucideIcon;
      /** Match hash routes on landing (e.g. /#catalog). */
      hash?: string;
    }
  | {
      kind: "button";
      label: string;
      icon: LucideIcon;
      onClick: () => void;
      active?: boolean;
    };

/**
 * Fixed mobile bottom bar.
 * Max 5 items; icon + label; 44px targets.
 */
export function MobileBottomBar({
  items,
  /** Tailwind visibility, default hide from md up. Course uses lg:hidden. */
  hideFromClassName = "md:hidden",
}: {
  items: BottomNavItem[];
  hideFromClassName?: string;
}) {
  const t = useT();
  const location = useLocation();
  const barePath = stripLocalePrefix(location.pathname);

  return (
    <nav
      aria-label={t("common.mobileNav")}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] w-full max-w-full",
        hideFromClassName,
        "border-t-base bg-bg",
        "pb-[max(0.5rem,env(safe-area-inset-bottom))]",
      )}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1">
        {items.map((item) => {
          const Icon = item.icon;
          if (item.kind === "button") {
            return (
              <li key={item.label} className="flex-1 min-w-0">
                <button
                  type="button"
                  onClick={item.onClick}
                  aria-pressed={item.active}
                  className={cn(
                    "flex w-full min-h-14 flex-col items-center justify-center gap-0.5 px-1",
                    "text-[10px] font-medium tracking-wide",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-inset",
                    item.active ? "text-accent-2" : "text-fg-3",
                  )}
                >
                  <Icon size={20} strokeWidth={item.active ? 2.25 : 1.75} aria-hidden="true" />
                  <span className="truncate max-w-full">{item.label}</span>
                </button>
              </li>
            );
          }

          const hashActive =
            item.hash !== undefined &&
            barePath === "/" &&
            location.hash === item.hash;

          if (item.hash) {
            return (
              <li key={item.to} className="flex-1 min-w-0">
                <Link
                  to={item.to}
                  className={cn(
                    "flex w-full min-h-14 flex-col items-center justify-center gap-0.5 px-1",
                    "text-[10px] font-medium tracking-wide",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-inset",
                    hashActive ? "text-accent-2" : "text-fg-3",
                  )}
                >
                  <Icon size={20} strokeWidth={hashActive ? 2.25 : 1.75} aria-hidden="true" />
                  <span className="truncate max-w-full">{item.label}</span>
                </Link>
              </li>
            );
          }

          const isHome =
            item.end &&
            (item.to === "/" ||
              item.to === "/en" ||
              item.to.endsWith("/en") ||
              item.to.endsWith("/"));

          return (
            <li key={item.to} className="flex-1 min-w-0">
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => {
                  const active = isHome ? isActive && !location.hash : isActive;
                  return cn(
                    "flex w-full min-h-14 flex-col items-center justify-center gap-0.5 px-1",
                    "text-[10px] font-medium tracking-wide",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-inset",
                    active ? "text-accent-2" : "text-fg-3",
                  );
                }}
              >
                {({ isActive }) => {
                  const active = isHome ? isActive && !location.hash : isActive;
                  return (
                    <>
                      <Icon
                        size={20}
                        strokeWidth={active ? 2.25 : 1.75}
                        aria-hidden="true"
                      />
                      <span className="truncate max-w-full">{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
