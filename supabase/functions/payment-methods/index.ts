import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

type FieldOption = { value: string; label: string };
type FieldSchemaItem = {
  name: string;
  type: string;
  required?: boolean;
  label?: string;
  prefix?: string;
  options?: FieldOption[];
};

type CountryConfig = {
  operators?: FieldOption[];
  default_currency?: string;
  phone_prefix?: string;
};

type PaymentMethodRow = {
  id: string;
  slug: string;
  type: string;
  label_i18n_key: string;
  icon: string;
  fields_schema: FieldSchemaItem[];
  currencies: string[];
  payment_providers: { slug: string };
};

type AvailabilityRow = {
  sort_order: number;
  config: CountryConfig;
  payment_methods: PaymentMethodRow;
};

function mergeFieldsWithCountryConfig(
  schema: FieldSchemaItem[],
  config: CountryConfig,
): FieldSchemaItem[] {
  return schema.map((field) => {
    if (field.name === "operator" && config.operators?.length) {
      return { ...field, options: config.operators };
    }
    if (field.name === "msisdn" && config.phone_prefix) {
      return { ...field, prefix: `+${config.phone_prefix}` };
    }
    return field;
  });
}

function mapMethod(row: AvailabilityRow) {
  const method = row.payment_methods;
  return {
    id: method.id,
    slug: method.slug,
    type: method.type,
    labelKey: method.label_i18n_key,
    icon: method.icon,
    providerSlug: method.payment_providers.slug,
    currencies: method.currencies,
    fields: mergeFieldsWithCountryConfig(
      method.fields_schema ?? [],
      row.config ?? {},
    ),
    sortOrder: row.sort_order,
    defaultCurrency: row.config?.default_currency ?? null,
  };
}

async function fetchMethodsForCountry(
  supabase: ReturnType<typeof createClient>,
  countryCode: string,
) {
  const { data, error } = await supabase
    .from("country_payment_availability")
    .select(
      `
      sort_order,
      config,
      payment_methods (
        id,
        slug,
        type,
        label_i18n_key,
        icon,
        fields_schema,
        currencies,
        payment_providers ( slug )
      )
    `,
    )
    .eq("country_code", countryCode)
    .eq("enabled", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return (data ?? []) as AvailabilityRow[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const url = new URL(req.url);
    const country = (url.searchParams.get("country") || "DEFAULT").toUpperCase();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    );

    let rows = await fetchMethodsForCountry(supabase, country);
    if (!rows.length && country !== "DEFAULT") {
      rows = await fetchMethodsForCountry(supabase, "DEFAULT");
    }

    const methods = rows
      .filter((row) => row.payment_methods)
      .map(mapMethod);

    return new Response(JSON.stringify({ country, methods }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
