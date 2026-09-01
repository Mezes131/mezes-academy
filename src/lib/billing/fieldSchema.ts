import type { PaymentFieldSchema } from "@/types/billing";

export type FieldErrors = Record<string, string>;

export function validateCheckoutFields(
  schema: PaymentFieldSchema[],
  values: Record<string, string>,
): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of schema) {
    const value = (values[field.name] ?? "").trim();
    if (field.required && !value) {
      errors[field.name] = "required";
      continue;
    }

    if (field.name === "msisdn" && value) {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 8 || digits.length > 15) {
        errors[field.name] = "invalid_phone";
      }
    }
  }

  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
