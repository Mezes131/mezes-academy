import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Accordion with height animation. Pass already-translated strings.
 */
export function Faq({
  title,
  items,
  className,
}: {
  title?: string;
  items: FaqItem[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <section className={cn("min-w-0", className)} aria-label={title}>
      {title ? (
        <h2 className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold tracking-[-0.03em] text-fg">
          {title}
        </h2>
      ) : null}
      <div
        className={cn(
          "divide-y divide-[rgb(var(--border)/var(--border-alpha))] border-y-base",
          title && "mt-5",
        )}
      >
        {items.map((item) => (
          <FaqRow key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;

  return (
    <div className="py-1">
      <button
        type="button"
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 py-2 text-left text-[15px] font-medium text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        {item.question}
        <span
          className={cn(
            "shrink-0 text-fg-3 transition-transform duration-150 ease-[var(--ease-out)]",
            open && "rotate-45",
          )}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={cn("faq-panel", open && "faq-panel-open")}
        aria-hidden={!open}
      >
        <div className="faq-panel-inner">
          <p className="max-w-[65ch] pb-3 text-[14px] leading-[1.65] text-fg-2">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
