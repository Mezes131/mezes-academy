import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════ */

export type ModalVariant =
  | "default"
  | "info"
  | "warning"
  | "danger"
  | "success";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps {
  /** Controls the open state. Render is only triggered when `true`. */
  open: boolean;
  /** Called on backdrop click, Escape key, or close-button click. */
  onClose: () => void;
  /** Optional heading shown next to the variant icon. */
  title?: ReactNode;
  /** Optional short description under the title. */
  description?: ReactNode;
  /** Free-form content below the description (forms, lists, …). */
  children?: ReactNode;
  /** Footer slot — use for action buttons. */
  footer?: ReactNode;
  /** Visual flavor. Drives the icon + color accents. Default: `"default"`. */
  variant?: ModalVariant;
  /** Override the leading icon. Defaults to the variant icon. */
  icon?: ReactNode;
  /** Max-width bucket. Default: `"md"`. */
  size?: ModalSize;
  /** Disable backdrop click. Default: `false`. */
  disableBackdropClose?: boolean;
  /** Disable Escape key. Default: `false`. */
  disableEscapeClose?: boolean;
  /** Hide the top-right close button. Default: `false`. */
  hideCloseButton?: boolean;
  /** Extra classes applied to the inner panel. */
  className?: string;
}

/* ═══════════════════════════════════════════════════════════════════
   Modal
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Accessible, portal-rendered modal dialog.
 *
 * - Closes on backdrop click and Escape by default.
 * - Traps nothing aggressively but restores focus to the previously-
 *   focused element on close.
 * - Locks body scroll while open.
 * - Styled to match the app shell (backdrop + bg-2 panel).
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = "default",
  icon,
  size = "md",
  disableBackdropClose = false,
  disableEscapeClose = false,
  hideCloseButton = false,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  // Stable close handler for internal callbacks.
  const handleClose = useCallback(() => onClose(), [onClose]);

  // Escape key handling.
  useEffect(() => {
    if (!open || disableEscapeClose) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, disableEscapeClose, handleClose]);

  // Body scroll lock + focus management.
  useEffect(() => {
    if (!open) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      if (!panelRef.current) return;
      const firstFocusable = panelRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      (firstFocusable ?? panelRef.current).focus({ preventScroll: true });
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      if (lastFocusRef.current && document.contains(lastFocusRef.current)) {
        lastFocusRef.current.focus({ preventScroll: true });
      }
    };
  }, [open]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  const palette = palettes[variant];
  const resolvedIcon = icon ?? defaultIcons[variant];
  const maxWidth = sizes[size];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
      className="fixed inset-0 z-[100] grid place-items-center px-4 py-6 animate-fade-in"
      onMouseDown={(e) => {
        if (disableBackdropClose) return;
        // Only close when clicking directly on the overlay, not on the panel.
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative w-full rounded-2xl border-base bg-bg-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
          "outline-none",
          maxWidth,
          className,
        )}
      >
        {!hideCloseButton && (
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer"
            className="absolute top-3 right-3 w-8 h-8 inline-flex items-center justify-center rounded-lg text-fg-3 hover:text-fg hover:bg-bg-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <X size={16} />
          </button>
        )}

        <div className="p-6 sm:p-7">
          {(resolvedIcon || title || description) && (
            <div className="flex items-start gap-3 pr-6">
              {resolvedIcon && (
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl inline-flex items-center justify-center flex-shrink-0",
                    palette.iconBg,
                    palette.iconFg,
                  )}
                  aria-hidden
                >
                  {resolvedIcon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-lg font-bold tracking-tight"
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-[14px] text-fg-2 leading-relaxed"
                  >
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {children && <div className="mt-5">{children}</div>}

          {footer && (
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ConfirmDialog — common case on top of Modal
   ═══════════════════════════════════════════════════════════════════ */

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  /** Async-safe: the dialog stays in "loading" state until it resolves. */
  onConfirm: () => void | Promise<void>;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: Exclude<ModalVariant, "default">;
  icon?: ReactNode;
  /** Closes the dialog automatically on successful confirm. Default: `true`. */
  closeOnSuccess?: boolean;
}

/**
 * Yes / No dialog with two footer buttons. Handles async confirm handlers
 * (disables both buttons and closes on success by default).
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "warning",
  icon,
  closeOnSuccess = true,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setError(null);
    }
  }, [open]);

  async function handleConfirm() {
    setError(null);
    setLoading(true);
    try {
      await onConfirm();
      if (closeOnSuccess) onClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  const confirmVariant = variant === "danger" ? "danger" : "primary";

  return (
    <Modal
      open={open}
      onClose={loading ? () => undefined : onClose}
      variant={variant}
      icon={icon}
      title={title}
      description={description}
      disableBackdropClose={loading}
      disableEscapeClose={loading}
      hideCloseButton={loading}
      footer={
        <>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={loading}
            className="sm:min-w-[120px]"
          >
            {cancelLabel}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={() => void handleConfirm()}
            disabled={loading}
            className="sm:min-w-[160px]"
          >
            {loading ? "Traitement..." : confirmLabel}
          </Button>
        </>
      }
    >
      {error && (
        <p
          role="alert"
          className="text-[13px] rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-3 py-2"
        >
          {error}
        </p>
      )}
    </Modal>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Presets
   ═══════════════════════════════════════════════════════════════════ */

const sizes: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const palettes: Record<
  ModalVariant,
  { iconBg: string; iconFg: string }
> = {
  default: {
    iconBg: "bg-accent/10",
    iconFg: "text-accent-2",
  },
  info: {
    iconBg: "bg-sky-500/10",
    iconFg: "text-sky-300",
  },
  warning: {
    iconBg: "bg-amber-500/10",
    iconFg: "text-amber-400",
  },
  danger: {
    iconBg: "bg-red-500/10",
    iconFg: "text-red-300",
  },
  success: {
    iconBg: "bg-emerald-500/10",
    iconFg: "text-emerald-300",
  },
};

const defaultIcons: Record<ModalVariant, ReactNode | null> = {
  default: null,
  info: <Info size={18} />,
  warning: <AlertTriangle size={18} />,
  danger: <AlertCircle size={18} />,
  success: <CheckCircle2 size={18} />,
};
