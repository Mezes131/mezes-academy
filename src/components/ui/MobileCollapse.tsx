import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Secondary content: collapsed by default on mobile, always visible from `lg`.
 * Uses native <details> on small screens (no JS). Desktop renders children directly.
 */
export function MobileCollapse({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <details className="group rounded-xl border-base bg-bg-2 lg:hidden">
        <summary
          className={cn(
            "flex min-h-11 cursor-pointer list-none items-center gap-2 px-4 py-3",
            "text-[13px] font-semibold text-fg",
            "[&::-webkit-details-marker]:hidden",
          )}
        >
          {icon}
          <span className="min-w-0 flex-1">{title}</span>
          <ChevronDown
            size={16}
            className="shrink-0 text-fg-3 transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="border-t border-base px-4 py-4">{children}</div>
      </details>

      <div className="hidden lg:block">{children}</div>
    </div>
  );
}
