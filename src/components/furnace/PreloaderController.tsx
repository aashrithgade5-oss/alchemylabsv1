'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { setScrollLocked } from '@/components/LenisProvider';
import { PRELOADED_EVENT } from './preloader-gate';

// Fill runs on wall-clock time (throttled tabs get rare frames), then holds
// at 94% until the page has actually loaded, hard-capped so it never blocks.
const FILL_MS = 2200;
const HARD_CAP_MS = 4200;
const OPEN_MS = 1250;

// Lazy WebGL chunk: never in First Load JS. Desktop pointers only; phones get
// the CSS brushed-metal fill (no shader compile competing with first paint).
const LiquidMetal = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.LiquidMetal),
  { ssr: false },
);


const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function PreloaderController() {
  const [shaderHost, setShaderHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = document.getElementById('al-preloader');
    const count = document.getElementById('al-pl-count');
    const ring = el?.querySelector<SVGCircleElement>('.al-pl-ring-fill');
    if (!el || root.getAttribute('data-pl') !== 'run') return;

    if (window.matchMedia('(pointer: fine) and (min-width: 768px)').matches && hasWebGL()) {
      setShaderHost(document.getElementById('al-pl-shader'));
    }

    window.scrollTo(0, 0);
    let loaded = document.readyState === 'complete';
    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener('load', onLoad);

    const start = performance.now();
    let raf = 0;
    let lastShown = -1;

    const open = () => {
      root.setAttribute('data-pl', 'out');
      window.dispatchEvent(new Event(PRELOADED_EVENT));
      setScrollLocked(false);
      const t0 = performance.now();
      const step = () => {
        const t = Math.min(1, (performance.now() - t0) / OPEN_MS);
        el.style.setProperty('--al-open', easeInOut(t).toFixed(4));
        if (t < 1) raf = requestAnimationFrame(step);
        else root.setAttribute('data-pl', 'done');
      };
      raf = requestAnimationFrame(step);
    };

    const tick = () => {
      const elapsed = performance.now() - start;
      setScrollLocked(true);
      const t = Math.min(1, elapsed / FILL_MS);
      let p = t * t * (3 - 2 * t) * 100;
      const done = elapsed >= HARD_CAP_MS || (t >= 1 && loaded);
      if (!done) p = Math.min(p, 94);
      else p = 100;
      el.style.setProperty('--al-p', (p / 100).toFixed(4));
      // set as a style number: SVG dash props from calc() are unreliable in WebKit
      if (ring) ring.style.strokeDashoffset = String(100 - p);
      const shown = Math.round(p);
      if (count && shown !== lastShown) {
        count.textContent = String(shown);
        lastShown = shown;
      }
      if (done) {
        // a beat at 100 so the closed ring registers before the aperture opens
        window.setTimeout(open, 260);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      setScrollLocked(false);
    };
  }, []);

  if (!shaderHost) return null;
  return createPortal(
    <LiquidMetal
      image="/media/alchemy-minimal-logo.png"
      colorBack="#00000000"
      colorTint="#EDE6DD"
      repetition={3}
      softness={0.1}
      shiftRed={0.5}
      shiftBlue={0.15}
      distortion={0.12}
      contour={0.5}
      angle={70}
      speed={0.9}
      scale={1}
      fit="contain"
      style={{ width: '100%', height: '100%' }}
    />,
    shaderHost,
  );
}
