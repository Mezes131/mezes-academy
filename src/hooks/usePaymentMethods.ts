import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { PaymentMethodOption, PaymentMethodsResponse } from "@/types/billing";

function getPaymentMethodsUrl(country: string): string | null {
  const base = import.meta.env.VITE_SUPABASE_URL;
  if (!base || !isSupabaseConfigured) return null;
  const params = new URLSearchParams({ country });
  return `${String(base).replace(/\/$/, "")}/functions/v1/payment-methods?${params}`;
}

export function usePaymentMethods(country: string) {
  const [methods, setMethods] = useState<PaymentMethodOption[]>([]);
  const [resolvedCountry, setResolvedCountry] = useState(country);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const url = getPaymentMethodsUrl(country);

    async function load() {
      if (!url) {
        if (!cancelled) {
          setMethods([]);
          setError("billing.errors.notConfigured");
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = (await res.json()) as PaymentMethodsResponse;
        if (!cancelled) {
          setMethods(data.methods ?? []);
          setResolvedCountry(data.country ?? country);
        }
      } catch (err) {
        if (!cancelled) {
          setMethods([]);
          setError(err instanceof Error ? err.message : "billing.errors.loadFailed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [country]);

  return { methods, country: resolvedCountry, loading, error };
}
