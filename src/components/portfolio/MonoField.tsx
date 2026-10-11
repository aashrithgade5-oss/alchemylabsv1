'use client';

import { memo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useFx } from '@/hooks/useFx';

const MeshGradient = dynamic(() => import('@paper-design/shaders-react').then((mod) => mod.MeshGradient), { ssr: false });

/**
 * MonoField (Patches-6): the portfolios' editorial ground. Black and white
 * only: a slow graphite liquid-metal mesh (Paper shader, gated by useFx), a
 * hairline index grid, and two tall glass slabs built from light (no
 * backdrop-filter on a scrolling page) that drift apart with scroll. Theme
 * aware, so the light mode reads as bone paper with the same structure.
 */
export const MonoField = memo(({ isDark = true, className = '' }: { isDark?: boolean; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { allowed, live, inView } = useFx(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const slabA = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-12%', '18%']);
  const slabB = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['16%', '-14%']);

  const colors = isDark
    ? ['#0A0908', '#171615', '#4a4744', '#0c0b0a', '#26241f']
    : ['#fafaf9', '#e7e5e2', '#bdb9b4', '#f4f3f1', '#d6d3cf'];

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* poster: what reduced-motion / low-power devices keep */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(60% 45% at 25% 30%, rgba(237,230,221,0.06), transparent 70%), radial-gradient(50% 40% at 80% 75%, rgba(237,230,221,0.04), transparent 70%)'
            : 'radial-gradient(60% 45% at 25% 30%, rgba(10,9,8,0.05), transparent 70%), radial-gradient(50% 40% at 80% 75%, rgba(10,9,8,0.04), transparent 70%)',
        }}
      />
      {allowed && inView && (
        <div className="ember-field-in absolute inset-0" style={{ opacity: isDark ? 0.45 : 0.5 }}>
          <MeshGradient
            colors={colors}
            distortion={0.9}
            swirl={0.55}
            grainMixer={0.08}
            grainOverlay={0.1}
            speed={live ? 0.08 : 0}
            minPixelRatio={1}
            maxPixelCount={1280 * 720}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      <div className={`mono-grid absolute inset-0 ${isDark ? '' : 'mono-grid--light'}`} />
      {/* glass slabs: light-built liquid glass, drifting on scroll */}
      <m.div style={{ y: slabA }} className={`mono-slab right-[7%] top-[14%] h-[40%] w-[18%] ${isDark ? '' : 'mono-slab--light'}`} />
      <m.div style={{ y: slabB }} className={`mono-slab right-[27%] top-[58%] h-[30%] w-[10%] ${isDark ? '' : 'mono-slab--light'}`} />
      {/* feather into the page at both edges */}
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${isDark ? 'from-[#0A0908]' : 'from-[#fafaf9]'} to-transparent`} />
      <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${isDark ? 'from-[#0A0908]' : 'from-[#fafaf9]'} to-transparent`} />
    </div>
  );
});
MonoField.displayName = 'MonoField';
