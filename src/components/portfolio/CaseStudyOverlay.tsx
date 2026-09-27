'use client';

import { memo, useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

export interface CaseStudyFrame {
  src: string;
  alt: string;
  /** 16:9 full-width frame; default is a 4:5 half-width frame. */
  wide?: boolean;
}

/** A brand inside an umbrella case study (e.g. Studio186's verticals). */
export interface CaseStudyVertical {
  id: string;
  name: string;
  /** Short descriptor, e.g. "Preventive health". */
  kicker: string;
  /** Optional parent line, e.g. "HumanEdge's consumer sub-brand". */
  parent?: string;
  intro: string;
  points: string[];
  frames?: CaseStudyFrame[];
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  challenge: string;
  approach: string;
  /** "System built" — what was actually made. */
  process: string[];
  /** Outcome — only facts already stated. Omit to describe the work instead. */
  results?: string[];
  outcome?: string;
  timeline?: string;
  tools?: string[];
  tags: string[];
  role?: string;
  year?: string;
  concept?: boolean;
  gallery?: string[];
  video?: string;
  poster?: string;
  accent?: string;
  /** 'open' = ongoing engagement; the page says so instead of implying a finished story. */
  status?: 'open';
  statusNote?: string;
  verticals?: CaseStudyVertical[];
  /** Full-bleed gallery frames with explicit aspect (overrides `gallery`). */
  frames?: CaseStudyFrame[];
}

interface CaseStudyOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseStudy: CaseStudyData | null;
  onPrev?: () => void;
  onNext?: () => void;
  prevTitle?: string;
  nextTitle?: string;
}

const FOCUSABLE = 'a[href],button:not([disabled]),video[controls],[tabindex]:not([tabindex="-1"])';
const label = 'font-mono text-[10px] uppercase tracking-[0.3em]';

