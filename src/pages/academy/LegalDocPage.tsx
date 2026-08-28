import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check, Clock3, History } from "lucide-react";
import { useT } from "@/i18n/useT";
import { useLocalePath } from "@/i18n/useLocalePath";
import type { MessageKey } from "@/i18n/useT";
import { cn } from "@/lib/utils";

export type AcademyDoc = "terms" | "privacy" | "legal";

/** A paragraph key, or a group of keys rendered as a bullet list. */
type Block = MessageKey | MessageKey[];

type Section = { id: string; title: MessageKey; blocks: Block[] };

const SECTIONS: Record<AcademyDoc, Section[]> = {
  terms: [
    {
      id: "scope",
      title: "academy.terms.scopeTitle",
      blocks: ["academy.terms.scopeP1", "academy.terms.scopeP2"],
    },
    {
      id: "who",
      title: "academy.terms.whoTitle",
      blocks: ["academy.terms.whoP1", "academy.terms.whoP2"],
    },
    {
      id: "account",
      title: "academy.terms.accountTitle",
      blocks: [
        "academy.terms.accountP1",
        [
          "academy.terms.accountB1",
          "academy.terms.accountB2",
          "academy.terms.accountB3",
        ],
        "academy.terms.accountP2",
      ],
    },
    {
      id: "access",
      title: "academy.terms.accessTitle",
      blocks: ["academy.terms.accessP1", "academy.terms.accessP2"],
    },
    {
      id: "billing",
      title: "academy.terms.billingTitle",
      blocks: [
        "academy.terms.billingP1",
        "academy.terms.billingP2",
        "academy.terms.billingP3",
      ],
    },
    {
      id: "use",
      title: "academy.terms.useTitle",
      blocks: [
        "academy.terms.useP1",
        [
          "academy.terms.useB1",
          "academy.terms.useB2",
          "academy.terms.useB3",
          "academy.terms.useB4",
        ],
        "academy.terms.useP2",
      ],
    },
    {
      id: "ip",
      title: "academy.terms.ipTitle",
      blocks: ["academy.terms.ipP1", "academy.terms.ipP2"],
    },
    {
      id: "ai",
      title: "academy.terms.aiTitle",
      blocks: ["academy.terms.aiP1", "academy.terms.aiP2"],
    },
    {
      id: "no-promise",
      title: "academy.terms.noPromiseTitle",
      blocks: [
        "academy.terms.noPromiseP1",
        [
          "academy.terms.noPromiseB1",
          "academy.terms.noPromiseB2",
          "academy.terms.noPromiseB3",
        ],
        "academy.terms.noPromiseP2",
      ],
    },
    {
      id: "liability",
      title: "academy.terms.liabilityTitle",
      blocks: ["academy.terms.liabilityP1", "academy.terms.liabilityP2"],
    },
    {
      id: "end",
      title: "academy.terms.endTitle",
      blocks: ["academy.terms.endP1", "academy.terms.endP2"],
    },
    {
      id: "changes",
      title: "academy.terms.changesTitle",
      blocks: ["academy.terms.changesP1", "academy.terms.changesP2"],
    },
    {
      id: "law",
      title: "academy.terms.lawTitle",
      blocks: ["academy.terms.lawP1", "academy.terms.lawP2"],
    },
  ],
  privacy: [
    {
      id: "controller",
      title: "academy.privacy.controllerTitle",
      blocks: ["academy.privacy.controllerP1", "academy.privacy.controllerP2"],
    },
    {
      id: "data",
      title: "academy.privacy.dataTitle",
      blocks: [
        "academy.privacy.dataP1",
        [
          "academy.privacy.dataB1",
          "academy.privacy.dataB2",
          "academy.privacy.dataB3",
          "academy.privacy.dataB4",
          "academy.privacy.dataB5",
          "academy.privacy.dataB6",
        ],
        "academy.privacy.dataP2",
      ],
    },
    {
      id: "why",
      title: "academy.privacy.whyTitle",
      blocks: [
        "academy.privacy.whyP1",
        [
          "academy.privacy.whyB1",
          "academy.privacy.whyB2",
          "academy.privacy.whyB3",
          "academy.privacy.whyB4",
        ],
        "academy.privacy.whyP2",
      ],
    },
    {
      id: "storage",
      title: "academy.privacy.storageTitle",
      blocks: ["academy.privacy.storageP1", "academy.privacy.storageP2"],
    },
    {
      id: "processors",
      title: "academy.privacy.processorsTitle",
      blocks: [
        "academy.privacy.processorsP1",
        [
          "academy.privacy.processorsB1",
          "academy.privacy.processorsB2",
          "academy.privacy.processorsB3",
        ],
        "academy.privacy.processorsP2",
      ],
    },
    {
      id: "transfers",
      title: "academy.privacy.transfersTitle",
      blocks: ["academy.privacy.transfersP1"],
    },
    {
      id: "retention",
      title: "academy.privacy.retentionTitle",
      blocks: [
        "academy.privacy.retentionP1",
        [
          "academy.privacy.retentionB1",
          "academy.privacy.retentionB2",
          "academy.privacy.retentionB3",
          "academy.privacy.retentionB4",
        ],
      ],
    },
    {
      id: "rights",
      title: "academy.privacy.rightsTitle",
      blocks: ["academy.privacy.rightsP1", "academy.privacy.rightsP2"],
    },
    {
      id: "security",
      title: "academy.privacy.securityTitle",
      blocks: ["academy.privacy.securityP1", "academy.privacy.securityP2"],
    },
    {
      id: "minors",
      title: "academy.privacy.minorsTitle",
      blocks: ["academy.privacy.minorsP1"],
    },
    {
      id: "changes",
      title: "academy.privacy.changesTitle",
      blocks: ["academy.privacy.changesP1"],
    },
  ],
  legal: [
    {
      id: "publisher",
      title: "academy.legal.publisherTitle",
      blocks: ["academy.legal.publisherP1", "academy.legal.publisherP2"],
    },
    {
      id: "contact",
      title: "academy.legal.contactTitle",
      blocks: ["academy.legal.contactP1", "academy.legal.contactP2"],
    },
    {
      id: "hosting",
      title: "academy.legal.hostingTitle",
      blocks: ["academy.legal.hostingP1", "academy.legal.hostingP2"],
    },
    {
      id: "ip",
      title: "academy.legal.ipTitle",
      blocks: ["academy.legal.ipP1", "academy.legal.ipP2"],
    },
    {
      id: "content",
      title: "academy.legal.contentTitle",
      blocks: ["academy.legal.contentP1", "academy.legal.contentP2"],
    },
    {
      id: "links",
      title: "academy.legal.linksTitle",
      blocks: ["academy.legal.linksP1"],
    },
    {
      id: "report",
      title: "academy.legal.reportTitle",
      blocks: ["academy.legal.reportP1", "academy.legal.reportP2"],
    },
    {
      id: "a11y",
      title: "academy.legal.a11yTitle",
      blocks: ["academy.legal.a11yP1", "academy.legal.a11yP2"],
    },
    {
      id: "data",
      title: "academy.legal.dataTitle",
      blocks: ["academy.legal.dataP1"],
    },
    {
      id: "law",
      title: "academy.legal.lawTitle",
      blocks: ["academy.legal.lawP1"],
    },
  ],
};

