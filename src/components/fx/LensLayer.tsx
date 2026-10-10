'use client';

import { useEffect, useId, useRef, useState } from 'react';

// Cache maps by size so the nav, pills and tabs never rebuild the same one.
const mapCache = new Map<string, string>();

/**
 * Builds the lens displacement map for a rounded rect: inside a bezel of
 * width `bezel`, each pixel is pushed along the edge normal, strongest at the
 * rim and easing to zero inward (a convex glass lip). R/G carry x/y offsets
 * around a neutral 128, so the flat centre stays perfectly clear.
 */
function lensMap(w: number, h: number, radius: number, bezel: number) {
  const key = `${w}x${h}r${radius}b${bezel}`;
  const hit = mapCache.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) return '';
  const img = ctx.createImageData(w, h);
  const r = Math.min(radius, w / 2, h / 2);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // signed distance to the rounded rect (negative inside)
      const px = x + 0.5 - w / 2;
      const py = y + 0.5 - h / 2;
      const qx = Math.abs(px) - (w / 2 - r);
      const qy = Math.abs(py) - (h / 2 - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      const sd = outside + Math.min(Math.max(qx, qy), 0) - r;
      const depth = -sd; // distance inward from the edge
      let dx = 0;
      let dy = 0;
      if (depth > 0 && depth < bezel) {
        // edge normal: corner region uses the corner centre, flanks are axis-aligned
        let nx = 0;
        let ny = 0;
        if (qx > 0 && qy > 0) {
          nx = (ox / (outside || 1)) * Math.sign(px);
          ny = (oy / (outside || 1)) * Math.sign(py);
        } else if (qx > qy) nx = Math.sign(px);
        else ny = Math.sign(py);
        const t = 1 - depth / bezel; // 1 at the rim, 0 at the inner bezel line
        const k = t * t * (3 - 2 * t); // smoothstep: a soft, convex lip
        dx = -nx * k;
        dy = -ny * k;
      }
      const i = (y * w + x) * 4;
      img.data[i] = 128 + dx * 127;
      img.data[i + 1] = 128 + dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const url = c.toDataURL('image/png');
  mapCache.set(key, url);
  return url;
}

let supportCache: boolean | null = null;
function lensSupported() {
  if (supportCache !== null) return supportCache;
  // Chromium honours SVG filters in backdrop-filter; WebKit/Gecko do not.
  supportCache =
    typeof CSS !== 'undefined' &&
    CSS.supports('backdrop-filter', 'url(#a)') &&
    !/^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
    !window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
  return supportCache;
}

/**
 * Liquid Glass v2 (the liquid-glass-js look without html2canvas): an
 * absolutely positioned layer that refracts the page behind its parent's
 * rim, with a faint chromatic split. Put it FIRST inside a positioned,
 * rounded parent. Unsupported browsers render nothing; the parent's own
 * .liquid-glass blur carries the look there.
 */
export function LensLayer({
  radius = 999,
  bezel = 18,
  strength = 26,
  blur = 1.5,
  className = '',
}: {
  className?: string;
  radius?: number;
  bezel?: number;
  strength?: number;
  blur?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = `lens-${useId().replace(/:/g, '')}`;
  const [map, setMap] = useState<{ url: string; w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !lensSupported()) return;
    let t = 0;
    const build = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      if (w < 8 || h < 8) return;
      setMap({ url: lensMap(w, h, radius, Math.min(bezel, h / 2 - 1)), w, h });
    };
    build();
    const ro = new ResizeObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(build, 120);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, [radius, bezel]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={map ? { backdropFilter: `url(#${id}) blur(${blur}px) saturate(150%)`, WebkitBackdropFilter: `url(#${id}) blur(${blur}px) saturate(150%)` } : undefined}
    >
      {map && (
        <svg className="absolute h-0 w-0" aria-hidden>
          <filter id={id} x="0" y="0" width={map.w} height={map.h} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feImage href={map.url} x="0" y="0" width={map.w} height={map.h} result="map" preserveAspectRatio="none" />
            {/* three passes, slightly different strengths: a whisper of dispersion at the rim */}
            <feDisplacementMap in="SourceGraphic" in2="map" scale={strength} xChannelSelector="R" yChannelSelector="G" result="dR" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={strength * 0.92} xChannelSelector="R" yChannelSelector="G" result="dG" />
            <feDisplacementMap in="SourceGraphic" in2="map" scale={strength * 0.84} xChannelSelector="R" yChannelSelector="G" result="dB" />
            <feColorMatrix in="dR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feColorMatrix in="dG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feColorMatrix in="dB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feBlend in="r" in2="g" mode="screen" result="rg" />
            <feBlend in="rg" in2="b" mode="screen" />
          </filter>
        </svg>
      )}
    </div>
  );
}
