import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { isEntitlementActive } from "@/lib/billing/entitlements";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { EntitlementSource, UserEntitlement } from "@/types/billing";

export interface EntitlementState {
  hasAccess: boolean;
  loading: boolean;
  expiresAt: string | null;
  source: EntitlementSource | null;
}

export function useEntitlement(feature: string): EntitlementState {
  const { user, loading: authLoading } = useAuth();
  const [rows, setRows] = useState<UserEntitlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user || !isSupabaseConfigured || !supabase) {
        if (!cancelled) {
          setRows([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from("entitlements")
        .select("feature, source, source_id, expires_at")
        .eq("user_id", user.id)
        .eq("feature", feature);

      if (!cancelled) {
        if (error) {
          console.warn("[useEntitlement]", error.message);
          setRows([]);
        } else {
          setRows((data ?? []) as UserEntitlement[]);
        }
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [user, feature]);

  return useMemo(() => {
    const active = rows.filter((row) => isEntitlementActive(row));
    const primary = active[0];
    return {
      hasAccess: active.length > 0,
      loading: authLoading || loading,
      expiresAt: primary?.expires_at ?? null,
      source: primary?.source ?? null,
    };
  }, [rows, authLoading, loading]);
}