const HEAD: Record<
  AcademyDoc,
  {
    eyebrow: MessageKey;
    title: MessageKey;
    lead: MessageKey;
    updated: MessageKey;
    readTime: MessageKey;
    brief: [MessageKey, MessageKey, MessageKey];
    seoTitle: MessageKey;
    seoDesc: MessageKey;
  }
> = {
  terms: {
    eyebrow: "academy.terms.eyebrow",
    title: "academy.terms.title",
    lead: "academy.terms.lead",
    updated: "academy.terms.updated",
    readTime: "academy.terms.readTime",
    brief: [
      "academy.terms.brief1",
      "academy.terms.brief2",
      "academy.terms.brief3",
    ],
    seoTitle: "academy.terms.seoTitle",
    seoDesc: "academy.terms.seoDesc",
  },
  privacy: {
    eyebrow: "academy.privacy.eyebrow",
    title: "academy.privacy.title",
    lead: "academy.privacy.lead",
    updated: "academy.privacy.updated",
    readTime: "academy.privacy.readTime",
    brief: [
      "academy.privacy.brief1",
      "academy.privacy.brief2",
      "academy.privacy.brief3",
    ],
    seoTitle: "academy.privacy.seoTitle",
    seoDesc: "academy.privacy.seoDesc",
  },
  legal: {
    eyebrow: "academy.legal.eyebrow",
    title: "academy.legal.title",
    lead: "academy.legal.lead",
    updated: "academy.legal.updated",
    readTime: "academy.legal.readTime",
    brief: [
      "academy.legal.brief1",
      "academy.legal.brief2",
      "academy.legal.brief3",
    ],
    seoTitle: "academy.legal.seoTitle",
    seoDesc: "academy.legal.seoDesc",
  },
};

