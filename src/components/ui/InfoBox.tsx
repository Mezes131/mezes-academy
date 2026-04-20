import { cn } from "@/lib/utils";
import type { InfoBoxVariant } from "@/types";

const VARIANTS: Record<
  InfoBoxVariant,
  { border: string; bg: string; title: string }
> = {
  tip: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-500/5",
    title: "text-emerald-400",
  },
  warn: {
    border: "border-l-amber-500",
    bg: "bg-amber-500/5",
    title: "text-amber-400",
  },
  note: {
    border: "border-l-sky-500",
    bg: "bg-sky-500/5",
    title: "text-sky-400",
  },
  concept: {
    border: "border-l-violet-500",
    bg: "bg-violet-500/5",
    title: "text-violet-300",
  },
};

export function InfoBox({
  variant,
  title,
  body,
}: {
  variant: InfoBoxVariant;
  title: string;
  body: string;
}) {
  const v = VARIANTS[variant];
  return (
    <div
      className={cn(
        "rounded-lg px-5 py-4 my-4 border-l-[3px]",
        v.border,
        v.bg,
      )}
    >
      <div
        className={cn(
          "text-[11px] font-bold tracking-[0.1em] uppercase mb-1.5",
          v.title,
        )}
      >
        {title}
      </div>
      <p
        className="text-[13px] text-fg-2 leading-relaxed [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-bg-3 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
}
