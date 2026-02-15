import { memo, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
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

// Per-case accent system
const accentMap: Record<string, { color: string; glow: string }> = {
  'aether-rituals': { color: 'rgba(212,175,55,0.8)', glow: 'rgba(212,175,55,0.15)' },
  'genesis': { color: 'rgba(180,180,180,0.8)', glow: 'rgba(180,180,180,0.1)' },
  'dior-campaign': { color: 'rgba(168,85,247,0.8)', glow: 'rgba(168,85,247,0.12)' },
  'oakley-showcase': { color: 'rgba(249,115,22,0.8)', glow: 'rgba(249,115,22,0.12)' },
};

const fallbackAccent = { color: 'rgba(220,38,38,0.8)', glow: 'rgba(220,38,38,0.12)' };

export const CaseStudyOverlay = memo(({ open, onOpenChange, caseStudy }: CaseStudyOverlayProps) => {
  const accent = caseStudy ? (accentMap[caseStudy.id] || fallbackAccent) : fallbackAccent;

  // Lenis integration — stop/start smooth scroll
  useEffect(() => {
    if (open) {
      document.dispatchEvent(new Event('modal-open'));
    } else {
      document.dispatchEvent(new Event('modal-close'));
    }
    return () => {
      document.dispatchEvent(new Event('modal-close'));
    };
  }, [open]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop — depth-of-field blur */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(16px)',
          }}
        />

        {/* Content — centered via translate, immune to parent transforms */}
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-[95vw] max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
          style={{
            background: 'linear-gradient(135deg, rgba(12,12,12,0.97) 0%, rgba(6,6,6,0.99) 100%)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: `0 0 80px ${accent.glow}, 0 40px 120px rgba(0,0,0,0.8)`,
          }}
        >
          {/* Visually hidden title for accessibility */}
          <DialogPrimitive.Title className="sr-only">
            {caseStudy?.title || 'Case Study'}
          </DialogPrimitive.Title>

          {/* Accent glow line at top */}
          <div
            className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl"
            style={{ background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)` }}
          />

          {/* Close button */}
          <DialogPrimitive.Close
            className="absolute top-4 right-4 z-[100] w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <X className="w-5 h-5 text-white/80" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {caseStudy && (
            <>
              {/* Hero image with Ken Burns */}
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover object-center animate-in zoom-in-[1.08] duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,12,12,0.97)] via-[rgba(12,12,12,0.3)] to-transparent" />
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at center bottom, ${accent.glow} 0%, transparent 60%)` }}
                />
              </div>

              <div className="px-6 sm:px-10 -mt-10 relative z-10 pb-10">
                {/* Header */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '150ms', animationFillMode: 'backwards' }}>
                  <span
                    className="inline-block font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-4"
                    style={{
                      background: accent.glow,
                      border: `1px solid ${accent.color.replace('0.8', '0.3')}`,
                      color: accent.color,
                    }}
                  >
                    Conceptual Exploration
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-2">
                    {caseStudy.title}
                  </h2>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                    {caseStudy.subtitle}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="font-mono text-[10px] text-white/40">
                      <span className="text-white/25">Timeline: </span>
                      <span style={{ color: accent.color }}>{caseStudy.timeline}</span>
                    </div>
                    <div className="font-mono text-[10px] text-white/40">
                      <span className="text-white/25">Tools: </span>
                      {caseStudy.tools.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="w-full h-px mb-8"
                  style={{ background: `linear-gradient(90deg, ${accent.color.replace('0.8', '0.4')} 0%, rgba(255,255,255,0.05) 100%)` }}
                />

                {/* Challenge */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '250ms', animationFillMode: 'backwards' }}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent.color.replace('0.8', '0.6') }}>
                    The Challenge
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                {/* Approach */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '350ms', animationFillMode: 'backwards' }}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent.color.replace('0.8', '0.6') }}>
                    Our Approach
                  </h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed mb-5">
                    {caseStudy.approach}
                  </p>
                  <div className="space-y-3">
                    {caseStudy.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold mt-0.5"
                          style={{
                            background: accent.glow,
                            border: `1px solid ${accent.color.replace('0.8', '0.3')}`,
                            color: accent.color,
                          }}
                        >
                          {i + 1}
                        </div>
                        <p className="font-body text-xs text-white/50 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-500" style={{ animationDelay: '450ms', animationFillMode: 'backwards' }}>
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: accent.color.replace('0.8', '0.6') }}>
                    Impact
                  </h3>
                  <div className="space-y-2">
                    {caseStudy.results.map((result, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" style={{ color: accent.color.replace('0.8', '0.5') }} />
                        <p className="font-body text-xs text-white/55 leading-relaxed">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '550ms', animationFillMode: 'backwards' }}>
                  {caseStudy.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-3 py-1.5 rounded-full text-white/50"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});

CaseStudyOverlay.displayName = 'CaseStudyOverlay';
