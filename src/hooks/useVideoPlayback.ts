import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { fetchVideoPlaybackUrl } from "@/lib/video/fetchVideoPlayback";

interface PlaybackState {
  url: string | null;
  expiresAt: string | null;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export function useVideoPlayback(objectKey: string | undefined): PlaybackState {
  const { session } = useAuth();
  const [url, setUrl] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nonce, setNonce] = useState(0);
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const retry = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    const key = objectKey?.trim();
    const accessToken = session?.access_token;
    const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;

    if (!key || !accessToken || !isSupabaseConfigured || !baseUrl) {
      setUrl(null);
      setExpiresAt(null);
      setLoading(false);
      return;
    }

    async function load() {
      setLoading(true);
      setError(false);
      const resolvedKey = key!;
      const resolvedBase = baseUrl!;
      const resolvedToken = accessToken!;
      try {
        const data = await fetchVideoPlaybackUrl(
          resolvedBase,
          resolvedToken,
          resolvedKey,
        );
        if (!cancelled) {
          setUrl(data.url);
          setExpiresAt(data.expiresAt);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [objectKey, session?.access_token, nonce]);

  useEffect(() => {
    if (!expiresAt) return;
    const ms = new Date(expiresAt).getTime() - Date.now() - 5 * 60 * 1000;
    if (ms <= 0) {
      retry();
      return;
    }
    refreshTimer.current = setTimeout(() => retry(), ms);
    return () => {
      if (refreshTimer.current) clearTimeout(refreshTimer.current);
    };
  }, [expiresAt, retry]);

  return { url, expiresAt, loading, error, retry };
}
