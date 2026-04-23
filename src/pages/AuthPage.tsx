import { useMemo, useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MezesLogo } from "@/components/ui/MezesLogo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "register";

/**
 * Auth entry point: account creation + sign-in.
 * Split layout: marketing/benefits on the left, form on the right.
 */
export function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { configured, signIn, signUp, user, loading } = useAuth();

  const nextPath = useMemo(
    () => searchParams.get("next") || "/react",
    [searchParams],
  );
  const initialMode = (searchParams.get("mode") as AuthMode) ?? "login";

  const [mode, setMode] = useState<AuthMode>(
    initialMode === "register" ? "register" : "login",
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  if (!configured) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl border-base bg-bg-2 p-6">
          <h1 className="text-2xl font-bold">Configuration requise</h1>
          <p className="mt-2 text-sm text-fg-2 leading-relaxed">
            L'authentification n'est pas encore disponible : l'administrateur
            doit terminer la configuration du backend. Réessaie plus tard ou
            contacte l'équipe.
          </p>
        </div>
      </div>
    );
  }

  if (!loading && user) {
    return <Navigate to={nextPath} replace />;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setInfo(null);

    try {
      if (mode === "login") {
        await signIn(email.trim(), password);
        navigate(nextPath, { replace: true });
      } else {
        await signUp({ email: email.trim(), password, fullName });
        setInfo(
          "Compte créé. Si la validation par email est activée, ouvre le lien reçu puis connecte-toi.",
        );
        setMode("login");
        setPassword("");
      }
    } catch (err) {
      setError(humanizeAuthError((err as Error).message));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 15% 10%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(236,72,153,0.14), transparent 60%), radial-gradient(800px 500px at 50% 100%, rgba(16,185,129,0.12), transparent 60%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: value proposition ─────────────────────────── */}
          <section className="max-w-xl">

            <h1 className="mt-4 text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]">
              {mode === "login" ? (
                <>
                  Ravi de te revoir
                  <span className="block text-accent-2">sur ton parcours.</span>
                </>
              ) : (
                <>
                  Crée ton compte
                  <span className="block text-accent-2">et commence à apprendre.</span>
                </>
              )}
            </h1>

            <p className="mt-4 text-fg-2 text-[15px] leading-relaxed">
              Ton compte sauvegarde ta progression dans le cloud. Tu peux
              reprendre exactement là où tu t'étais arrêté, sur n'importe quel
              appareil.
            </p>

            <ul className="mt-8 space-y-3">
              <Benefit
                icon={<CheckCircle2 size={16} />}
                title="Progression sauvegardée"
                body="Modules lus, quiz validés, exercices résolus — tout est synchronisé."
              />
              <Benefit
                icon={<ShieldCheck size={16} />}
                title="Données protégées"
                body="Auth sécurisée, chaque apprenant voit uniquement ses propres données."
              />
              <Benefit
                icon={<Sparkles size={16} />}
                title="Multi-appareils"
                body="Connecte-toi sur ton laptop, ta tablette, ton téléphone."
              />
            </ul>

            <div className="mt-10 flex items-center gap-3 text-[13px] text-fg-3">
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-fg transition"
              >
                Retour à l'accueil
              </Link>
            </div>
          </section>

          {/* ── Right: form card ───────────────────────────────── */}
          <section className="w-full">
            <div className="mx-auto w-full max-w-md rounded-2xl border-base bg-bg-2/90 p-6 sm:p-7 shadow-soft backdrop-blur-md">
              <div className="flex items-center justify-between">
                <MezesLogo size={26} showText />
                <span className="text-[11px] font-mono uppercase tracking-wider text-fg-3">
                  {mode === "login" ? "Connexion" : "Inscription"}
                </span>
              </div>

              {/* Mode switcher */}
              <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-bg-3 p-1">
                <TabButton
                  active={mode === "login"}
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                >
                  Se connecter
                </TabButton>
                <TabButton
                  active={mode === "register"}
                  onClick={() => {
                    setMode("register");
                    setError(null);
                  }}
                >
                  Créer un compte
                </TabButton>
              </div>

              <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
                {mode === "register" && (
                  <Field
                    label="Nom complet"
                    icon={<UserIcon size={14} />}
                    htmlFor="auth-fullname"
                  >
                    <input
                      id="auth-fullname"
                      className={inputClass}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      minLength={2}
                      autoComplete="name"
                      placeholder="Ex: Ada Lovelace"
                    />
                  </Field>
                )}

                <Field
                  label="Email"
                  icon={<Mail size={14} />}
                  htmlFor="auth-email"
                >
                  <input
                    id="auth-email"
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete={
                      mode === "login" ? "current-email" : "email"
                    }
                    placeholder="toi@email.com"
                  />
                </Field>

                <Field
                  label="Mot de passe"
                  icon={<Lock size={14} />}
                  htmlFor="auth-password"
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="text-[11px] font-mono uppercase tracking-wider text-fg-3 hover:text-fg transition inline-flex items-center gap-1"
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                    >
                      {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                      {showPassword ? "Masquer" : "Afficher"}
                    </button>
                  }
                >
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    className={inputClass}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                    placeholder={mode === "login" ? "••••••••" : "6 caractères min."}
                  />
                </Field>

                {error && (
                  <p
                    role="alert"
                    className="text-[13px] rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 px-3 py-2"
                  >
                    {error}
                  </p>
                )}
                {info && (
                  <p
                    role="status"
                    className="text-[13px] rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 px-3 py-2"
                  >
                    {info}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full !h-11"
                >
                  {submitting ? (
                    "Traitement..."
                  ) : mode === "login" ? (
                    <>
                      Se connecter
                      <ArrowRight size={14} />
                    </>
                  ) : (
                    <>
                      Créer mon compte
                      <ArrowRight size={14} />
                    </>
                  )}
                </Button>

                <p className="text-center text-[12px] text-fg-3">
                  {mode === "login" ? (
                    <>
                      Nouveau ici ?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("register")}
                        className="text-accent-2 hover:underline underline-offset-4"
                      >
                        Créer un compte
                      </button>
                    </>
                  ) : (
                    <>
                      Déjà inscrit ?{" "}
                      <button
                        type="button"
                        onClick={() => setMode("login")}
                        className="text-accent-2 hover:underline underline-offset-4"
                      >
                        Se connecter
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>

            <p className="mt-4 text-center text-[11px] text-fg-3 max-w-md mx-auto">
              En continuant, tu acceptes un usage responsable de la plateforme.
              Tes données ne sont jamais partagées avec des tiers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function Benefit({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 w-6 h-6 rounded-md bg-accent/10 text-accent-2 inline-flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[13px] text-fg-2 leading-relaxed">{body}</div>
      </div>
    </li>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 rounded-lg text-sm font-semibold transition",
        active
          ? "bg-bg text-fg shadow-soft"
          : "text-fg-2 hover:text-fg hover:bg-bg-2/60",
      )}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  icon,
  htmlFor,
  rightSlot,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  htmlFor: string;
  rightSlot?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label
          htmlFor={htmlFor}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-fg-3"
        >
          {icon}
          {label}
        </label>
        {rightSlot}
      </div>
      {children}
    </div>
  );
}

const inputClass =
  "w-full h-10 rounded-lg border-base bg-bg-3 px-3 text-sm placeholder:text-fg-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

/* ─── Error message humanization ─────────────────────────────── */

function humanizeAuthError(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("invalid login")) {
    return "Email ou mot de passe incorrect.";
  }
  if (lower.includes("email not confirmed")) {
    return "Ton email n'est pas encore confirmé. Vérifie ta boîte mail.";
  }
  if (lower.includes("already registered") || lower.includes("user already")) {
    return "Un compte existe déjà avec cet email. Essaie de te connecter.";
  }
  if (lower.includes("password") && lower.includes("short")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }
  if (lower.includes("rate limit")) {
    return "Trop de tentatives. Réessaie dans quelques minutes.";
  }
  return raw;
}
