import { memo, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Clock, Wrench } from 'lucide-react';

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  challenge: string;
  approach: string;
  process: string[];
  results: string[];
  timeline: string;
  tools: string[];
  tags: string[];
  accent?: string;
}

interface CaseStudyOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseStudy: CaseStudyData | null;
}

const accentMap: Record<string, { primary: string; glow: string; border: string; text: string }> = {
  'aether-rituals': {
    primary: '#D4AF37',
    glow: 'rgba(212,175,55,0.12)',
    border: 'rgba(212,175,55,0.25)',
    text: 'rgba(212,175,55,0.85)',
  },
  'genesis': {
    primary: '#B4B4B4',
    glow: 'rgba(180,180,180,0.08)',
    border: 'rgba(180,180,180,0.2)',
    text: 'rgba(180,180,180,0.85)',
  },
  'dior-campaign': {
    primary: '#A855F7',
    glow: 'rgba(168,85,247,0.1)',
    border: 'rgba(168,85,247,0.25)',
    text: 'rgba(168,85,247,0.85)',
  },
  'oakley-showcase': {
    primary: '#F97316',
    glow: 'rgba(249,115,22,0.1)',
    border: 'rgba(249,115,22,0.25)',
    text: 'rgba(249,115,22,0.85)',
  },
};

const fallbackAccent = {
  primary: '#DC2626',
  glow: 'rgba(220,38,38,0.1)',
  border: 'rgba(220,38,38,0.25)',
  text: 'rgba(220,38,38,0.85)',
};

