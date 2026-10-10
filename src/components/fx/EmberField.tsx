'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useFx } from '@/hooks/useFx';

// Lazy WebGL: never in First Load JS, only fetched once a field is on screen.
const GrainGradient = dynamic(() => import('@paper-design/shaders-react').then((m) => m.GrainGradient), { ssr: false });
const MeshGradient = dynamic(() => import('@paper-design/shaders-react').then((m) => m.MeshGradient), { ssr: false });

export type EmberPreset = 'ember' | 'dusk' | 'ash';

// The static poster each preset falls back to (reduced motion, Save-Data,
// low-memory, no WebGL) and paints under the shader while it compiles.
const POSTER: Record<EmberPreset, string> = {
  ember:
    'radial-gradient(60% 55% at 70% 80%, rgba(255,77,28,0.28), transparent 70%), radial-gradient(50% 45% at 20% 100%, rgba(201,58,20,0.22), transparent 70%), #0A0908',
  dusk:
    'radial-gradient(70% 60% at 30% 20%, rgba(255,77,28,0.14), transparent 70%), radial-gradient(60% 60% at 80% 90%, rgba(237,230,221,0.06), transparent 70%), #0A0908',
  ash: 'radial-gradient(60% 50% at 50% 40%, rgba(237,230,221,0.07), transparent 70%), #0A0908',
};

// Shared sizing: cap GPU work (about 0.9 megapixel) and stay at DPR 1.
const sizing = { minPixelRatio: 1, maxPixelCount: 1280 * 720, style: { width: '100%', height: '100%' } } as const;

/**
 * Ember Field: the brand's gradient material (the ShaderGradient look, built
 * on Paper shaders so Three.js never ships). Slow, grained, ember-on-void.
 * Mounts only on capable devices, pauses off screen and in hidden tabs.
 */
export function EmberField({
  preset = 'ember',
  className = '',
  opacity = 1,
  mask = 'none',
}: {
  /** radial: soft pool in the middle; fade: strong at top, gone by the bottom */
  mask?: 'none' | 'radial' | 'fade';
  preset?: EmberPreset;
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { allowed, live, inView } = useFx(ref);
  const speed = live ? 1 : 0;
  const m =
    mask === 'radial'
      ? 'radial-gradient(ellipse 60% 55% at 50% 50%, black 15%, transparent 72%)'
      : mask === 'fade'
        ? 'linear-gradient(to bottom, black 30%, transparent 95%)'
        : undefined;

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity, WebkitMaskImage: m, maskImage: m }}>
      <div className="absolute inset-0" style={{ background: POSTER[preset] }} />
      {allowed && inView && (
        <div className="ember-field-in absolute inset-0">
          {preset === 'dusk' ? (
            <MeshGradient
              {...sizing}
              colors={['#0A0908', '#2a0f07', '#C93A14', '#161412', '#5a2a1a']}
              distortion={0.55}
              swirl={0.25}
              grainMixer={0.15}
              grainOverlay={0.2}
              speed={0.12 * speed}
            />
          ) : (
            <GrainGradient
              {...sizing}
              colorBack="#0A0908"
              colors={preset === 'ember' ? ['#FF4D1C', '#C93A14', '#3A1208'] : ['#3a3530', '#1d1a17', '#EDE6DD']}
              softness={0.95}
              intensity={preset === 'ember' ? 0.16 : 0.1}
              noise={0.12}
              shape={preset === 'ember' ? 'corners' : 'blob'}
              speed={0.22 * speed}
            />
          )}
        </div>
      )}
    </div>
  );
}
