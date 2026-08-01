import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CloudOff,
  Loader2,
  RefreshCw,
  UploadCloud,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/useT";
import type { MessageKey } from "@/i18n/useT";
import { useProgress, type SyncState, type SyncStatus } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

interface SyncStatusBadgeProps {
  /** Compact pill (topbar) vs. full card (progress page). */
  variant?: "pill" | "card";
  className?: string;
}

/**
 * Visible indicator of the local ↔ backend sync state.
 * - Shows a transient "Synchronisé" pulse after a save.
 * - Surfaces one-shot migration messages distinctly.
 * - Offers a manual retry when sync is in error/offline state.
 */
export function SyncStatusBadge({
  variant = "pill",
  className,
}: SyncStatusBadgeProps) {
  const { user } = useAuth();
  const { sync, forceSync } = useProgress();
  const t = useT();

  if (!user) return null;

  if (variant === "pill") {
    return (
      <SyncPill
        sync={sync}
        onRetry={() => void forceSync()}
        className={className}
        t={t}
      />
    );
  }

  return (
    <SyncCard sync={sync} onRetry={() => void forceSync()} className={className} t={t} />
  );
}

/* ─── Pill (topbar) ──────────────────────────────────────────── */

function SyncPill({
  sync,
  onRetry,
  className,
  t,
}: {
  sync: SyncState;
  onRetry: () => void;
  className?: string;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
}) {
  const palette = paletteFor(sync.status);
  const label = pillLabelFor(sync, t);

  const needsRetry = sync.status === "offline" || sync.status === "error";

  return (
    <button
      type="button"
      onClick={needsRetry ? onRetry : undefined}
      disabled={!needsRetry}
      title={fullTooltip(sync, t)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 h-7 text-[11px] font-mono uppercase tracking-wider transition",
        palette.bg,
        palette.text,
        palette.border,
        "border",
        needsRetry ? "cursor-pointer hover:opacity-90" : "cursor-default",
        className,
      )}
    >
      <StatusIcon status={sync.status} />
      <span className="font-semibold normal-case tracking-normal text-[11px]">
        {label}
      </span>
    </button>
  );
}

/* ─── Card (progress page) ───────────────────────────────────── */

function SyncCard({
  sync,
  onRetry,
  className,
  t,
}: {
  sync: SyncState;
  onRetry: () => void;
  className?: string;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
}) {
  const palette = paletteFor(sync.status);
  const justSynced = useRecentSynced(sync);

  return (
    <div
      className={cn(
        "rounded-xl border-base bg-bg-2 p-4 flex items-start gap-3",
        className,
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-lg border inline-flex items-center justify-center flex-shrink-0",
          palette.bg,
          palette.border,
          palette.text,
        )}
      >
        <StatusIcon status={sync.status} size={16} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-sm font-semibold">{cardTitleFor(sync, t)}</div>
          {justSynced && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
              {t("sync.savedPulse")}
            </span>
          )}
        </div>
        <div className="text-[13px] text-fg-2 leading-relaxed mt-0.5">
          {cardBodyFor(sync, t)}
        </div>
      </div>

      {(sync.status === "offline" || sync.status === "error") && (
        <button
          type="button"
          onClick={onRetry}
          className="self-center inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 h-8 rounded-md border-base bg-bg-3 text-fg-2 hover:text-fg hover:bg-bg-4 transition"
        >
          <RefreshCw size={13} />
          {t("sync.retry")}
        </button>
      )}
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */

function StatusIcon({
  status,
  size = 12,
}: {
  status: SyncStatus;
  size?: number;
}) {
  switch (status) {
    case "hydrating":
    case "syncing":
      return <Loader2 size={size} className="animate-spin" />;
    case "migrating":
      return <UploadCloud size={size} />;
    case "synced":
      return <CheckCircle2 size={size} />;
    case "offline":
      return <CloudOff size={size} />;
    case "error":
      return <AlertTriangle size={size} />;
    default:
      return <CheckCircle2 size={size} />;
  }
}

function paletteFor(status: SyncStatus): {
  bg: string;
  text: string;
  border: string;
} {
  switch (status) {
    case "hydrating":
    case "syncing":
      return {
        bg: "bg-sky-500/10",
        text: "text-sky-300",
        border: "border-sky-500/30",
      };
    case "migrating":
      return {
        bg: "bg-indigo-500/10",
        text: "text-indigo-300",
        border: "border-indigo-500/30",
      };
    case "synced":
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-300",
        border: "border-emerald-500/30",
      };
    case "offline":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-300",
        border: "border-amber-500/30",
      };
    case "error":
      return {
        bg: "bg-red-500/10",
        text: "text-red-300",
        border: "border-red-500/30",
      };
    default:
      return {
        bg: "bg-bg-3",
        text: "text-fg-2",
        border: "border-base",
      };
  }
}

