import type { ReactNode } from "react";

interface LessonVideoShellProps {
  title?: string;
  durationSeconds?: number;
  label?: string;
  children: ReactNode;
}

export function LessonVideoShell({
  title,
  durationSeconds,
  label,
  children,
}: LessonVideoShellProps) {
  return (
    <div className="my-6 w-full max-w-3xl overflow-hidden rounded-xl border-base bg-bg-2">
      {label && (
        <div className="border-b border-white/5 px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-fg-3">
          {label}
        </div>
      )}
      <div className="aspect-video w-full bg-bg-3">{children}</div>
      {title && (
        <div className="border-t border-white/5 px-4 py-3 text-sm font-medium text-fg-2">
          {title}
          {durationSeconds != null && (
            <span className="ml-2 font-mono text-[11px] text-fg-3">
              {Math.round(durationSeconds / 60)} min
            </span>
          )}
        </div>
      )}
    </div>
  );
}
