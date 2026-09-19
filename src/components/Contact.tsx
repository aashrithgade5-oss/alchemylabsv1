'use client';

import { useCallback, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { TurnstileWidget } from './TurnstileWidget';

const EMAIL = 'alchemylabs.work@gmail.com';
const WHATSAPP = 'https://wa.me/917794912315';
const CALENDLY_URL = 'https://calendly.com/alchemylabs-work/30min';

const services = [
  { value: 'fast-24h', label: 'AI Creative Studio — campaign, film, imagery' },
  { value: 'foundation-brand', label: 'Brand Systems — identity, narrative' },
  { value: 'clarity-advisory', label: 'Advisory — audit, strategy' },
  { value: 'not-sure', label: 'Not sure yet' },
];
const pillarToService: Record<string, string> = { ai: 'fast-24h', brand: 'foundation-brand', advisory: 'clarity-advisory' };

type Fields = { name: string; email: string; company: string; service: string; message: string };
type Status = 'idle' | 'sending' | 'sent' | 'error' | 'captcha';

const empty: Fields = { name: '', email: '', company: '', service: '', message: '' };

export function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) e.message = 'Tell us a little more — at least a sentence.';
  if (f.message.length > 5000) e.message = 'Please keep it under 5,000 characters.';
  return e;
}

const inputCls =
  'mt-2 block min-h-12 w-full rounded-xl border border-bone/10 bg-void/60 px-4 py-3 text-[15px] text-bone placeholder:text-ash/60 outline-none transition-colors focus:border-ember/70 aria-[invalid=true]:border-ember';
const labelCls = 'font-mono text-[10px] tracking-[0.22em] text-ash';

export function Contact() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [token, setToken] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [widgetKey, setWidgetKey] = useState(0);

  useEffect(() => {
    const pillar = new URLSearchParams(window.location.search).get('pillar');
    const v = pillar && (pillarToService[pillar] ?? (services.some((s) => s.value === pillar) ? pillar : null));
    if (v) setF((x) => ({ ...x, service: v }));
  }, []);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((x) => ({ ...x, [k]: e.target.value }));

  const onVerify = useCallback((t: string) => setToken(t), []);
  const onReset = useCallback(() => setToken(null), []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErrors(v);
    if (Object.keys(v).length) return;
    if (!token) {
      setStatus('captcha');
      return;
    }
    setStatus('sending');
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { ...f, turnstileToken: token, website: honeypot },
      });
      if (error) throw error;
      setStatus('sent');
    } catch {
      setStatus('error');
      setToken(null);
      setWidgetKey((k) => k + 1);
    }
  };

  const field = (k: keyof Fields, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div>
      <label htmlFor={`c-${k}`} className={labelCls}>
        {label}
      </label>
      <input
        id={`c-${k}`}
        name={k}
        value={f[k]}
        onChange={set(k)}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `c-${k}-err` : undefined}
        disabled={status === 'sending'}
        className={inputCls}
        {...props}
      />
      {errors[k] && (
        <p id={`c-${k}-err`} className="mt-2 text-xs text-ember">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contact" className="relative px-6 pb-28 md:px-12 md:pb-36 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <div>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ash">DIRECT LINES</p>
          <p className="type-scroll mt-6 text-[clamp(1.75rem,3vw,2.5rem)] text-bone">
            A reply within one working day, from a founder.
          </p>
          <ul className="mt-10 border-t border-line">
            {[
              { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
              { label: 'WhatsApp', value: '+91 77949 12315', href: WHATSAPP, ext: true },
              { label: 'Book a 30-min call', value: 'calendly.com', href: CALENDLY_URL, ext: true },
            ].map((l) => (
              <li key={l.label} className="border-b border-line">
                <a
                  href={l.href}
                  {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex min-h-16 items-center justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-mono text-[10px] tracking-[0.22em] text-ash">{l.label.toUpperCase()}</span>
                    <span className="mt-1 block text-bone/85 transition-colors group-hover:text-bone">{l.value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-bone/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-bone/[0.08] bg-carbon/70 p-6 md:p-10">
          {status === 'sent' ? (
            <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} role="status" className="py-10">
              <p className="font-mono text-[10px] tracking-[0.3em] text-ember">RECEIVED</p>
              <p className="type-scroll mt-6 text-[clamp(2rem,4vw,3rem)] text-bone">Your brief is with us.</p>
              <p className="mt-4 max-w-md text-bone/65">
                A founder will reply to {f.email} within one working day. If it is urgent, message us on WhatsApp.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-ember px-7 font-sans text-sm font-medium text-void transition-colors hover:bg-amber"
              >
                Book the call now <ArrowUpRight className="h-4 w-4" />
              </a>
            </m.div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] text-ash">THE BRIEF</p>
                <p className="mt-3 text-sm text-bone/60">Three minutes. Everything marked * is required.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {field('name', 'NAME *', { autoComplete: 'name', placeholder: 'Your name' })}
                {field('email', 'EMAIL *', { type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })}
              </div>
              {field('company', 'COMPANY', { autoComplete: 'organization', placeholder: 'Optional' })}
              <div>
                <label htmlFor="c-service" className={labelCls}>
                  WHAT DO YOU NEED
                </label>
                <select id="c-service" value={f.service} onChange={set('service')} className={`${inputCls} cursor-pointer`}>
                  <option value="">Choose one (optional)</option>
                  {services.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="c-message" className={labelCls}>
                  WHAT ARE WE BUILDING *
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  value={f.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'c-message-err' : undefined}
                  placeholder="The brand, where it stands, what you want it to become."
                  className={`${inputCls} resize-y`}
                />
                {errors.message && (
                  <p id="c-message-err" className="mt-2 text-xs text-ember">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* honeypot — off-screen, skipped by keyboard and screen readers */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="c-website">Website</label>
                <input id="c-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <TurnstileWidget key={widgetKey} onVerify={onVerify} onError={onReset} onExpire={onReset} />

              <div aria-live="polite" className="min-h-5 text-sm text-ember">
                {status === 'captcha' && 'Please complete the security check above, then send again.'}
                {status === 'error' && `That did not go through. Please try again, or email ${EMAIL}.`}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ember px-8 font-sans text-sm font-medium text-void transition-colors hover:bg-amber disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </>
                ) : (
                  'Send the brief'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