const SIBLINGS: Record<AcademyDoc, { path: string; label: MessageKey }[]> = {
  terms: [
    { path: "/privacy", label: "footer.privacy" },
    { path: "/legal", label: "footer.legalNotice" },
  ],
  privacy: [
    { path: "/terms", label: "footer.terms" },
    { path: "/legal", label: "footer.legalNotice" },
  ],
  legal: [
    { path: "/terms", label: "footer.terms" },
    { path: "/privacy", label: "footer.privacy" },
  ],
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Legal document page (terms, privacy, legal notice): header, key points,
 * sticky table of contents on desktop, numbered sections. Copy lives in i18n.
 */
export function LegalDocPage({ doc }: { doc: AcademyDoc }) {
  const t = useT();
  const lp = useLocalePath();
  const uid = useId();
  const head = HEAD[doc];
  const sections = SECTIONS[doc];
  const email = t("academy.contact.email");
  const anchor = (id: string) => `${doc}-${id}`;
  const [active, setActive] = useState<string>(() => anchor(sections[0].id));

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(`${doc}-${s.id}`))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc, sections]);

  return (
    <article className="legal-page">
      <div className="legal-shell">
        <header className="legal-head">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3">
            {t(head.eyebrow)}
          </p>
          <h1 className="mt-3 text-[clamp(2.125rem,5vw,3.5rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-fg">
            {t(head.title)}
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.7] text-fg-2 md:text-[17px]">
            {t(head.lead)}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            <MetaChip icon={<History size={14} strokeWidth={1.75} />}>
              {t("academy.doc.updatedLabel")} · {t(head.updated)}
            </MetaChip>
            <MetaChip icon={<Clock3 size={14} strokeWidth={1.75} />}>
              {t(head.readTime)}
            </MetaChip>
          </ul>
        </header>

        <section className="legal-brief" aria-labelledby={`${uid}-brief`}>
          <h2
            id={`${uid}-brief`}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3"
          >
            {t("academy.doc.briefTitle")}
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {head.brief.map((key) => (
              <li key={key} className="flex gap-3">
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border-base bg-bg-3 text-accent-2"
                  aria-hidden="true"
                >
                  <Check size={13} strokeWidth={2.25} />
                </span>
                <span className="text-[14px] leading-[1.6] text-fg-2">
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="legal-body">
          <nav className="legal-toc" aria-labelledby={`${uid}-toc`}>
            <p
              id={`${uid}-toc`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3"
            >
              {t("academy.doc.toc")}
            </p>
            <ol className="mt-3">
              {sections.map((s, i) => {
                const id = anchor(s.id);
                const on = active === id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${id}`}
                      aria-current={on ? "true" : undefined}
                      className={cn("legal-toc-link", on && "is-active")}
                    >
                      <span className="legal-toc-num" aria-hidden="true">
                        {pad(i + 1)}
                      </span>
                      <span>{t(s.title)}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="legal-main">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={anchor(s.id)}
                className="legal-section"
                aria-labelledby={`${anchor(s.id)}-h`}
              >
                <h2
                  id={`${anchor(s.id)}-h`}
                  className="flex items-baseline gap-3 text-[1.25rem] font-extrabold tracking-[-0.03em] text-fg md:text-[1.375rem]"
                >
                  <span className="legal-num" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span>{t(s.title)}</span>
                </h2>
                {s.blocks.map((block) =>
                  Array.isArray(block) ? (
                    <ul key={block[0]} className="legal-list">
                      {block.map((key) => (
                        <li key={key}>{t(key)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={block} className="legal-p">
                      {t(block)}
                    </p>
                  ),
                )}
              </section>
            ))}

            <p className="mt-10 text-[13px] leading-[1.6] text-fg-3">
              {t("academy.disclaimer")}
            </p>

            <section className="legal-help" aria-labelledby={`${uid}-help`}>
              <h2
                id={`${uid}-help`}
                className="text-[1.125rem] font-extrabold tracking-[-0.03em] text-fg"
              >
                {t("academy.doc.helpTitle")}
              </h2>
              <p className="mt-2 max-w-[52ch] text-[14px] leading-[1.65] text-fg-2">
                {t("academy.doc.helpBody")}
              </p>
              <a
                href={`mailto:${email}`}
                className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-accent/90 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                {t("academy.doc.helpCta")}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </section>

            <section className="mt-10" aria-labelledby={`${uid}-also`}>
              <h2
                id={`${uid}-also`}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-3"
              >
                {t("academy.doc.alsoTitle")}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SIBLINGS[doc].map((item) => (
                  <li key={item.path}>
                    <Link to={lp(item.path)} className="legal-sibling">
                      {t(item.label)}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

function MetaChip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border-base bg-bg-2/70 px-3 py-1.5 text-[12px] text-fg-2">
      <span className="text-accent-2" aria-hidden="true">
        {icon}
      </span>
      {children}
    </li>
  );
}
