import type { PaymentMethodOption } from "@/types/billing";
import { useT } from "@/i18n/useT";

interface PaymentMethodSelectorProps {
  methods: PaymentMethodOption[];
  value: string;
  onChange: (methodId: string) => void;
  disabled?: boolean;
}

export function PaymentMethodSelector({
  methods,
  value,
  onChange,
  disabled,
}: PaymentMethodSelectorProps) {
  const t = useT();

  if (!methods.length) {
    return (
      <p className="text-sm text-fg-2">{t("billing.checkout.noMethods")}</p>
    );
  }

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-fg">
        {t("billing.checkout.paymentMethod")}
      </span>
      <select
        className="w-full rounded-lg border border-white/10 bg-bg-2 px-3 py-2.5 text-sm text-fg"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{t("billing.checkout.selectMethod")}</option>
        {methods.map((method) => (
          <option key={method.id} value={method.id}>
            {t(method.labelKey as never)}
          </option>
        ))}
      </select>
    </label>
  );
}
