import { useState } from "react";
import { AlertTriangle, KeyRound, Mail, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

interface SecurityTabProps {
  email: string;
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

/**
 * Student-facing security center: change password, read-only email info,
 * and a safe-by-default account deletion request flow.
 */
export function SecurityTab({ email, onError, onSuccess }: SecurityTabProps) {
  const { updatePassword } = useAuth();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  async function onChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwError(null);

    if (newPassword.length < 6) {
      setPwError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setSaving(true);
    try {
      await updatePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      onSuccess("Mot de passe mis à jour.");
    } catch (error) {
      const message = (error as Error).message;
      setPwError(humanizePasswordError(message));
      onError(message);
    } finally {
      setSaving(false);
    }
  }

  function onRequestDeletion() {
    const ok = window.confirm(
      "Confirmer la demande de suppression ?\n\n" +
        "Un administrateur traitera ta demande manuellement. Ta progression restera conservée 30 jours avant effacement définitif.",
    );
    if (!ok) return;

    const to = "contact@mezescorp.com";
    const subject = encodeURIComponent("Demande de suppression de compte");
    const body = encodeURIComponent(
      `Bonjour,\n\nJe demande la suppression de mon compte lié à l'adresse ${email}.\n\nMerci.`,
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="space-y-6">
      <Section
        icon={<Mail size={14} />}
        title="Email"
        description="Tu te connectes avec cette adresse."
      >
        <div className="rounded-lg border-base bg-bg-3/40 p-4">
          <div className="text-sm font-mono text-fg">{email}</div>
          <p className="text-[12px] text-fg-3 mt-2 leading-relaxed">
            Pour changer d'email, contacte{" "}
            <a
              className="underline underline-offset-4 hover:text-fg"
              href="mailto:contact@mezescorp.com?subject=Changement%20d%27email"
            >
              contact@mezescorp.com
            </a>
            . Cette opération sera automatisée prochainement.
          </p>
        </div>
      </Section>

      <Section
        icon={<KeyRound size={14} />}
        title="Mot de passe"
        description="Choisis un mot de passe robuste, différent de tes autres comptes."
      >
        <form
          onSubmit={onChangePassword}
          className="space-y-3 rounded-lg border-base bg-bg-3/40 p-4"
        >
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
              Nouveau mot de passe
            </span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={6}
              className="mt-1 w-full h-10 rounded-lg border-base bg-bg-3 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              placeholder="6 caractères minimum"
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
              Confirmer le mot de passe
            </span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
              minLength={6}
              className="mt-1 w-full h-10 rounded-lg border-base bg-bg-3 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            />
          </label>

          {pwError && (
            <p className="text-[13px] rounded-md border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2">
              {pwError}
            </p>
          )}

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={saving}
              leftIcon={<ShieldCheck size={14} />}
            >
              {saving ? "Enregistrement..." : "Mettre à jour"}
            </Button>
            <p className="text-[11px] text-fg-3">
              Tu seras déconnecté des autres sessions actives.
            </p>
          </div>
        </form>
      </Section>

      <DangerZone
        icon={<AlertTriangle size={14} />}
        title="Zone sensible"
        description="Actions irréversibles. Réfléchis bien avant de poursuivre."
      >
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[220px]">
            <div className="text-sm font-semibold text-red-200">
              Supprimer mon compte
            </div>
            <p className="text-[12px] text-fg-2 leading-relaxed mt-1">
              Cette demande contactera un administrateur. Ta progression sera
              conservée 30 jours avant effacement définitif.
            </p>
          </div>
          <Button
            variant="danger"
            leftIcon={<Trash2 size={14} />}
            onClick={onRequestDeletion}
          >
            Demander la suppression
          </Button>
        </div>
      </DangerZone>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────── */

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border-base bg-bg-2 p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-accent/10 text-accent-2 inline-flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
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

function DangerZone({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-red-500/10 text-red-300 inline-flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-200">{title}</h3>
          <p className="text-[13px] text-fg-2 mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {children}
    </section>
  );
}

/* ─── Helpers ───────────────────────────────────────────────── */

function humanizePasswordError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("same") && lower.includes("password")) {
    return "Le nouveau mot de passe doit être différent de l'actuel.";
  }
  if (lower.includes("weak") || lower.includes("short")) {
    return "Ce mot de passe est trop faible. Utilise au moins 6 caractères.";
  }
  return message;
}
