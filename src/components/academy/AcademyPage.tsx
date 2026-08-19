import type { ReactNode } from "react";

/**
 * Shared shell for academy prose pages (about, contact, legal).
 */
export function AcademyPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <div className="max-w-[72ch]">
        <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-fg-3">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 text-lg leading-relaxed text-fg-2">{lead}</p>
        ) : null}
        <div className="mt-10 space-y-5 text-[17px] leading-relaxed text-fg-2">
          {children}
        </div>
      </div>
    </article>
  );
}
