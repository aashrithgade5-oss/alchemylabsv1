'use client';

import dynamic from 'next/dynamic';

// PROTOTYPE (Phase 2): Paper Shaders fluted-glass texture layer for
// GlassPanel. Kept OUT of GlassPanel so routes that never opt in (e.g.
// /contact, already over budget) don't pay for the dynamic-import stub.
// NOTE: FlutedGlass flutes its own color field, not the live backdrop —
// WebGL cannot sample the page behind the canvas, so .liquid-glass
// backdrop-filter stays the real refraction layer beneath it.
// Usage: <GlassPanel><GlassFluted /> ...content</GlassPanel>
const FlutedGlass = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.FlutedGlass),
  { ssr: false },
);

export function GlassFluted() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-40">
      <FlutedGlass
        style={{ width: '100%', height: '100%' }}
        colorBack="rgba(0,0,0,0)"
        colorShadow="rgba(10,9,8,0.55)"
        colorHighlight="rgba(237,230,221,0.2)"
        speed={0}
      />
    </div>
  );
}
