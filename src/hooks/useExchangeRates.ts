import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import type { ExchangeRates } from "@/lib/billing/currency";

const FALLBACK_RATES: ExchangeRates = {
  EUR: 1,
  USD: 1.08,
  XOF: 655.957,
  XAF: 655.957,
  KES: 140,
  RWF: 1400,
  UGX: 4200,
  CDF: 2800,
  SLE: 24,
  ZMW: 28,
};

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isSupabaseConfigured || !supabase) {
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("exchange_rates")
          .select("currency, rate_from_eur");

        if (error) throw error;

        const next: ExchangeRates = { ...FALLBACK_RATES };
        for (const row of data ?? []) {
          next[row.currency] = Number(row.rate_from_eur);
        }

        if (!cancelled) setRates(next);
      } catch {
        if (!cancelled) setRates(FALLBACK_RATES);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { rates, loading };
}
