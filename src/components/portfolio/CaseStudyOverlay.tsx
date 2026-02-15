import { memo, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';

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

const accentMap: Record<string, { color: string; glow: string }> = {
  'aether-rituals': { color: 'rgba(212,175,55,0.8)', glow: 'rgba(212,175,55,0.15)' },
  'genesis': { color: 'rgba(180,180,180,0.8)', glow: 'rgba(180,180,180,0.1)' },
  'dior-campaign': { color: 'rgba(168,85,247,0.8)', glow: 'rgba(168,85,247,0.12)' },
  'oakley-showcase': { color: 'rgba(249,115,22,0.8)', glow: 'rgba(249,115,22,0.12)' },
};

const fallbackAccent = { color: 'rgba(220,38,38,0.8)', glow: 'rgba(220,38,38,0.12)' };

export const CaseStudyOverlay = memo(({ open, onOpenChange, caseStudy }: CaseStudyOverlayProps) => {
  const accent = caseStudy ? (accentMap[caseStudy.id] || fallbackAccent) : fallbackAccent;
  const contentRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Lenis scroll lock
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

  // Focus trap — focus the content on open
  useEffect(() => {
    if (open && contentRef.current) {
      contentRef.current.focus();
    }
  }, [open]);

  if (!open || !caseStudy) return null;

  const portalTarget = document.getElementById('overlay-root');
  if (!portalTarget) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        animation: 'overlayFadeIn 0.3s ease-out',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      role="dialog"
      aria-modal="true"
      aria-label={caseStudy.title}
    >
      <div
        ref={contentRef}
        tabIndex={-1}
        className="outline-none"
        style={{
          width: '95vw',
          maxWidth: '56rem',
          maxHeight: '85vh',
          overflowY: 'auto',
          borderRadius: '1rem',
          background: 'linear-gradient(135deg, rgba(12,12,12,0.97) 0%, rgba(6,6,6,0.99) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 0 80px ${accent.glow}, 0 40px 120px rgba(0,0,0,0.8)`,
          position: 'relative',
          animation: 'overlayScaleIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Accent glow line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            borderRadius: '1rem 1rem 0 0',
            background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={close}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 100,
            width: '2.75rem',
            height: '2.75rem',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = 'scale(1)'; }}
          aria-label="Close"
        >
          <X style={{ width: '1.25rem', height: '1.25rem', color: 'rgba(255,255,255,0.8)' }} />
        </button>

        {/* Hero image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '1rem 1rem 0 0' }}>
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              animation: 'kenBurns 8s ease-out forwards',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,12,12,0.97), rgba(12,12,12,0.3) 50%, transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center bottom, ${accent.glow} 0%, transparent 60%)` }} />
        </div>

        {/* Content */}
        <div style={{ padding: '0 1.5rem 2.5rem', marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <span
            className="font-mono"
            style={{
              display: 'inline-block',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              padding: '6px 12px',
              borderRadius: '9999px',
              marginBottom: '1rem',
              background: accent.glow,
              border: `1px solid ${accent.color.replace('0.8', '0.3')}`,
              color: accent.color,
            }}
          >
            Conceptual Exploration
          </span>

          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'white', lineHeight: 1.1, marginBottom: '0.5rem' }}>
            {caseStudy.title}
          </h2>
          <p className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {caseStudy.subtitle}
          </p>

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>Timeline: </span>
              <span style={{ color: accent.color }}>{caseStudy.timeline}</span>
            </span>
            <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>Tools: </span>
              {caseStudy.tools.join(', ')}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', marginBottom: '2rem', background: `linear-gradient(90deg, ${accent.color.replace('0.8', '0.4')} 0%, rgba(255,255,255,0.05) 100%)` }} />

          {/* Challenge */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem', color: accent.color.replace('0.8', '0.6') }}>
              The Challenge
            </h3>
            <p className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              {caseStudy.challenge}
            </p>
          </div>

          {/* Approach */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem', color: accent.color.replace('0.8', '0.6') }}>
              Our Approach
            </h3>
            <p className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {caseStudy.approach}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {caseStudy.process.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div
                    className="font-mono"
                    style={{
                      flexShrink: 0,
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '9999px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      fontWeight: 700,
                      marginTop: '2px',
                      background: accent.glow,
                      border: `1px solid ${accent.color.replace('0.8', '0.3')}`,
                      color: accent.color,
                    }}
                  >
                    {i + 1}
                  </div>
                  <p className="font-body" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="font-mono" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem', color: accent.color.replace('0.8', '0.6') }}>
              Impact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {caseStudy.results.map((result, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <ArrowRight style={{ width: '0.75rem', height: '0.75rem', marginTop: '4px', flexShrink: 0, color: accent.color.replace('0.8', '0.5') }} />
                  <p className="font-body" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{result}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {caseStudy.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{
                  fontSize: '10px',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe animations injected inline */}
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes overlayScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes kenBurns {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>,
    portalTarget
  );
});

CaseStudyOverlay.displayName = 'CaseStudyOverlay';
