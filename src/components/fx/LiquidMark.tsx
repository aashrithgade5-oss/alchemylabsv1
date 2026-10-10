'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFx } from '@/hooks/useFx';

const LiquidMetal = dynamic(() => import('@paper-design/shaders-react').then((m) => m.LiquidMetal), { ssr: false });

/**
 * Liquid Mark: the atom as molten metal (Paper LiquidMetal, the engine
 * behind paper-design/liquid-logo). The flat PNG always renders first, so the
 * mark is never missing; the shader cross-fades over it on capable devices
 * and freezes when off screen.
 */
/** size 0 = fill the parent (for responsive slots). */
export function LiquidMark({ size = 96, className = '', tint = '#EDE6DD' }: { size?: number; className?: string; tint?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { allowed, live, inView } = useFx(ref, '100px');

  return (
    <div ref={ref} aria-hidden className={`relative ${size ? '' : 'h-full w-full'} ${className}`} style={size ? { width: size, height: size } : undefined}>
      <Image
        src="/media/alchemy-minimal-logo.png"
        alt=""
        width={size || 256}
        height={size || 256}
        className={`absolute inset-0 h-full w-full ${allowed && inView ? 'liquid-png-out' : ''}`}
      />
      {allowed && inView && (
        <div className="ember-field-in absolute inset-[-20%]">
          <LiquidMetal
            image="/media/alchemy-minimal-logo.png"
            colorBack="#00000000"
            colorTint={tint}
            repetition={3}
            softness={0.1}
            shiftRed={0.45}
            shiftBlue={0.18}
            distortion={0.1}
            contour={0.5}
            angle={70}
            speed={live ? 0.7 : 0}
            scale={1}
            fit="contain"
            minPixelRatio={2}
            maxPixelCount={600 * 600}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
