export interface EntitlementLike {
  expires_at: string | null;
}

export function isEntitlementActive(
  entitlement: EntitlementLike,
  now: Date = new Date(),
): boolean {
  if (!entitlement.expires_at) return true;
  return new Date(entitlement.expires_at).getTime() > now.getTime();
}

export function hasVideoAccess(
  entitlements: EntitlementLike[],
  now: Date = new Date(),
): boolean {
  return entitlements.some((e) => isEntitlementActive(e, now));
}
