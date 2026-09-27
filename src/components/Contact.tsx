'use client';
import { useState, useCallback, useEffect, useRef, memo, type ReactNode } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, MessageCircle, Instagram, Mail, Loader2, Check, Linkedin, Youtube, Copy, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { socialLinks } from '@/data/socialLinks';
import { CalendlyDialog } from './contact/CalendlyDialog';
import { validateBrief, type Brief, type BriefErrors } from './contact/validate';

const serviceOptions = [
  { value: 'fast-24h', label: 'AI Creative Studio · Campaign & film' },
  { value: 'foundation-brand', label: 'Foundation · Brand system' },
  { value: 'clarity-advisory', label: 'Clarity · Strategy advisory' },
  { value: 'not-sure', label: 'Not sure yet · Help me figure it out' },
  { value: 'specific-request', label: 'Specific request · Email a founder' },
];

// /services pillar slugs → form subject values (?pillar= preselect)
const pillarToService: Record<string, string> = {
  ai: 'fast-24h',
  brand: 'foundation-brand',
  advisory: 'clarity-advisory',
};

const STUDIO_EMAIL = 'alchemylabs.work@gmail.com';
const WHATSAPP = 'https://wa.me/917794912315';
const founders = [
  { name: 'Aashrith', email: 'aashrithgade5@gmail.com' },
  { name: 'Eva', email: 'evadoshi05@gmail.com' },
];

const empty: Brief = { name: '', email: '', company: '', service: '', message: '' };
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const copy = (text: string) =>
  navigator.clipboard?.writeText(text).then(
    () => toast.success('Copied to clipboard'),
    () => toast.error('Couldn’t copy — select it manually.'),
  );

const label = 'block font-mono text-[10px] uppercase tracking-[0.2em] text-bone/55';
const field =
  'mt-2 block min-h-[48px] w-full rounded-2xl border bg-bone/[0.03] px-4 py-3 font-body text-[15px] text-bone placeholder:text-bone/25 outline-none transition-[border-color,background-color,box-shadow] duration-300 hover:border-bone/20 focus:bg-bone/[0.05] focus:border-ember/60 focus:shadow-[0_0_0_4px_rgba(255,77,28,0.12)] disabled:opacity-50';
const fieldBorder = (err?: string) => (err ? 'border-ember/70' : 'border-bone/10');

function Field({ id, text, error, hint, children }: { id: string; text: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pt-2 font-body text-xs text-ember"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
      {hint && !error && <p id={`${id}-hint`} className="pt-2 font-mono text-[10px] text-bone/35">{hint}</p>}
    </div>
  );
}

