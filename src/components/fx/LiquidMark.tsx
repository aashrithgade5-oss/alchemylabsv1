'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFx } from '@/hooks/useFx';

const LiquidMetal = dynamic(() => import('@paper-design/shaders-react').then((m) => m.LiquidMetal), { ssr: false });

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };

/**
 * Liquid Mark: the atom (or any white-on-transparent PNG) as molten metal
 * (Paper LiquidMetal, the engine behind paper-design/liquid-logo).
 *
 * Patches-7 performance: the shader mounts once, at browser idle, a viewport
 * ahead of time (its mask preprocessing runs on the main thread, and doing it
 * mid-scroll was the footer's hitch), then stays mounted and only pauses off
 * screen instead of re-compiling on every pass. `desktopOnly` keeps phones
 * and touch devices on the static chrome fallback.
 */
/** size 0 = fill the parent (for responsive slots). */
export function LiquidMark({
  size = 96,
  className = '',
  tint = '#EDE6DD',
  src = '/media/alchemy-minimal-logo.png',
  inset = '-20%',
  pixels = 600 * 600,
  chrome = false,
  desktopOnly = false,
}: {
  size?: number;
  className?: string;
  tint?: string;
  /** any white-on-transparent PNG (the atom by default; the ALCHEMY wordmark in the footer) */
  src?: string;
  /** shader overscan: the atom needs room for its rim, a wordmark needs little */
  inset?: string;
  pixels?: number;
  /** fallback is a brushed-chrome gradient cut by the PNG instead of the flat PNG */
  chrome?: boolean;
  /** no shader on phones / touch devices (wide wordmarks) */
  desktopOnly?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { allowed, live, inView } = useFx(ref, '600px');
  const [mounted, setMounted] = useState(false);
  const [deviceOk, setDeviceOk] = useState(!desktopOnly);

  useEffect(() => {
    if (!desktopOnly) return;
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    setDeviceOk(mq.matches);
  }, [desktopOnly]);

  useEffect(() => {
    if (mounted || !allowed || !inView || !deviceOk) return;
    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMounted(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setMounted(true), 200);
    return () => window.clearTimeout(t);
  }, [mounted, allowed, inView, deviceOk]);

  const shader = mounted && allowed && deviceOk;
  const fallbackCls = `absolute inset-0 h-full w-full ${shader ? 'liquid-png-out' : ''}`;

  return (
    <div ref={ref} aria-hidden className={`relative ${size ? '' : 'h-full w-full'} ${className}`} style={size ? { width: size, height: size } : undefined}>
      {chrome ? (
        <div className={`chrome-cut ${fallbackCls}`} style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }} />
      ) : (
        // fill slots size the fallback to the slot, so a wide mark never shows a 640px PNG
        <Image
          src={src}
          alt=""
          {...(size ? { width: size, height: size } : { fill: true, sizes: '(min-width: 1280px) 1200px, 100vw' })}
          className={fallbackCls}
        />
      )}
      {shader && (
        <div className="ember-field-in absolute" style={{ inset }}>
          <LiquidMetal
            image={src}
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
            minPixelRatio={size ? 2 : 1}
            maxPixelCount={pixels}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}
