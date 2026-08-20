/** Google Analytics measurement ID (gtag). */
export const GA_MEASUREMENT_ID = "G-RNTMY9351W";

export const COOKIE_CONSENT_KEY = "mezes.cookie-consent";

export type CookieConsent = "accepted" | "refused";

export const COOKIE_PREFERENCES_EVENT = "mezes:cookie-preferences";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let analyticsEnabled = false;

export function getCookieConsent(): CookieConsent | null {
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "refused") return value;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function setCookieConsent(value: CookieConsent): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

function ensureGtagStub(): void {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // Google's queue expects the Arguments object, not a rest array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
}

/** Load gtag.js once and configure the measurement ID. */
export function enableAnalytics(): void {
  if (typeof window === "undefined" || analyticsEnabled) return;
  ensureGtagStub();

  const src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  window.gtag!("js", new Date());
  window.gtag!("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
  });
  analyticsEnabled = true;
}

/** Stop analytics collection after a prior accept (Consent Mode). */
export function disableAnalytics(): void {
  if (typeof window === "undefined") return;
  analyticsEnabled = false;
  if (!window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function applyCookieConsent(value: CookieConsent): void {
  setCookieConsent(value);
  if (value === "accepted") {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
}

/** Open the consent banner again (footer / privacy). */
export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT));
}
