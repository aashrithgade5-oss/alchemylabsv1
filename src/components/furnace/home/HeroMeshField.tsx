'use client';

import dynamic from 'next/dynamic';

// Lazy WebGL chunk (matches GlassFluted/Loader pattern) so the shader
// library never lands in the homepage's synchronous First Load JS — Hero
// renders eagerly, unlike everything lazy-mounted below the fold.
const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.MeshGradient),
  { ssr: false },
);

/**
 * Opaque decorative surface replacing the flat CSS-gradient read the hero's
 * ellipse used to have: a living ember mesh screened low over the video,
 * same spot the plan's MoltenOrb pattern occupied before it was retired.
 * Screen blend only brightens, so it never fights the scrim's legibility
 * job or the text-vignette's contrast floor above it. No backdrop sampling
 * needed (unlike GlassFluted, which was rejected for exactly that reason)
 * — this paints its own colors, so WebGL is fine here.
 */
// Phase 2 fix (Landing_Page_Patches.pdf "line glitch"): the wrapper used to
// be a hard-edged h-[55%] box — mix-blend-screen has no soft rolloff of its
// own, so that flat top edge painted a visible horizontal seam across the
// silhouette wherever the shader's colors differed from the video beneath.
// A feathered mask on the same box fades the blend in instead of cutting it.
const topFeather: React.CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
  maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%)',
};

export function HeroMeshField() {
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[55%] mix-blend-screen opacity-30"
      style={topFeather}
    >
      <MeshGradient
        colors={['#0A0908', '#C93A14', '#161412', '#FF4D1C']}
        distortion={0.7}
        swirl={0.35}
        speed={0.3}
        grainMixer={0}
        grainOverlay={0}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
