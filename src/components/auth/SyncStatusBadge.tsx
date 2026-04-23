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

  if (!user) return null;

  if (variant === "pill") {
    return <SyncPill sync={sync} onRetry={() => void forceSync()} className={className} />;
  }

  return (
    <SyncCard sync={sync} onRetry={() => void forceSync()} className={className} />
  );
}

/* ─── Pill (topbar) ──────────────────────────────────────────── */

function SyncPill({
  sync,
  onRetry,
  className,
}: {
  sync: SyncState;
  onRetry: () => void;
  className?: string;
}) {
  const palette = paletteFor(sync.status);
  const label = pillLabelFor(sync);

  const needsRetry = sync.status === "offline" || sync.status === "error";

  return (
    <button
      type="button"
      onClick={needsRetry ? onRetry : undefined}
      disabled={!needsRetry}
      title={fullTooltip(sync)}
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
}: {
  sync: SyncState;
  onRetry: () => void;
  className?: string;
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
          <div className="text-sm font-semibold">{cardTitleFor(sync)}</div>
          {justSynced && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
              Sauvegardé
            </span>
          )}
        </div>
        <div className="text-[13px] text-fg-2 leading-relaxed mt-0.5">
          {cardBodyFor(sync)}
        </div>
      </div>

      {(sync.status === "offline" || sync.status === "error") && (
        <button
          type="button"
          onClick={onRetry}
          className="self-center inline-flex items-center gap-1.5 text-[12px] font-semibold px-3 h-8 rounded-md border-base bg-bg-3 text-fg-2 hover:text-fg hover:bg-bg-4 transition"
        >
          <RefreshCw size={13} />
          Réessayer
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

function pillLabelFor(sync: SyncState): string {
  switch (sync.status) {
    case "hydrating":
      return "Chargement...";
    case "migrating":
      return "Migration...";
    case "syncing":
      return "Sauvegarde...";
    case "synced":
      return "Synchronisé";
    case "offline":
      return "Hors ligne";
    case "error":
      return "Erreur de sync";
    default:
      return "Local";
  }
}

function cardTitleFor(sync: SyncState): string {
  switch (sync.status) {
    case "hydrating":
      return "Chargement de ta progression...";
    case "migrating":
      return `Migration de ta progression (${sync.migratedItems} élément${
        sync.migratedItems > 1 ? "s" : ""
      })`;
    case "syncing":
      return "Sauvegarde en cours...";
    case "synced":
      return sync.migratedItems > 0
        ? `Progression migrée et synchronisée (${sync.migratedItems} élément${
            sync.migratedItems > 1 ? "s" : ""
          })`
        : "Tout est synchronisé";
    case "offline":
      return "Synchronisation indisponible";
    case "error":
      return "Erreur lors de la synchronisation";
    default:
      return "Progression locale";
  }
}

function cardBodyFor(sync: SyncState): string {
  switch (sync.status) {
    case "hydrating":
      return "On récupère ta progression depuis ton compte.";
    case "migrating":
      return "Tes données locales sont envoyées sur ton compte, une seule fois. Tu peux continuer à travailler.";
    case "syncing":
      return "Tes dernières actions sont en cours d'enregistrement.";
    case "synced":
      return sync.lastSyncedAt
        ? `Dernière sauvegarde : ${relativeTime(sync.lastSyncedAt)}.`
        : "Tes données sont à jour sur ton compte.";
    case "offline":
      return (
        sync.errorMessage ??
        "Le backend est injoignable pour le moment. Ta progression reste sauvegardée localement."
      );
    case "error":
      return (
        sync.errorMessage ??
        "Une erreur est survenue. Réessaie, ou contacte le support si le problème persiste."
      );
    default:
      return "Connecte-toi pour activer la sauvegarde dans le cloud.";
  }
}

function fullTooltip(sync: SyncState): string {
  const title = cardTitleFor(sync);
  const body = cardBodyFor(sync);
  return `${title}\n${body}`;
}

function relativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const sec = Math.round(diffMs / 1000);
  if (sec < 10) return "à l'instant";
  if (sec < 60) return `il y a ${sec}s`;
  const min = Math.round(sec / 60);
  if (min < 60) return `il y a ${min} min`;
  const hours = Math.round(min / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.round(hours / 24);
  return `il y a ${days} j`;
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
