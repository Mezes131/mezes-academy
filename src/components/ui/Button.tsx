import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "subtle" | "danger";
  size?: "sm" | "md";
  leftIcon?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  leftIcon,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        size === "sm" ? "text-[13px] px-3 h-8" : "text-sm px-4 h-10",
        variant === "primary" &&
          "bg-accent text-white hover:bg-accent/90 shadow-soft",
        variant === "ghost" &&
          "bg-transparent border-base hover:bg-bg-3 text-fg",
        variant === "subtle" && "bg-bg-3 hover:bg-bg-4 text-fg",
        variant === "danger" &&
          "bg-transparent border border-red-500/40 text-red-400 hover:bg-red-500/10",
        className,
      )}
      {...rest}
    >
      {leftIcon}
      {children}
    </button>
  );
}
