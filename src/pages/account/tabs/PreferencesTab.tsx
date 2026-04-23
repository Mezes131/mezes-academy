import { useState } from "react";
import { Bell, Globe, Moon, Palette, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

interface PreferencesTabProps {
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

/**
 * Student-facing preferences: theme, public profile opt-in, notifications placeholder.
 */
export function PreferencesTab({ onError, onSuccess }: PreferencesTabProps) {
  const { progress, setTheme } = useProgress();
  const { profile, updateProfile } = useAuth();
  const [savingPublic, setSavingPublic] = useState(false);

  async function togglePublic(next: boolean) {
    setSavingPublic(true);
    try {
      await updateProfile({ isPublic: next });
      onSuccess(
        next
          ? "Profil rendu public."
          : "Profil repassé en privé.",
      );
    } catch (error) {
      onError((error as Error).message);
    } finally {
      setSavingPublic(false);
    }
  }

  const theme = progress.theme;

  return (
    <div className="space-y-6">
      <Section
        title="Apparence"
        description="Choisis l'ambiance qui te correspond."
        icon={<Palette size={14} />}
      >
        <div className="flex flex-wrap gap-2">
          <ThemeOption
            active={theme === "light"}
            onClick={() => setTheme("light")}
            icon={<Sun size={16} />}
            label="Clair"
          />
          <ThemeOption
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
            icon={<Moon size={16} />}
            label="Sombre"
          />
        </div>
      </Section>

      <Section
        title="Visibilité"
        description="Ton profil peut être visible dans la future galerie des projets étudiants."
        icon={<Globe size={14} />}
      >
        <ToggleRow
          label="Profil public"
          hint="Ton pseudo, ta bio et ton projet final pourront apparaître dans la galerie. Désactivé par défaut."
          checked={Boolean(profile?.isPublic)}
          onChange={togglePublic}
          disabled={savingPublic}
        />
      </Section>

      <Section
        title="Notifications"
        description="Bientôt : reçois des rappels doux pour ne pas casser ta série d'étude."
        icon={<Bell size={14} />}
      >
        <div className="rounded-lg border border-dashed border-base bg-bg-3/40 p-4 text-[13px] text-fg-3">
          Les notifications email et in-app arriveront prochainement.
        </div>
      </Section>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────── */

function Section({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border-base bg-bg-2 p-5">
      <div className="flex items-start gap-3 mb-4">
        {icon && (
          <div className="w-8 h-8 rounded-md bg-accent/10 text-accent-2 inline-flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-[13px] text-fg-2 mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ThemeOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 px-3 h-10 rounded-lg border transition text-sm font-semibold",
        active
          ? "border-accent/50 bg-accent/10 text-fg"
          : "border-base bg-bg-3 text-fg-2 hover:text-fg",
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex items-start justify-between gap-4 rounded-lg border border-base bg-bg-3/40 p-4 cursor-pointer",
        disabled && "opacity-60 cursor-wait",
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        {hint && (
          <p className="text-[12px] text-fg-3 leading-relaxed mt-0.5">{hint}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full transition flex-shrink-0",
          checked ? "bg-accent" : "bg-bg-4",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-soft transition-all",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </label>
  );
}
