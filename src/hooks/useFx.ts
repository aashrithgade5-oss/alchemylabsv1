'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

let webglCache: boolean | null = null;
function hasWebGL() {
  if (webglCache !== null) return webglCache;
  try {
    const c = document.createElement('canvas');
    webglCache = !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    webglCache = false;
  }
  return webglCache;
}

/**
 * The single gate for every WebGL moment (Patches-5 restraint law).
 * `allowed`: this device may run shaders at all (motion OK, WebGL present,
 * not Save-Data, not a <4GB device). `live`: allowed AND the element is near
 * the viewport AND the tab is visible, so off-screen shaders cost nothing.
 */
export function useFx<T extends Element>(ref: RefObject<T>, margin = '200px') {
  const [allowed, setAllowed] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const decided = useRef(false);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;
    const nav = navigator as Nav;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMem = (nav.deviceMemory ?? 8) < 4;
    const saveData = !!nav.connection?.saveData;
    setAllowed(!reduced && !lowMem && !saveData && hasWebGL());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !allowed) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    const onVis = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [ref, allowed, margin]);

  return { allowed, live: allowed && inView && visible, inView };
}
