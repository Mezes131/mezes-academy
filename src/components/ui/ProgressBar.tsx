import { cn, phaseAccent } from "@/lib/utils";
import type { PhaseColor } from "@/types";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: PhaseColor;
  showLabel?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function ProgressBar({
  value,
  max = 100,
  color = "core",
  showLabel = false,
  className,
  size = "md",
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const accent = phaseAccent(color);
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "w-full rounded-full overflow-hidden bg-bg-3 border-base",
          size === "sm" ? "h-1.5" : "h-2",
        )}
      >
        <div
          className={cn("h-full transition-all duration-500 rounded-full", accent.dot)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1.5 text-[11px] font-mono text-fg-3 flex justify-between">
          <span>
            {value} / {max}
          </span>
          <span className={accent.text}>{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
}
