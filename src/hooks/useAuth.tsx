import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export interface ProfileLinks {
  github?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
}

export interface UserProfile {
  id: string;
  fullName: string | null;
  username: string | null;
  role: "student" | "admin";
  bio: string | null;
  avatarUrl: string | null;
  links: ProfileLinks;
  isPublic: boolean;
}

export type UserProfileUpdate = Partial<{
  fullName: string | null;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  links: ProfileLinks;
  isPublic: boolean;
}>;

/** Supported third-party identity providers for OAuth sign-in. */
export type OAuthProvider = "google" | "github";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  /** `true` until the initial Supabase session has been resolved (or timed out). */
  loading: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (params: {
    email: string;
    password: string;
    fullName: string;
  }) => Promise<void>;
  /** Start an OAuth redirect flow (Google, GitHub, …). */
  signInWithProvider: (
    provider: OAuthProvider,
    options?: { redirectTo?: string },
  ) => Promise<void>;
  signOut: () => Promise<void>;
  /** Update the current user's profile row. Returns the persisted profile. */
  updateProfile: (patch: UserProfileUpdate) => Promise<UserProfile>;
  /** Update the current user's Supabase password. */
  updatePassword: (newPassword: string) => Promise<void>;
  /** Re-fetch the profile from backend (e.g. after elevation). */
  refreshProfile: () => Promise<void>;
}

/**
 * Safety net: if `getSession()` never resolves (e.g. orphan navigator lock in
 * React StrictMode, major clock skew, or network hang), we stop waiting after
 * this duration and let the app render. The session will be rehydrated later
 * via `onAuthStateChange` if/when it eventually resolves.
 */