export const CaseStudyOverlay = memo(({ open, onOpenChange, caseStudy }: CaseStudyOverlayProps) => {
  const accent = caseStudy ? (accentMap[caseStudy.id] || fallbackAccent) : fallbackAccent;
  const contentRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Scroll lock + Lenis
  useEffect(() => {
    if (open) {
      document.dispatchEvent(new Event('modal-open'));
      document.body.style.overflow = 'hidden';
    } else {
      document.dispatchEvent(new Event('modal-close'));
      document.body.style.overflow = '';
    }
    return () => {
      document.dispatchEvent(new Event('modal-close'));
      document.body.style.overflow = '';
    };
  }, [open]);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  // Focus on open
  useEffect(() => {
    if (open && contentRef.current) {
      requestAnimationFrame(() => contentRef.current?.focus());
    }
  }, [open]);

  if (!open || !caseStudy) return null;

  const portalTarget = document.getElementById('overlay-root');
  if (!portalTarget) return null;

  return createPortal(
    <div
      className="overlay-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'csoFadeIn 0.25s ease-out',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-label={caseStudy.title}
    >
      {/* Content card */}
      <div
        ref={contentRef}
        tabIndex={-1}
        className="outline-none"
        style={{
          width: '100%',
          maxWidth: '52rem',
          maxHeight: '88vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: '1.25rem',
          background: 'linear-gradient(180deg, rgba(18,18,20,0.98) 0%, rgba(8,8,10,0.99) 100%)',
          border: `1px solid ${accent.border}`,
          boxShadow: `0 0 60px ${accent.glow}, 0 25px 80px rgba(0,0,0,0.7)`,
          animation: 'csoSlideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Accent line */}
        <div style={{
          height: '2px',
          borderRadius: '1.25rem 1.25rem 0 0',
          background: `linear-gradient(90deg, transparent 5%, ${accent.primary} 50%, transparent 95%)`,
        }} />

        {/* Close button */}
        <button
          onClick={close}
          className="group"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 100,
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = 'rgba(255,255,255,0.1)';
            el.style.borderColor = 'rgba(255,255,255,0.25)';
            el.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = 'rgba(0,0,0,0.5)';
            el.style.borderColor = 'rgba(255,255,255,0.12)';
            el.style.transform = 'scale(1)';
          }}
          aria-label="Close case study"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>

        {/* Hero image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '2 / 1', overflow: 'hidden' }}>
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%',
              animation: 'csoKenBurns 10s ease-out forwards',
            }}
          />
          {/* Gradient fade to content */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(18,18,20,1) 0%, rgba(18,18,20,0.6) 40%, rgba(18,18,20,0.1) 70%, transparent 100%)',
          }} />
          {/* Accent glow */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
            background: `radial-gradient(ellipse 80% 100% at 50% 100%, ${accent.glow} 0%, transparent 70%)`,
          }} />
        </div>

        {/* Content body */}
        <div style={{ padding: '0 2rem 2.5rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
          {/* Tag */}
          <span
            className="font-mono"
            style={{
              display: 'inline-block',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              padding: '5px 14px',
              borderRadius: '9999px',
              marginBottom: '1rem',
              background: accent.glow,
              border: `1px solid ${accent.border}`,
              color: accent.text,
            }}
          >
            Conceptual Vision
          </span>

          {/* Title */}
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            color: 'white',
            lineHeight: 1.08,
            marginBottom: '0.5rem',
            fontStyle: 'italic',
          }}>
            {caseStudy.title}
          </h2>

          {/* Subtitle */}
          <p className="font-body" style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.5,
            marginBottom: '1.5rem',
            fontWeight: 300,
          }}>
            {caseStudy.subtitle}
          </p>

          {/* Meta row */}
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock style={{ width: '0.75rem', height: '0.75rem', color: accent.text, opacity: 0.7 }} />
              <span className="font-mono" style={{ fontSize: '10px', color: accent.text }}>
                {caseStudy.timeline}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Wrench style={{ width: '0.75rem', height: '0.75rem', color: 'rgba(255,255,255,0.3)' }} />
              <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                {caseStudy.tools.join(' · ')}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: '1px',
            marginBottom: '2rem',
            background: `linear-gradient(90deg, ${accent.border}, rgba(255,255,255,0.04) 80%)`,
          }} />

          {/* Two-column layout for challenge + approach */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            {/* Challenge */}
            <div>
              <h3 className="font-mono" style={{
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em',
                marginBottom: '0.75rem', color: accent.text, opacity: 0.7,
              }}>
                The Challenge
              </h3>
              <p className="font-body" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300 }}>
                {caseStudy.challenge}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h3 className="font-mono" style={{
                fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em',
                marginBottom: '0.75rem', color: accent.text, opacity: 0.7,
              }}>
                Our Approach
              </h3>
              <p className="font-body" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontWeight: 300 }}>
                {caseStudy.approach}
              </p>
            </div>
          </div>

          {/* Process steps */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{
              fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em',
              marginBottom: '1rem', color: accent.text, opacity: 0.7,
            }}>
              Process
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {caseStudy.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span
                    className="font-mono"
                    style={{
                      flexShrink: 0,
                      width: '1.375rem',
                      height: '1.375rem',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 700,
                      marginTop: '2px',
                      background: accent.glow,
                      border: `1px solid ${accent.border}`,
                      color: accent.text,
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="font-body" style={{ fontSize: '0.775rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, fontWeight: 300 }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{
              fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em',
              marginBottom: '0.75rem', color: accent.text, opacity: 0.7,
            }}>
              Impact
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '0.5rem',
            }}>
              {caseStudy.results.map((result, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    padding: '0.625rem 0.75rem',
                    borderRadius: '0.625rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <ArrowRight style={{ width: '0.625rem', height: '0.625rem', marginTop: '3px', flexShrink: 0, color: accent.text, opacity: 0.6 }} />
                  <p className="font-body" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.55, fontWeight: 300 }}>
                    {result}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{
                  fontSize: '9px',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  color: 'rgba(255,255,255,0.45)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  letterSpacing: '0.05em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes csoFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes csoSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes csoKenBurns {
          from { transform: scale(1.06); }
          to { transform: scale(1); }
        }
        .overlay-backdrop::-webkit-scrollbar { display: none; }
      `}</style>
    </div>,
    portalTarget
  );
});

CaseStudyOverlay.displayName = 'CaseStudyOverlay';
