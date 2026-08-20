import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import {
  COOKIE_PREFERENCES_EVENT,
  applyCookieConsent,
  enableAnalytics,
  getCookieConsent,
} from "@/lib/analytics";

/**
 * Bottom cookie banner. Google Analytics loads only after explicit accept.
 */
export function CookieConsent() {
  const t = useT();
  const lp = useLocalePath();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getCookieConsent();
    if (stored === "accepted") {
      enableAnalytics();
      return;
    }
    if (stored === null) setVisible(true);
  }, []);

  useEffect(() => {
    function onOpen() {
      setVisible(true);
    }
    window.addEventListener(COOKIE_PREFERENCES_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_PREFERENCES_EVENT, onOpen);
  }, []);

  if (!visible) return null;

  function accept() {
    applyCookieConsent("accepted");
    setVisible(false);
  }

  function refuse() {
    applyCookieConsent("refused");
    setVisible(false);
  }

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent-panel">
        <div className="min-w-0">
          <h2
            id="cookie-consent-title"
            className="text-[15px] font-extrabold tracking-[-0.02em] text-fg"
          >
            {t("cookies.title")}
          </h2>
          <p
            id="cookie-consent-desc"
            className="mt-2 text-[13px] leading-[1.65] text-fg-2"
          >
            {t("cookies.body")}{" "}
            <Link
              to={lp("/privacy")}
              className="text-fg underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm"
            >
              {t("cookies.privacyLink")}
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-row items-center justify-end gap-2">
          <Button type="button" variant="ghost" onClick={refuse}>
            {t("cookies.refuse")}
          </Button>
          <Button type="button" onClick={accept}>
            {t("cookies.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
