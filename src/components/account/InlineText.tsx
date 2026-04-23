import { useEffect, useRef, useState } from "react";
import { Check, Pencil, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export interface InlineTextProps {
  /** Field identifier, used as a11y label and inside the editor header. */
  label: string;
  /** Icon shown next to the label when editing / when empty. */
  icon?: React.ReactNode;
  /** Current persisted value ("" for an unset field). */
  value: string;
  /** Placeholder shown inside the input while editing. */
  placeholder?: string;
  /** Call-to-action shown when the field is empty (e.g. "Ajouter ton nom"). */
  emptyLabel?: string;
  /** Tailwind classes applied to the filled display (typography, color, …). */
  valueClassName?: string;
  /** Inline prefix displayed before the value (e.g. "@"). */
  prefix?: string;
  /** Render a textarea instead of a single-line input. */
  multiline?: boolean;
  /** Max character count (enforced on the input and shown as counter). */
  maxLength?: number;
  /** Optional transform applied before validation/save (e.g. lowercase). */
  normalize?: (raw: string) => string;
  /** Optional validator; return an error message or null. */
  validate?: (raw: string) => string | null;
  /** Called when the user confirms a new value. */
  onSave: (next: string) => Promise<void>;
}

/**
 * Opinionated inline editor.
 *
 * Display concept:
 * - **Filled**: we render just the value with the target typography, without
 *   any label. Hover reveals a pencil affordance so it stays discoverable.
 * - **Empty**: we render a compact ghost "+ Add ..." button carrying the
 *   label so the user knows what to fill in.
 * - **Editing**: we reveal the label as an uppercase mono tag, the input
 *   (or textarea), and OK / Cancel buttons with helper text.
 */
export function InlineText({
  label,
  icon,
  value,
  placeholder,
  emptyLabel,
  valueClassName,
  prefix,
  multiline,
  maxLength,
  normalize,
  validate,
  onSave,
}: InlineTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select?.();
    }
  }, [editing]);

  async function commit() {
    const normalized = normalize ? normalize(draft) : draft.trim();
    const err = validate ? validate(normalized) : null;
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await onSave(normalized);
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setDraft(value);
    setError(null);
    setEditing(false);
  }

  /* ─── Filled (read mode) ─── */
  if (!editing && value) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        aria-label={`Modifier ${label.toLowerCase()}`}
        className={cn(
          "group inline-flex items-start gap-1.5 max-w-full text-left",
          "rounded-md -mx-1 px-1 py-0.5 hover:bg-bg-3 transition",
          valueClassName,
        )}
      >
        {prefix && <span className="text-fg-3">{prefix}</span>}
        <span
          className={cn(
            "min-w-0",
            multiline ? "whitespace-pre-wrap break-words" : "truncate",
          )}
        >
          {value}
        </span>
        <Pencil
          size={12}
          className="text-fg-3 mt-1 opacity-0 group-hover:opacity-100 transition flex-shrink-0"
        />
      </button>
    );
  }

  /* ─── Empty (read mode) ─── */
  if (!editing) {
    return (
      <button
        type="button"
        onClick={() => setEditing(true)}
        className={cn(
          "inline-flex items-center gap-1.5 text-[13px] italic text-fg-3",
          "rounded-md border border-dashed border-base/70 bg-bg-3/30 px-2.5 h-8",
          "hover:text-fg-2 hover:border-base hover:bg-bg-3 transition",
        )}
      >
        {icon && <span className="not-italic">{icon}</span>}
        <span className="not-italic">
          {emptyLabel ?? `Ajouter ${label.toLowerCase()}`}
        </span>
        <Plus size={12} className="text-fg-3 not-italic" />
      </button>
    );
  }

  /* ─── Editing ─── */
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 inline-flex items-center gap-1.5 mb-1">
        {icon}
        {label}
      </div>
      <div className="flex items-start gap-2">
        {prefix && (
          <span className="text-fg-3 text-sm h-10 flex items-center">
            {prefix}
          </span>
        )}
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={maxLength}
            placeholder={placeholder}
            rows={3}
            className="flex-1 rounded-lg border-base bg-bg-3 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 resize-none"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={maxLength}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void commit();
              } else if (e.key === "Escape") {
                cancel();
              }
            }}
            className="flex-1 h-10 rounded-lg border-base bg-bg-3 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          />
        )}
        <Button
          size="sm"
          onClick={() => void commit()}
          disabled={saving}
          leftIcon={<Check size={13} />}
        >
          {saving ? "..." : "OK"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={cancel}
          disabled={saving}
          leftIcon={<X size={13} />}
        >
          Annuler
        </Button>
      </div>
      <div className="flex items-center justify-between mt-1">
        {error ? (
          <span className="text-[12px] text-red-300">{error}</span>
        ) : (
          <span className="text-[11px] text-fg-3">
            {multiline
              ? "Entrée = retour ligne · 240 caractères max"
              : "Entrée pour valider · Échap pour annuler"}
          </span>
        )}
        {maxLength && (
          <span className="text-[11px] font-mono text-fg-3">
            {draft.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
