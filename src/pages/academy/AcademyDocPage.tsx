import { Mail } from "lucide-react";
import { AcademyPage } from "@/components/academy/AcademyPage";
import { useT } from "@/i18n/useT";
import type { MessageKey } from "@/i18n/useT";

export type AcademyDoc = "contact" | "terms" | "privacy" | "legal";

const DOC_PARAS: Record<AcademyDoc, MessageKey[]> = {
  contact: ["academy.contact.p1", "academy.contact.p2"],
  terms: [
    "academy.terms.p1",
    "academy.terms.p2",
    "academy.terms.p3",
    "academy.terms.p4",
  ],
  privacy: [
    "academy.privacy.p1",
    "academy.privacy.p2",
    "academy.privacy.p3",
    "academy.privacy.p4",
  ],
  legal: [
    "academy.legal.p1",
    "academy.legal.p2",
    "academy.legal.p3",
    "academy.legal.p4",
  ],
};

const TITLE: Record<AcademyDoc, MessageKey> = {
  contact: "academy.contact.title",
  terms: "academy.terms.title",
  privacy: "academy.privacy.title",
  legal: "academy.legal.title",
};

const EYEBROW: Record<AcademyDoc, MessageKey> = {
  contact: "academy.contact.eyebrow",
  terms: "academy.terms.eyebrow",
  privacy: "academy.privacy.eyebrow",
  legal: "academy.legal.eyebrow",
};

const LEAD: Record<AcademyDoc, MessageKey> = {
  contact: "academy.contact.lead",
  terms: "academy.terms.lead",
  privacy: "academy.privacy.lead",
  legal: "academy.legal.lead",
};

/**
 * Thin academy document page. Copy lives in i18n (`academy.*`).
 */
export function AcademyDocPage({ doc }: { doc: AcademyDoc }) {
  const t = useT();
  const showDisclaimer = doc === "terms" || doc === "privacy" || doc === "legal";
  const email = t("academy.contact.email");

  return (
    <AcademyPage eyebrow={t(EYEBROW[doc])} title={t(TITLE[doc])} lead={t(LEAD[doc])}>
      {DOC_PARAS[doc].map((key) => (
        <p key={key}>{t(key)}</p>
      ))}
      {doc === "contact" ? (
        <p>
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border-base bg-bg-2 px-4 text-[15px] font-medium text-fg hover:bg-bg-3"
          >
            <Mail size={16} aria-hidden="true" />
            {email}
          </a>
        </p>
      ) : null}
      {showDisclaimer ? (
        <p className="text-[14px] text-fg-3">{t("academy.disclaimer")}</p>
      ) : null}
    </AcademyPage>
  );
}
