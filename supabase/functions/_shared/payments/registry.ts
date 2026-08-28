import type { PaymentProviderAdapter } from "./types.ts";

export class PaymentProviderRegistry {
  private adapters = new Map<string, PaymentProviderAdapter>();

  register(adapter: PaymentProviderAdapter): void {
    this.adapters.set(adapter.slug, adapter);
  }

  get(slug: string): PaymentProviderAdapter {
    const adapter = this.adapters.get(slug);
    if (!adapter) {
      throw new Error(`Unknown payment provider: ${slug}`);
    }
    return adapter;
  }

  has(slug: string): boolean {
    return this.adapters.has(slug);
  }
}

export function createRegistry(
  adapters: PaymentProviderAdapter[],
): PaymentProviderRegistry {
  const registry = new PaymentProviderRegistry();
  for (const adapter of adapters) {
    registry.register(adapter);
  }
  return registry;
}
