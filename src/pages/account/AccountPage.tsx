import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  LayoutGrid,
  ShieldCheck,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, type UserProfile } from "@/hooks/useAuth";
import { ProfileHeader } from "./ProfileHeader";
import { OverviewTab } from "./tabs/OverviewTab";
import { PreferencesTab } from "./tabs/PreferencesTab";
import { SecurityTab } from "./tabs/SecurityTab";

type AccountTab = "overview" | "preferences" | "security";

const TABS: Array<{
  id: AccountTab;
  label: string;
  icon: React.ReactNode;
}> = [
  { id: "overview", label: "Aperçu", icon: <LayoutGrid size={14} /> },
  { id: "preferences", label: "Préférences", icon: <Sliders size={14} /> },
  { id: "security", label: "Compte & sécurité", icon: <ShieldCheck size={14} /> },
];

/**
 * Student account page.
 * The admin interface lives on a different (private) URL — not here.
 */
export function AccountPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    void refreshProfile();
  }, [refreshProfile]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const activeTab: AccountTab = useMemo(() => {
    const raw = searchParams.get("tab");
    if (raw === "preferences" || raw === "security") return raw;
    return "overview";
  }, [searchParams]);

  function goToTab(next: AccountTab) {
    const params = new URLSearchParams(searchParams);
    if (next === "overview") {
      params.delete("tab");
    } else {
      params.set("tab", next);
    }
    setSearchParams(params, { replace: true });
  }

  if (!user) return null;

  const email = user.email ?? "";
  const completeness = profile ? computeCompleteness(profile) : 0;

  return (
    <div className="relative min-h-[80vh]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <Link
          to="/react"
          className="inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-wider text-fg-3 hover:text-fg transition mb-6"
        >
          <ArrowLeft size={12} />
          Retour au parcours
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Mon compte
        </h1>
        <p className="mt-1.5 text-fg-2 text-[15px] leading-relaxed">
          Personnalise ton profil, tes préférences et les paramètres de sécurité.
        </p>

        <div className="mt-8 space-y-8">
          {profile ? (
            <ProfileHeader
              email={email}
              profile={profile}
              completeness={completeness}
              onError={(message) => setToast({ kind: "error", message })}
              onSuccess={(message) => setToast({ kind: "success", message })}
            />
          ) : (
            <div className="rounded-2xl border-base bg-bg-2 p-6 animate-pulse h-48" />
          )}

          <nav
            className="rounded-xl border-base bg-bg-2 p-1 flex gap-1 overflow-x-auto"
            role="tablist"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={tab.id === activeTab}
                onClick={() => goToTab(tab.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg text-sm font-semibold transition whitespace-nowrap",
                  tab.id === activeTab
                    ? "bg-bg text-fg shadow-soft"
                    : "text-fg-2 hover:text-fg hover:bg-bg-3",
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="pb-16">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "preferences" && (
              <PreferencesTab
                onError={(message) => setToast({ kind: "error", message })}
                onSuccess={(message) => setToast({ kind: "success", message })}
              />
            )}
            {activeTab === "security" && (
              <SecurityTab
                email={email}
                onError={(message) => setToast({ kind: "error", message })}
                onSuccess={(message) => setToast({ kind: "success", message })}
              />
            )}
          </div>
        </div>
      </div>

      {/* Lightweight toast */}
      {toast && (
        <div
          role="status"
          className={cn(
            "fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border px-4 py-2.5 text-[13px] font-medium shadow-soft animate-fade-in",
            toast.kind === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/30 bg-red-500/10 text-red-200",
          )}
        >
          <div className="inline-flex items-center gap-2">
            {toast.kind === "success" && <CheckCircle2 size={14} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────── */

function computeCompleteness(profile: UserProfile): number {
  let score = 0;
  if (profile.fullName) score += 25;
  if (profile.username) score += 25;
  if (profile.bio) score += 25;
  if (
    Object.values(profile.links ?? {}).some(
      (v) => typeof v === "string" && v.length > 0,
    )
  ) {
    score += 25;
  }
  return score;
}
