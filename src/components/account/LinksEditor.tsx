import { useEffect, useState } from "react";
import { Check, Github, Globe, Linkedin, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ProfileLinks } from "@/hooks/useAuth";
import { isPlausibleUrl } from "@/lib/identity";

interface LinkField {
  key: keyof ProfileLinks;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
}

const LINK_FIELDS: LinkField[] = [
  {
    key: "github",
    label: "GitHub",
    icon: <Github size={14} />,
    placeholder: "https://github.com/pseudo",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin size={14} />,
    placeholder: "https://linkedin.com/in/pseudo",
  },
  {
    key: "website",
    label: "Site web",
    icon: <Globe size={14} />,
    placeholder: "https://mon-portfolio.dev",
  },
];

export interface LinksEditorProps {
  links: ProfileLinks;
  onSave: (next: ProfileLinks) => Promise<void>;
}

/**
 * Inline editor for public profile links (GitHub / LinkedIn / Website).
 * Shows filled links as chips; switches to a small form on edit.
 */
export function LinksEditor({ links, onSave }: LinksEditorProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileLinks>(links);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!editing) setDraft(links);
  }, [links, editing]);

  const hasAnyLink = LINK_FIELDS.some((f) => links[f.key]);

  async function commit() {
    setError(null);
    for (const f of LINK_FIELDS) {
      const v = draft[f.key];
      if (v && !isPlausibleUrl(v)) {
        setError(`URL invalide pour ${f.label}.`);
        return;
      }
    }
    setSaving(true);
    try {
      const clean: ProfileLinks = {};
      for (const f of LINK_FIELDS) {
        const v = draft[f.key]?.trim();
        if (v) clean[f.key] = v;
      }
      await onSave(clean);
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  /* ─── Display mode ─── */
  if (!editing) {
    if (!hasAnyLink) {
      return (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="inline-flex items-center gap-1.5 text-[13px] italic text-fg-3 rounded-md border border-dashed border-base/70 bg-bg-3/30 px-2.5 h-8 hover:text-fg-2 hover:border-base hover:bg-bg-3 transition"
        >
          <Globe size={12} className="not-italic" />
          <span className="not-italic">Ajouter des liens publics</span>
          <Plus size={12} className="not-italic" />
        </button>
      );
    }

    return (
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {LINK_FIELDS.map((f) => {
            const v = links[f.key];
            if (!v) return null;
            return (
              <a
                key={f.key}
                href={v}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 h-8 rounded-full bg-bg-3 text-[12px] text-fg-2 hover:text-fg hover:bg-bg-4 transition"
              >
                <span className="text-fg-3">{f.icon}</span>
                <span className="truncate max-w-[160px]">{f.label}</span>
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-[12px] text-accent-2 hover:underline underline-offset-4"
          >
            Modifier
          </button>
        </div>
      </div>
    );
  }

  /* ─── Edit mode ─── */
  return (
    <div className="rounded-xl border-base bg-bg-3/40 p-4">
      <div className="text-[11px] font-mono uppercase tracking-wider text-fg-3 mb-3">
        Liens publics
      </div>
      <div className="space-y-2">
        {LINK_FIELDS.map((f) => (
          <label key={f.key} className="flex items-center gap-2">
            <span className="w-24 inline-flex items-center gap-1.5 text-[12px] text-fg-2">
              <span className="text-fg-3">{f.icon}</span>
              {f.label}
            </span>
            <input
              type="url"
              value={draft[f.key] ?? ""}
              onChange={(e) =>
                setDraft((d) => ({ ...d, [f.key]: e.target.value }))
              }
              placeholder={f.placeholder}
              className="flex-1 h-9 rounded-lg border-base bg-bg-3 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            />
          </label>
        ))}
      </div>
      {error && <p className="text-[12px] text-red-300 mt-2">{error}</p>}
      <div className="flex items-center gap-2 mt-3">
        <Button
          size="sm"
          onClick={() => void commit()}
          disabled={saving}
          leftIcon={<Check size={13} />}
        >
          {saving ? "..." : "Enregistrer"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setDraft(links);
            setError(null);
            setEditing(false);
          }}
          disabled={saving}
          leftIcon={<X size={13} />}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}