function pillLabelFor(
  sync: SyncState,
  t: (key: MessageKey, vars?: Record<string, string | number>) => string,
): string {
  switch (sync.status) {
    case "hydrating":
      return t("sync.pillHydrating");
    case "migrating":
      return t("sync.pillMigrating");
    case "syncing":
      return t("sync.pillSyncing");
    case "synced":
      return t("sync.synced");
    case "offline":
      return t("sync.pillOffline");
    case "error":
      return t("sync.pillError");
    default:
      return t("sync.pillLocal");
  }
}

function cardTitleFor(
  sync: SyncState,
  t: (key: MessageKey, vars?: Record<string, string | number>) => string,
): string {
  switch (sync.status) {
    case "hydrating":
      return t("sync.titleHydrating");
    case "migrating":
      return t("sync.titleMigrating", {
        n: sync.migratedItems,
        s: sync.migratedItems > 1 ? "s" : "",
      });
    case "syncing":
      return t("sync.titleSyncing");
    case "synced":
      return sync.migratedItems > 0
        ? t("sync.titleMigrated", {
            n: sync.migratedItems,
            s: sync.migratedItems > 1 ? "s" : "",
          })
        : t("sync.allSynced");
    case "offline":
      return t("sync.titleOffline");
    case "error":
      return t("sync.titleError");
    default:
      return t("sync.titleLocal");
  }
}

function cardBodyFor(
  sync: SyncState,
  t: (key: MessageKey, vars?: Record<string, string | number>) => string,
): string {
  switch (sync.status) {
    case "hydrating":
      return t("sync.pulling");
    case "migrating":
      return t("sync.merging");
    case "syncing":
      return t("sync.saving");
    case "synced":
      return sync.lastSyncedAt
        ? t("sync.lastSaved", { when: relativeTime(sync.lastSyncedAt, t) })
        : t("sync.upToDate");
    case "offline":
      return sync.errorMessage ?? t("sync.offline");
    case "error":
      return sync.errorMessage ?? t("sync.error");
    default:
      return t("sync.bodyLocal");
  }
}

function fullTooltip(
  sync: SyncState,
  t: (key: MessageKey, vars?: Record<string, string | number>) => string,
): string {
  const title = cardTitleFor(sync, t);
  const body = cardBodyFor(sync, t);
  return `${title}\n${body}`;
}

function relativeTime(
  timestamp: number,
  t: (key: MessageKey, vars?: Record<string, string | number>) => string,
): string {
  const diffMs = Date.now() - timestamp;
  const sec = Math.round(diffMs / 1000);
  if (sec < 10) return t("sync.justNow");
  if (sec < 60) return t("sync.secondsAgo", { n: sec });
  const min = Math.round(sec / 60);
  if (min < 60) return t("course.minutesAgo", { n: min });
  const hours = Math.round(min / 60);
  if (hours < 24) return t("course.hoursAgo", { n: hours });
  const days = Math.round(hours / 24);
  return t("course.daysAgo", { n: days });
}

/**
 * Returns true during a short window right after a successful save, to let
 * the UI pulse with a subtle "Saved" hint.
 */
function useRecentSynced(sync: SyncState): boolean {
  const [recent, setRecent] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (sync.status !== "synced" || !sync.lastSyncedAt) return;

    setRecent(true);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setRecent(false), 1800);

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [sync.status, sync.lastSyncedAt]);

  return recent;
}