function Line({ href, icon, title, detail, external, onCopy }: { href: string; icon: ReactNode; title: string; detail: string; external?: boolean; onCopy?: () => void }) {
  return (
    <li className="group flex items-center gap-2 border-t border-bone/10 first:border-t-0">
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex min-h-[64px] min-w-0 flex-1 items-center gap-4 rounded-xl py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bone/10 text-ember transition-colors group-hover:border-ember/40">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block font-body text-sm font-semibold text-bone">{title}</span>
          <span className="block truncate font-mono text-[11px] text-bone/45">{detail}</span>
        </span>
        <ArrowUpRight aria-hidden className="ml-auto h-4 w-4 shrink-0 text-bone/30 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
      </a>
      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${detail}`}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-bone/40 transition-colors hover:bg-bone/5 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
        >
          <Copy className="h-3.5 w-3.5" aria-hidden />
        </button>
      )}
    </li>
  );
}

export const Contact = memo(() => {
  const [form, setForm] = useState<Brief>(empty);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // time-trap: bots submit within milliseconds of load; the server drops those
  const startedAt = useRef<number>(0);
  const [honeypot, setHoneypot] = useState('');
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [booked, setBooked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();

  const closeCalendly = useCallback(() => setCalendlyOpen(false), []);
  // Only fires on Calendly's own event_scheduled postMessage (origin-checked in the dialog).
  const onBooked = useCallback(() => {
    setCalendlyOpen(false);
    setBooked(true);
  }, []);

  // Honor /contact?pillar=<slug|value>: preselect the subject once on mount.
  useEffect(() => {
    const pillar = new URLSearchParams(window.location.search).get('pillar');
    if (!pillar) return;
    const value = pillarToService[pillar] ?? (serviceOptions.some((o) => o.value === pillar) ? pillar : null);
    if (value && value !== 'specific-request') setForm((f) => ({ ...f, service: value }));
  }, []);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = (k: keyof Brief) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    // Re-validate live only once a field already shows an error — no nagging while typing.
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: validateBrief(next)[k] }));
  };
  const blur = (k: keyof Brief) => () => {
    if (form[k]) setErrors((prev) => ({ ...prev, [k]: validateBrief(form)[k] }));
  };

  const handleService = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'specific-request') {
      window.location.href = `mailto:${socialLinks.founderEmail}?subject=Specific Request - Alchemy Labs`;
      return;
    }
    set('service')(e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateBrief(form);
    setErrors(found);
    const firstBad = (['name', 'email', 'message'] as const).find((k) => found[k]);
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`#c-${firstBad}`)?.focus();
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Patches-2: our own server route (app/api/brief) validates, drops
      // bots (honeypot + time-trap + rate limit), emails the founders and
      // stores the brief. No third-party widget can block a real client.
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot, startedAt: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.');
      setIsSubmitted(true);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Something went wrong.';
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const reveal = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-40px' },
          transition: { duration: 0.6, delay: 0.05 * i, ease },
        };

  const bookButton = (text: string, primary = false) => (
    <button
      type="button"
      onClick={() => setCalendlyOpen(true)}
      className={`cta-sheen inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-full px-7 font-body text-sm font-semibold transition-[transform,background-color,border-color] duration-300 hover:-translate-y-px active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember sm:w-auto ${
        primary ? 'bg-bone text-void hover:bg-white' : 'border border-bone/15 text-bone hover:border-ember/50'
      }`}
    >
      <Calendar className="h-4 w-4" aria-hidden />
      {text}
    </button>
  );

  return (
    <section id="contact" className="relative px-5 py-10 sm:px-8 md:px-14 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Left — direct lines */}
        <aside className="min-w-0 lg:border-r lg:border-bone/[0.07] lg:pr-14">
          <m.p {...reveal(0)} className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/50">Direct lines</m.p>
          <m.h2 {...reveal(1)} className="glass-type mt-4 font-headline text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone">
            Let&rsquo;s build something <span className="font-playfair font-normal italic text-ember">inevitable</span>.
          </m.h2>
          <m.p {...reveal(2)} className="mt-4 max-w-sm font-body text-[15px] leading-relaxed text-bone/60">
            Brief us in a few minutes, or book a call if you&rsquo;d rather talk.
          </m.p>

          <m.ul {...reveal(3)} className="mt-8">
            <Line href={`mailto:${STUDIO_EMAIL}?subject=Inquiry – Alchemy Labs`} icon={<Mail className="h-4 w-4" aria-hidden />} title="Email the studio" detail={STUDIO_EMAIL} onCopy={() => copy(STUDIO_EMAIL)} />
            <Line href={WHATSAPP} external icon={<MessageCircle className="h-4 w-4" aria-hidden />} title="WhatsApp" detail="+91 77949 12315" />
          </m.ul>

          <m.div {...reveal(4)} className="mt-8 border-t border-bone/10 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40">Speak to a founder</p>
            <ul className="mt-2">
              {founders.map((f) => (
                <Line key={f.email} href={`mailto:${f.email}?subject=Direct Inquiry – Alchemy Labs`} icon={<Mail className="h-4 w-4" aria-hidden />} title={f.name} detail={f.email} onCopy={() => copy(f.email)} />
              ))}
            </ul>
          </m.div>

          <m.div {...reveal(6)} className="mt-8 flex gap-2">
            {[
              { href: socialLinks.instagram, Icon: Instagram, name: 'Instagram' },
              { href: socialLinks.linkedin, Icon: Linkedin, name: 'LinkedIn' },
              { href: socialLinks.youtube, Icon: Youtube, name: 'YouTube' },
            ].map(({ href, Icon, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Alchemy Labs on ${name}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/10 text-bone/55 transition-colors hover:border-ember/40 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </m.div>
        </aside>

        {/* Right — book or brief */}
        <div className="min-w-0">
          <AnimatePresence>
            {booked && (
              <m.div
                role="status"
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 flex items-start gap-3 rounded-2xl border border-ember/30 bg-ember/[0.06] p-4"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" aria-hidden />
                <p className="font-body text-sm text-bone/85">
                  Your call is booked. Calendly will email the invite — see you there.
                </p>
              </m.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            {!isSubmitted ? (
              <m.div key="form" exit={reduce ? undefined : { opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                {/* Primary alternative: book a call */}
                <m.div {...reveal(1)} className="relative overflow-hidden rounded-[20px] border border-ember/25 bg-[linear-gradient(135deg,rgba(255,77,28,0.10),rgba(237,230,221,0.02)_55%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/45">Strategy call · 30 min</p>
                      <p className="mt-2 font-headline text-xl font-bold text-bone">
                        Rather <span className="font-playfair font-normal italic">talk</span> it through?
                      </p>
                    </div>
                    {bookButton('Book a call', true)}
                  </div>
                </m.div>

                <div className="my-8 flex items-center gap-4" aria-hidden>
                  <span className="h-px flex-1 bg-bone/10" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone/35">or send a brief</span>
                  <span className="h-px flex-1 bg-bone/10" />
                </div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Project brief" className="relative space-y-6">
                  <m.div {...reveal(2)} className="grid gap-6 sm:grid-cols-2">
                    <Field id="c-name" text="Your name *" error={errors.name}>
                      <input id="c-name" type="text" autoComplete="name" required value={form.name} onChange={set('name')} onBlur={blur('name')} placeholder="Alex Rivera" disabled={isSubmitting} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-error' : undefined} className={`${field} ${fieldBorder(errors.name)}`} />
                    </Field>
                    <Field id="c-email" text="Email *" error={errors.email}>
                      <input id="c-email" type="email" inputMode="email" autoComplete="email" required value={form.email} onChange={set('email')} onBlur={blur('email')} placeholder="alex@company.com" disabled={isSubmitting} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-error' : undefined} className={`${field} ${fieldBorder(errors.email)}`} />
                    </Field>
                  </m.div>

                  <m.div {...reveal(3)} className="grid gap-6 sm:grid-cols-2">
                    <Field id="c-company" text="Company">
                      <input id="c-company" type="text" autoComplete="organization" value={form.company} onChange={set('company')} placeholder="Optional" disabled={isSubmitting} className={`${field} ${fieldBorder()}`} />
                    </Field>
                    <Field id="c-service" text="What do you need?" hint="“Specific request” opens your email app">
                      <select id="c-service" value={form.service} onChange={handleService} disabled={isSubmitting} aria-describedby="c-service-hint" className={`${field} ${fieldBorder()} cursor-pointer appearance-none pr-10 [background-image:linear-gradient(45deg,transparent_50%,rgba(237,230,221,0.5)_50%),linear-gradient(135deg,rgba(237,230,221,0.5)_50%,transparent_50%)] [background-position:calc(100%-20px)_50%,calc(100%-15px)_50%] [background-repeat:no-repeat] [background-size:5px_5px]`}>
                        <option value="" disabled className="bg-carbon text-bone/40">Choose one</option>
                        {serviceOptions.map((o) => (
                          <option key={o.value} value={o.value} className="bg-carbon text-bone">{o.label}</option>
                        ))}
                      </select>
                    </Field>
                  </m.div>

                  <m.div {...reveal(4)}>
                    <Field id="c-message" text="What are we building? *" error={errors.message}>
                      <textarea id="c-message" required rows={5} maxLength={5000} value={form.message} onChange={set('message')} onBlur={blur('message')} placeholder="The vision, the timeline, what good looks like." disabled={isSubmitting} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-error' : undefined} className={`${field} ${fieldBorder(errors.message)} resize-y`} />
                    </Field>
                  </m.div>

                  {/* honeypot — off-screen, skipped by keyboard + screen readers */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="c-website">Website</label>
                    <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </div>

                  {submitError && (
                    <p role="alert" className="rounded-2xl border border-ember/40 bg-ember/[0.06] p-4 font-body text-sm text-bone/85">
                      {submitError}{' '}
                      <a href={`mailto:${STUDIO_EMAIL}?subject=Project brief`} className="underline decoration-ember/60 underline-offset-4">Email the brief</a>
                      {' '}or{' '}
                      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="underline decoration-ember/60 underline-offset-4">WhatsApp us</a>.
                    </p>
                  )}

                  <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">NDA available on request</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cta-sheen inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-full bg-ember px-8 font-body text-sm font-semibold text-void transition-[transform,background-color,opacity] duration-300 hover:-translate-y-px hover:bg-amber active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bone sm:w-auto"
                    >
                      {isSubmitting ? <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden /> : null}
                      <span>{isSubmitting ? 'Sending' : 'Send the brief'}</span>
                      {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden />}
                    </button>
                  </div>
                </form>
              </m.div>
            ) : (
              <m.div
                key="success"
                role="status"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="rounded-[20px] border border-bone/10 bg-bone/[0.03] p-8 sm:p-12"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ember/40 text-ember">
                  <Check className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-6 font-headline text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] text-bone">
                  Brief <span className="font-playfair font-normal italic">received</span>.
                </h3>
                <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-bone/60">
                  Thanks for the detail. It is with both founders now, and we reply from{' '}
                  {STUDIO_EMAIL}.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/"
                    className="inline-flex min-h-[48px] items-center justify-center rounded-full px-6 font-body text-sm text-bone/60 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-ember"
                  >
                    Back to home
                  </Link>
                </div>
                <button
                  type="button"
                  onClick={() => { setForm(empty); setErrors({}); setIsSubmitted(false); startedAt.current = Date.now(); }}
                  className="mt-6 min-h-[44px] font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40 underline-offset-4 hover:text-bone/70 hover:underline"
                >
                  Send another brief
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CalendlyDialog open={calendlyOpen} onClose={closeCalendly} onBooked={onBooked} />
    </section>
  );
});

Contact.displayName = 'Contact';
