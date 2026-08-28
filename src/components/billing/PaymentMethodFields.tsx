import type { PaymentFieldSchema } from "@/types/billing";
import { useT } from "@/i18n/useT";

interface PaymentMethodFieldsProps {
  fields: PaymentFieldSchema[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  disabled?: boolean;
}

export function PaymentMethodFields({
  fields,
  values,
  onChange,
  disabled,
}: PaymentMethodFieldsProps) {
  const t = useT();

  if (!fields.length) return null;

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (field.type === "select") {
          return (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm font-medium text-fg">
                {field.label ?? field.name}
              </span>
              <select
                className="w-full rounded-lg border border-white/10 bg-bg-2 px-3 py-2.5 text-sm text-fg"
                value={values[field.name] ?? ""}
                disabled={disabled}
                onChange={(e) => onChange(field.name, e.target.value)}
              >
                <option value="">{t("billing.checkout.selectOption")}</option>
                {(field.options ?? []).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        return (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-fg">
              {field.label ?? field.name}
            </span>
            <div className="flex gap-2">
              {field.prefix && (
                <span className="inline-flex items-center rounded-lg border border-white/10 bg-bg-3 px-3 text-sm text-fg-2">
                  {field.prefix}
                </span>
              )}
              <input
                type={field.type === "tel" ? "tel" : "text"}
                className="w-full rounded-lg border border-white/10 bg-bg-2 px-3 py-2.5 text-sm text-fg"
                value={values[field.name] ?? ""}
                disabled={disabled}
                onChange={(e) => onChange(field.name, e.target.value)}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
}
