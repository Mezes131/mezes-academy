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

interface UserProfile {
  id: string;
  fullName: string | null;
  role: string | null;
}

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
  signOut: () => Promise<void>;
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
  const fetchProfile = useCallback(async (user: User) => {
    if (!supabase) return;
    if (profileFetchedForRef.current === user.id) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role")
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
          role: "student",
        });
        return;
      }

      profileFetchedForRef.current = user.id;
      setProfile({
        id: data.id as string,
        fullName: (data.full_name as string | null) ?? null,
        role: (data.role as string | null) ?? "student",
      });
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

  const signOut = useCallback(async () => {
    if (!supabase) return;
    profileFetchedForRef.current = null;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      configured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
    }),
    [session, profile, loading, signIn, signUp, signOut],
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