const SESSION_BOOTSTRAP_TIMEOUT_MS = 6000;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const profileFetchedForRef = useRef<string | null>(null);

  /**
   * Fetch the profile row for the current user, creating it if missing.
   * Runs in the background — never blocks the auth `loading` state.
   */
  const fetchProfile = useCallback(async (user: User, force = false) => {
    if (!supabase) return;
    if (!force && profileFetchedForRef.current === user.id) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, username, role, bio, avatar_url, links, is_public")
        .eq("id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (!data) {
        const fallbackName =
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : null;

        const { error: upsertError } = await supabase.from("profiles").upsert(
          {
            id: user.id,
            full_name: fallbackName,
          },
          { onConflict: "id" },
        );

        if (upsertError) throw upsertError;

        profileFetchedForRef.current = user.id;
        setProfile({
          id: user.id,
          fullName: fallbackName,
          username: null,
          role: "student",
          bio: null,
          avatarUrl: null,
          links: {},
          isPublic: false,
        });
        return;
      }

      profileFetchedForRef.current = user.id;
      setProfile(rowToProfile(data));
    } catch (error) {
      console.warn(
        "[auth] Impossible de charger le profil:",
        (error as Error).message,
      );
    }
  }, []);

  /**
   * Auth bootstrap:
   *   1. Start listening for auth state changes.
   *   2. Fire `getSession()` to get the current session.
   *   3. Whichever resolves first flips `loading` to false.
   *   4. As a last resort, a timeout also flips `loading` to false so the
   *      UI never gets stuck on a blank "loading session" screen.
   *
   * Profile fetch is triggered in the background — it never blocks loading.
   */
  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const client = supabase;

    let active = true;
    let resolvedLoading = false;

    const resolveLoading = () => {
      if (!active || resolvedLoading) return;
      resolvedLoading = true;
      setLoading(false);
    };

    const bootstrapTimer = window.setTimeout(() => {
      if (!resolvedLoading) {
        console.warn(
          `[auth] Session pas résolue après ${SESSION_BOOTSTRAP_TIMEOUT_MS}ms, on affiche l'app quand même.`,
        );
        resolveLoading();
      }
    }, SESSION_BOOTSTRAP_TIMEOUT_MS);

    async function bootstrap() {
      try {
        const { data, error } = await client.auth.getSession();
        if (!active) return;

        if (error) {
          console.warn(
            "[auth] Impossible de récupérer la session:",
            error.message,
          );
          resolveLoading();
          return;
        }

        const nextSession = data.session ?? null;
        setSession(nextSession);
        if (nextSession?.user) {
          void fetchProfile(nextSession.user);
        } else {
          setProfile(null);
          profileFetchedForRef.current = null;
        }
      } catch (error) {
        console.warn(
          "[auth] Erreur pendant le bootstrap:",
          (error as Error).message,
        );
      } finally {
        resolveLoading();
      }
    }

    void bootstrap();

    const { data: subscription } = client.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!active) return;
        setSession(nextSession);
        resolveLoading();

        if (nextSession?.user) {
          void fetchProfile(nextSession.user);
        } else {
          setProfile(null);
          profileFetchedForRef.current = null;
        }
      },
    );

    return () => {
      active = false;
      window.clearTimeout(bootstrapTimer);
      subscription.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      throw new Error(
        "Supabase n'est pas configuré. Vérifie VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.",
      );
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  const signUp = useCallback(
    async ({
      email,
      password,
      fullName,
    }: {
      email: string;
      password: string;
      fullName: string;
    }) => {
      if (!supabase) {
        throw new Error(
          "Supabase n'est pas configuré. Vérifie VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.",
        );
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });
      if (error) throw error;
    },
    [],
  );

  const signInWithProvider = useCallback(
    async (provider: OAuthProvider, options?: { redirectTo?: string }) => {
      if (!supabase) {
        throw new Error(
          "Supabase n'est pas configuré. Vérifie VITE_SUPABASE_URL et VITE_SUPABASE_PUBLISHABLE_KEY.",
        );
      }
      const redirectTo =
        options?.redirectTo ??
        (typeof window !== "undefined"
          ? `${window.location.origin}/auth`
          : undefined);

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
        },
      });
      if (error) throw error;
      // On success, the browser is redirected to the provider. Any code after
      // this line typically won't execute — we still await to surface errors.
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (!supabase) return;
    profileFetchedForRef.current = null;
    setProfile(null);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const updateProfile = useCallback(
    async (patch: UserProfileUpdate): Promise<UserProfile> => {
      if (!supabase) {
        throw new Error("Supabase n'est pas configuré.");
      }
      const currentUser = session?.user;
      if (!currentUser) {
        throw new Error("Aucune session active.");
      }

      const payload: Record<string, unknown> = { id: currentUser.id };
      if (patch.fullName !== undefined) {
        payload.full_name = patch.fullName?.toString().trim() || null;
      }
      if (patch.username !== undefined) {
        const normalized = patch.username?.toString().trim().toLowerCase();
        if (normalized && !/^[a-z0-9_]{3,30}$/.test(normalized)) {
          throw new Error(
            "Le pseudo doit contenir 3 à 30 caractères (lettres, chiffres, _).",
          );
        }
        payload.username = normalized || null;
      }
      if (patch.bio !== undefined) {
        const nextBio = patch.bio?.toString().trim() || null;
        if (nextBio && nextBio.length > 240) {
          throw new Error("La bio ne doit pas dépasser 240 caractères.");
        }
        payload.bio = nextBio;
      }
      if (patch.avatarUrl !== undefined) {
        payload.avatar_url = patch.avatarUrl || null;
      }
      if (patch.links !== undefined) {
        payload.links = patch.links ?? {};
      }
      if (patch.isPublic !== undefined) {
        payload.is_public = Boolean(patch.isPublic);
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert(payload, { onConflict: "id" })
        .select("id, full_name, username, role, bio, avatar_url, links, is_public")
        .single();

      if (error) {
        // Postgres unique violation → friendlier message.
        if (error.code === "23505") {
          throw new Error("Ce pseudo est déjà pris. Essaie une variante.");
        }
        throw error;
      }

      const next = rowToProfile(data);
      setProfile(next);
      return next;
    },
    [session],
  );

  const updatePassword = useCallback(async (newPassword: string) => {
    if (!supabase) {
      throw new Error("Supabase n'est pas configuré.");
    }
    if (newPassword.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
    }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }, []);

  const refreshProfile = useCallback(async () => {
    const currentUser = session?.user;
    if (!currentUser) return;
    await fetchProfile(currentUser, true);
  }, [fetchProfile, session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      configured: isSupabaseConfigured,
      signIn,
      signUp,
      signInWithProvider,
      signOut,
      updateProfile,
      updatePassword,
      refreshProfile,
    }),
    [
      session,
      profile,
      loading,
      signIn,
      signUp,
      signInWithProvider,
      signOut,
      updateProfile,
      updatePassword,
      refreshProfile,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être appelé à l'intérieur d'un <AuthProvider>");
  }
  return ctx;
}

/* ─── Helpers ────────────────────────────────────────────────── */

function rowToProfile(data: Record<string, unknown>): UserProfile {
  const rawLinks = data.links;
  const links: ProfileLinks =
    rawLinks && typeof rawLinks === "object" && !Array.isArray(rawLinks)
      ? (rawLinks as ProfileLinks)
      : {};
  const rawRole = (data.role as string | null) ?? "student";
  const role: "student" | "admin" = rawRole === "admin" ? "admin" : "student";
  return {
    id: data.id as string,
    fullName: (data.full_name as string | null) ?? null,
    username: (data.username as string | null) ?? null,
    role,
    bio: (data.bio as string | null) ?? null,
    avatarUrl: (data.avatar_url as string | null) ?? null,
    links,
    isPublic: Boolean(data.is_public),
  };
}
