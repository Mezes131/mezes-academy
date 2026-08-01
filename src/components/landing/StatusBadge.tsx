import type { CatalogCourse } from "@/data/catalog";

export function StatusBadge({
  status,
  eta,
}: {
  status: CatalogCourse["status"];
  eta?: string;
}) {
  if (status === "active") {
    return (
      <span className="text-[10px] font-mono uppercase tracking-wider bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-700/35 dark:border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 dark:bg-emerald-400" />
        En ligne
      </span>
    );
  }
  if (status === "soon") {
    return (
      <span className="text-[10px] font-mono uppercase tracking-wider bg-accent/10 text-accent-2 border border-accent/30 px-2 py-0.5 rounded-full">
        Bientôt{eta ? ` · ${eta}` : ""}
      </span>
    );
  }
  return (
    <span className="text-[10px] font-mono uppercase tracking-wider bg-bg-4 text-fg-3 border-base px-2 py-0.5 rounded-full">
      Prévu{eta ? ` · ${eta}` : ""}
    </span>
  );
}
