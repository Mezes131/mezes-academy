import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, Clock3, Mail, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Faq } from "@/components/ui/Faq";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useT } from "@/i18n/useT";
import { useLocale } from "@/i18n/LocaleProvider";
import type { MessageKey } from "@/i18n/useT";
import { cn } from "@/lib/utils";

const SUBJECTS: { id: string; key: MessageKey }[] = [
  { id: "track", key: "academy.contact.subjectTrack" },
  { id: "lesson", key: "academy.contact.subjectLesson" },
  { id: "account", key: "academy.contact.subjectAccount" },
  { id: "email", key: "academy.contact.subjectEmail" },
];

const FAQS: { q: MessageKey; a: MessageKey }[] = [
  { q: "academy.contact.faqDelayQ", a: "academy.contact.faqDelayA" },
  { q: "academy.contact.faqIncludeQ", a: "academy.contact.faqIncludeA" },
  { q: "academy.contact.faqPaidQ", a: "academy.contact.faqPaidA" },
];

const fieldClass = cn(
  "w-full min-h-11 rounded-lg border-base bg-bg-3 px-3 text-sm text-fg",
  "placeholder:text-fg-3",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
);

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Academy contact: info left, form right (half width), FAQ full width below.
 */
export function ContactPage() {
  const t = useT();
  const { locale } = useLocale();
  const desk = t("academy.contact.email");
  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [subjectId, setSubjectId] = useState(SUBJECTS[0].id);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const subjectKey =
    SUBJECTS.find((s) => s.id === subjectId)?.key ?? SUBJECTS[0].key;

  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? "";
    document.title = t("academy.contact.seoTitle");
    meta?.setAttribute("content", t("academy.contact.seoDesc"));
    return () => {
      document.title = prevTitle;
      meta?.setAttribute("content", prevDesc);
    };
  }, [locale, t]);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = t("academy.contact.errorName");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from.trim())) {
      next.email = t("academy.contact.errorEmail");
    }
    if (message.trim().length < 12) next.message = t("academy.contact.errorMessage");
    return next;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    const body = [
      `${t("academy.contact.name")}: ${name.trim()}`,
      `${t("academy.contact.emailLabel")}: ${from.trim()}`,
      "",
      message.trim(),
    ].join("\n");
    const href = `mailto:${desk}?subject=${encodeURIComponent(t(subjectKey))}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  useEffect(() => {
    if (!sent) return;
    successRef.current?.focus();
  }, [sent]);

  function writeAgain() {
    setSent(false);
    setName("");
    setFrom("");
    setSubjectId(SUBJECTS[0].id);
    setMessage("");
    setErrors({});
  }

  const errorList = Object.entries(errors) as [keyof Errors, string][];

  return (
    <article className="contact-page">
      <section className="contact-pane">
        <div className="contact-pane-inner">
          <div className="contact-copy">
            <h1 className="text-[clamp(2.25rem,5.5vw,3.75rem)] font-extrabold leading-[0.96] tracking-[-0.04em] text-fg">
              {t("academy.contact.title")}
            </h1>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.7] text-fg-2 md:text-[17px]">
              {t("academy.contact.lead")}
            </p>
            <ul className="mt-8 space-y-3">
              <ContactFact
                icon={<Mail size={18} strokeWidth={1.75} aria-hidden="true" />}
              >
                <a
                  href={`mailto:${desk}`}
                  className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm"
                >
                  {desk}
                </a>
              </ContactFact>
              <ContactFact
                icon={<MapPinned size={18} strokeWidth={1.75} aria-hidden="true" />}
              >
                {t("academy.contact.location")}
              </ContactFact>
              <ContactFact
                icon={<Clock3 size={18} strokeWidth={1.75} aria-hidden="true" />}
              >
                <span className="text-fg-2">{t("academy.contact.hours")}</span>
              </ContactFact>
            </ul>
            <SocialLinks className="mt-6" iconSize={17} />
          </div>

          <form className="contact-mail p-5 md:p-7" noValidate onSubmit={onSubmit}>
            {sent ? (
              <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="contact-success flex min-h-[20rem] flex-col justify-center focus:outline-none"
              >
                <span className="flex size-11 items-center justify-center rounded-lg border-base bg-bg-3 text-accent-2">
                  <Check size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-[1.35rem] font-extrabold tracking-[-0.03em] text-fg">
                  {t("academy.contact.successTitle")}
                </h2>
                <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.65] text-fg-2">
                  {t("academy.contact.successBody")}
                </p>
                <Button type="button" variant="ghost" className="mt-6 w-fit" onClick={writeAgain}>
                  {t("academy.contact.successAgain")}
                </Button>
              </div>
            ) : (
              <>
            <p className="font-mono text-[11px] tracking-[0.06em] text-fg-3">
              {t("academy.contact.compose")}
            </p>

            {errorList.length > 0 ? (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <p className="font-semibold text-fg">{t("academy.contact.errorSummary")}</p>
                <ul className="mt-1 list-disc pl-4">
                  {errorList.map(([field, msg]) => (
                    <li key={field}>
                      <a href={`#${uid}-${field}`} className="underline-offset-2 hover:underline">
                        {msg}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-name`} className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-fg-3">
                  {t("academy.contact.name")}
                </label>
                <input
                  id={`${uid}-name`}
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                />
                {errors.name ? (
                  <p id={`${uid}-name-err`} className="mt-1 text-[12px] text-red-400">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-fg-3">
                  {t("academy.contact.emailLabel")}
                </label>
                <input
                  id={`${uid}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className={fieldClass}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                />
                {errors.email ? (
                  <p id={`${uid}-email-err`} className="mt-1 text-[12px] text-red-400">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-subject`} className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-fg-3">
                  {t("academy.contact.subject")}
                </label>
                <select
                  id={`${uid}-subject`}
                  name="subject"
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className={cn(fieldClass, "appearance-none")}
                >
                  {SUBJECTS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {t(item.key)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-message`} className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-fg-3">
                  {t("academy.contact.message")}
                </label>
                <textarea
                  id={`${uid}-message`}
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(fieldClass, "resize-y py-2.5")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${uid}-message-err` : undefined}
                />
                {errors.message ? (
                  <p id={`${uid}-message-err`} className="mt-1 text-[12px] text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>
            </div>

            <Button type="submit" className="mt-5">
              {t("academy.contact.send")}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
              </>
            )}
          </form>
        </div>
      </section>

      <Faq
        className="contact-faq"
        title={t("academy.contact.faqTitle")}
        items={FAQS.map((item) => ({
          question: t(item.q),
          answer: t(item.a),
        }))}
      />
    </article>
  );
}

function ContactFact({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 text-[15px] text-fg">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border-base bg-bg-2 text-accent-2">
        {icon}
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}
