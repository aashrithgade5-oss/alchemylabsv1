'use client';

import { memo, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
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
  const { allowed, live, inView } = useFx(ref, '400px');
  // mount once, then only pause (no shader recompile on every pass)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (allowed && inView) setMounted(true);
  }, [allowed, inView]);

  const colors = isDark
    ? ['#0A0908', '#1f1b18', '#7a6f64', '#120f0d', '#3d2a20']
    : ['#fafaf9', '#f1ebe4', '#dccfc2', '#f7f3ef', '#ecdfd2'];

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
      {allowed && mounted && (
        <div className="ember-field-in absolute inset-0" style={{ opacity: isDark ? 0.6 : 0.7 }}>
          <MeshGradient
            colors={colors}
            distortion={0.9}
            swirl={0.55}
            grainMixer={0.08}
            grainOverlay={0.1}
            speed={live ? 0.08 : 0}
            minPixelRatio={1}
            maxPixelCount={960 * 540}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
      <div className={`mono-grid absolute inset-0 ${isDark ? '' : 'mono-grid--light'}`} />
      {/* Patches-8: the edge slabs read as stray boxes (owner); the glass now
          lives in the content (plates, chips), the ground stays clean */}
      {/* feather into the page at both edges */}
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${isDark ? 'from-[#0A0908]' : 'from-[#fafaf9]'} to-transparent`} />
      <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t ${isDark ? 'from-[#0A0908]' : 'from-[#fafaf9]'} to-transparent`} />
    </div>
  );
});
MonoField.displayName = 'MonoField';
