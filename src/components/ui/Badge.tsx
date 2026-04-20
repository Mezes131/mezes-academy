import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warn" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide border",
        variant === "default" && "bg-bg-3 text-fg-2 border-base",
        variant === "success" &&
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        variant === "warn" &&
          "bg-amber-500/10 text-amber-400 border-amber-500/20",
        variant === "accent" &&
          "bg-accent/10 text-accent-2 border-accent/20",
        className,
      )}
    >
      {children}
    </span>
  );
}