export const CaseStudyOverlay = memo(({ open, onOpenChange, caseStudy, onPrev, onNext, prevTitle, nextTitle }: CaseStudyOverlayProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const accent = caseStudy?.accent ?? '#FF4D1C';

  useEffect(() => setMounted(true), []);

  // Scroll lock (+ Lenis pause via modal events) and focus restore
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.dispatchEvent(new Event('modal-open'));
    return () => {
      document.body.style.overflow = prev;
      document.dispatchEvent(new Event('modal-close'));
      returnFocus.current?.focus?.();
    };
  }, [open]);

  // New case: back to top, focus the close button
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.scrollTo({ top: 0 });
    requestAnimationFrame(() => closeRef.current?.focus());
  }, [open, caseStudy?.id]);

  // Scroll reveals inside the dialog's own scroller (hidden at rest, in on entry)
  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const root = dialogRef.current;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.cso-rv'));
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { root, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [open, caseStudy?.id]);

  // Escape, arrows, focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const els = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, onNext, onPrev]);

  if (!mounted || !open || !caseStudy) return null;
  const cs = caseStudy;
  const gallery = cs.gallery?.length ? cs.gallery : cs.frames?.length || cs.verticals?.length ? [] : [cs.image];
  const sections: [string, string | string[]][] = [
    ['Challenge', cs.challenge],
    ['Approach', cs.approach],
    ['System built', cs.process],
  ];
  const outcome = cs.results?.length ? cs.results : cs.outcome ? [cs.outcome] : null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${cs.title} case study`}
      data-lenis-prevent
      className="cso fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#0A0908] text-porcelain"
    >
      {/* Top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-8 py-3 bg-gradient-to-b from-[#0A0908]/90 to-transparent">
        <span className={`${label} text-porcelain/55 truncate`}>Case study · {cs.title}</span>
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Close case study"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 transition-colors hover:border-white/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: accent }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Hero */}
      <header className="relative -mt-[68px] h-[78svh] min-h-[460px] w-full overflow-hidden">
        <div className="cso-hero absolute inset-0">
          <SafeImage key={cs.id} src={cs.image} alt={cs.title} fill priority sizes="100vw" className="object-cover object-[center_30%]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-[#0A0908]/40 to-[#0A0908]/30" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 sm:px-8 pb-10 sm:pb-16">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`${label} rounded-full border px-3 py-1.5`} style={{ borderColor: accent, color: accent }}>
              {cs.concept ? 'Concept' : cs.id === 'studio186' ? 'Full-time role' : 'Client work'}
            </span>
            {cs.status === 'open' && (
              <span className={`${label} inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-white/85`}>
                <span className="cso-live relative inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} aria-hidden />
                Open case study · ongoing
              </span>
            )}
            {cs.year && <span className={`${label} text-white/55`}>{cs.year}</span>}
          </div>
          <h2 className="font-body font-bold text-[2.75rem] sm:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.035em] text-white [text-wrap:balance]">{cs.title}</h2>
          <p className="mt-4 max-w-2xl font-body text-base sm:text-lg text-white/70 leading-relaxed [text-wrap:pretty]">{cs.subtitle}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Meta */}
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-y border-white/10 py-8">
          {([
            ['Role', cs.role],
            ['Year', cs.year],
            ['Timeline', cs.timeline],
            ['Tools', cs.tools?.join(' · ')],
          ] as const).filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className={`${label} text-porcelain/45 mb-2`}>{k}</dt>
              <dd className="font-body text-sm text-porcelain/85 [text-wrap:pretty]">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Narrative */}
        <div className="py-16 sm:py-24 space-y-14 sm:space-y-20">
          {sections.map(([k, v], i) => (
            <section key={k} className="cso-rv grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-16">
              <h3 className={`${label} lg:pt-2`} style={{ color: accent }}>{String(i + 1).padStart(2, '0')} — {k}</h3>
              {Array.isArray(v) ? (
                <ul className="space-y-4 max-w-[62ch]">
                  {v.map((s) => (
                    <li key={s} className="flex gap-4 font-body text-base sm:text-lg leading-relaxed text-porcelain/80 [text-wrap:pretty]">
                      <span className="mt-[0.7em] h-px w-5 shrink-0" style={{ background: accent }} aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="max-w-[62ch] font-body text-lg sm:text-xl leading-relaxed text-porcelain/85 [text-wrap:pretty]">{v}</p>
              )}
            </section>
          ))}
          {outcome && (
            <section className="cso-rv grid gap-4 lg:grid-cols-[220px_1fr] lg:gap-16">
              <h3 className={`${label} lg:pt-2`} style={{ color: accent }}>04 — {cs.status === 'open' ? 'So far' : 'Outcome'}</h3>
              <div className="space-y-3 max-w-[62ch]">
                {outcome.map((o) => (
                  <p key={o} className="font-body font-bold text-2xl sm:text-3xl leading-tight tracking-[-0.02em] text-white [text-wrap:balance]">{o}</p>
                ))}
              </div>
            </section>
          )}
        </div>

        {cs.status === 'open' && cs.statusNote && (
          <p className="cso-rv mb-16 sm:mb-24 max-w-[62ch] border-l-2 pl-5 font-body text-base sm:text-lg leading-relaxed text-porcelain/70 [text-wrap:pretty]" style={{ borderColor: accent }}>
            {cs.statusNote}
          </p>
        )}

        {/* Verticals: one chapter per brand inside an umbrella engagement */}
        {cs.verticals?.length ? (
          <div className="pb-8">
            <p className={`${label} mb-10 sm:mb-14`} style={{ color: accent }}>The verticals</p>
            <div className="space-y-24 sm:space-y-32">
              {cs.verticals.map((v, vi) => (
                <section key={v.id} id={`cso-${v.id}`} aria-labelledby={`cso-h-${v.id}`} className="scroll-mt-20">
                  <header className="cso-rv grid gap-3 lg:grid-cols-[220px_1fr] lg:gap-16">
                    <span className={`${label} text-porcelain/45 lg:pt-3`}>{String(vi + 1).padStart(2, '0')} / {String(cs.verticals!.length).padStart(2, '0')} · {v.kicker}</span>
                    <div className="min-w-0">
                      <h3 id={`cso-h-${v.id}`} className="font-body font-bold text-4xl sm:text-6xl leading-[0.98] tracking-[-0.035em] text-white [text-wrap:balance]">{v.name}</h3>
                      {v.parent && <p className="mt-3 font-playfair italic text-lg sm:text-xl text-porcelain/70">{v.parent}</p>}
                      <p className="mt-6 max-w-[62ch] font-body text-lg sm:text-xl leading-relaxed text-porcelain/85 [text-wrap:pretty]">{v.intro}</p>
                      <ul className="mt-8 space-y-4 max-w-[62ch]">
                        {v.points.map((pt) => (
                          <li key={pt} className="flex gap-4 font-body text-base sm:text-lg leading-relaxed text-porcelain/75 [text-wrap:pretty]">
                            <span className="mt-[0.7em] h-px w-5 shrink-0" style={{ background: accent }} aria-hidden />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </header>
                  {v.frames?.length ? (
                    <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {v.frames.map((f) => (
                        <figure key={f.src} className={`cso-rv cso-frame relative overflow-hidden rounded-[20px] bg-white/5 ${f.wide ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`}>
                          <SafeImage src={f.src} fallback={cs.image} alt={f.alt} fill sizes={f.wide ? '(min-width: 1152px) 1088px, 100vw' : '(min-width: 640px) 50vw, 100vw'} className="object-cover" />
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        ) : null}

        {/* Film */}
        {cs.video && (
          <video
            src={cs.video}
            poster={cs.poster}
            controls
            muted
            playsInline
            preload="metadata"
            className="mb-4 w-full rounded-[20px] bg-black aspect-video object-cover"
          />
        )}

        {/* Gallery */}
        {(cs.frames?.length || gallery.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
            {cs.frames?.length
              ? cs.frames.map((f) => (
                  <figure key={f.src} className={`cso-rv cso-frame relative overflow-hidden rounded-[20px] bg-white/5 ${f.wide ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`}>
                    <SafeImage src={f.src} fallback={cs.image} alt={f.alt} fill sizes={f.wide ? '(min-width: 1152px) 1088px, 100vw' : '(min-width: 640px) 50vw, 100vw'} className="object-cover" />
                  </figure>
                ))
              : gallery.map((src, i) => (
                  <div key={src + i} className={`cso-rv cso-frame relative overflow-hidden rounded-[20px] bg-white/5 ${i === 0 && gallery.length % 2 === 1 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'}`}>
                    <SafeImage src={src} fallback={cs.image} alt={`${cs.title} — image ${i + 1}`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                ))}
          </div>
        )}

        {cs.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-16">
            {cs.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] uppercase tracking-[0.16em] rounded-full border border-white/10 px-3 py-1.5 text-white/55">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Prev / next */}
      {(onPrev || onNext) && (
        <nav aria-label="More case studies" className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-8">
            <button onClick={onPrev} disabled={!onPrev} className="group flex min-h-[120px] flex-col items-start justify-center gap-2 py-8 pr-4 text-left disabled:opacity-0">
              <span className={`${label} flex items-center gap-2 text-white/45`}><ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />Previous</span>
              <span className="font-body font-bold text-lg sm:text-3xl tracking-[-0.02em] text-white/80 group-hover:text-white [text-wrap:balance]">{prevTitle}</span>
            </button>
            <button onClick={onNext} disabled={!onNext} className="group flex min-h-[120px] flex-col items-end justify-center gap-2 border-l border-white/10 py-8 pl-4 text-right disabled:opacity-0">
              <span className={`${label} flex items-center gap-2 text-white/45`}>Next<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              <span className="font-body font-bold text-lg sm:text-3xl tracking-[-0.02em] text-white/80 group-hover:text-white [text-wrap:balance]">{nextTitle}</span>
            </button>
          </div>
        </nav>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .cso { animation: csoIn .45s cubic-bezier(.22,1,.36,1); }
        .cso-hero { animation: csoKen 12s ease-out forwards; }
        @keyframes csoIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        @keyframes csoKen { from { transform: scale(1.08); } to { transform: scale(1); } }
        .cso-rv { opacity: 0; transform: translateY(24px); transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1); }
        .cso-rv.is-in { opacity: 1; transform: none; }
        .cso-frame :is(img) { transform: scale(1.06); transition: transform 1.6s cubic-bezier(.22,1,.36,1); }
        .cso-frame.is-in :is(img) { transform: scale(1); }
        .cso-live::after { content: ''; position: absolute; inset: -4px; border-radius: 9999px; border: 1px solid currentColor; color: inherit; opacity: .6; animation: csoPulse 2.4s ease-out infinite; }
        @keyframes csoPulse { from { transform: scale(.6); opacity: .7; } to { transform: scale(1.8); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .cso, .cso-hero, .cso-live::after { animation: none; } .cso-rv, .cso-frame :is(img) { opacity: 1; transform: none; transition: none; } }
      ` }} />
    </div>,
    document.body
  );
});

CaseStudyOverlay.displayName = 'CaseStudyOverlay';
