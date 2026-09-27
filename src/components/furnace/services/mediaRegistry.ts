// Services media registry (Patches-3 art-direction pass). One visual engine
// across every offer: dark stone/linen studio table, soft window key from the
// left, one ember accent, bone paper, 35mm grain. Generated on Higgsfield and
// served from its CDN (next.config.js allows the host); the two locals that
// already met the bar (cinematic-film, logo-rescue) stay in /public.
//
// `pos` is the object-position that keeps the subject in frame at every crop
// the layouts use (4/5 on phones + lg, 4/3 on tablets, 16/10 on product pages).
import { hf } from '@lib/hf';

export interface SvcShot {
  src: string;
  /** CSS object-position for object-cover crops. */
  pos: string;
}

const center = '50% 50%';

// Services hero: molten ember glass poured onto black stone ("alchemy"). The
// pour sits right of centre; the headline owns the dark lower-left.

/** Twelve studio offers (4:3 masters, subject centred) + five productized (16:9). */
export const offerShots: Record<string, SvcShot> = {
  // AI creative studio
  'campaign-sprint': { src: hf('hf_20260927_102211_00f1e7c6-3244-440f-94b1-86a6c78a93cb.png'), pos: center },
  'cinematic-film': { src: '/media/svc/cinematic-film.webp', pos: '52% 50%' },
  'ai-production': { src: hf('hf_20260927_102210_40f21a83-d6e0-4b19-b600-237a602ebc32.png'), pos: '40% 50%' },
  'content-engine': { src: hf('hf_20260927_102211_30388846-664a-4781-86ff-b7c4f6391584.png'), pos: center },
  // Brand systems
  'identity-system': { src: hf('hf_20260927_102210_6d813974-715b-4f1d-b015-91dcb7aa3cb6.png'), pos: '45% 50%' },
  'brand-world': { src: hf('hf_20260927_102210_5c4c4848-56af-42d6-9e74-3519f0e14e71.png'), pos: '35% 50%' },
  'narrative-system': { src: hf('hf_20260927_102211_ae4c7a52-307b-4ead-a3b6-7dc633945da2.png'), pos: '40% 55%' },
  'branding-360': { src: hf('hf_20260927_102210_33ff0026-4da9-4c9f-8654-c0d1f3a0a786.png'), pos: center },
  // Advisory
  'ai-leverage-audit': { src: hf('hf_20260927_102210_ed5bcd6f-9569-4f30-9d0d-b04977d829a6.png'), pos: '62% 50%' },
  'precision-audit': { src: hf('hf_20260927_102210_928c3fb0-0b48-4960-8e07-8146f8702aba.png'), pos: '45% 55%' },
  'strategy-build': { src: hf('hf_20260927_102211_1a8fd3e8-5770-4de3-bd98-fdec1d27ba5f.png'), pos: '55% 50%' },
  'full-system-simulation': { src: hf('hf_20260927_102210_0e15fca6-8735-4f81-b09d-be53006382b5.png'), pos: '50% 45%' },
  // Productized five (/services/[slug])
  'brand-glow-up-audit': { src: hf('hf_20260927_110110_68dc5339-9ba1-4d19-931f-926f8c13a831.png'), pos: center },
  'website-teardown': { src: hf('hf_20260927_110110_06d0850c-67e7-445c-af88-097edb3eaeb0.png'), pos: center },
  'sample-reel': { src: hf('hf_20260927_102224_b919b2fe-3670-438f-985e-8583c63c5723.png'), pos: center },
  'logo-rescue': { src: '/media/svc/logo-rescue.webp', pos: center },
  'instagram-aesthetic-audit': { src: hf('hf_20260927_102224_b4e2c963-8e3f-4bc0-94fa-b94753446e96.png'), pos: center },
};

export const offerShot = (slug: string): SvcShot =>
  offerShots[slug] ?? { src: `/media/svc/${slug}.webp`, pos: center };

/**
 * Pillar loops + matching posters (the poster IS the loop's first frame, so
 * nothing jumps when the video attaches). Positions keep the subject whole in
 * the 1:1 desktop tile (56% of the 16:9 width is visible): the AI pillar's
 * rider drifts between ~52% and ~95% of the frame, so it pins right.
 */
export const pillarMedia: Record<'ai' | 'brand' | 'advisory', { loop: string; poster: string; pos: string }> = {
  ai: { loop: '/media/svc/pillar-ai.mp4', poster: '/media/svc/pillar-ai.webp', pos: '96% 50%' },
  brand: { loop: '/media/svc/pillar-brand.mp4', poster: '/media/svc/pillar-brand.webp', pos: '80% 50%' },
  advisory: { loop: '/media/svc/pillar-advisory.mp4', poster: '/media/svc/pillar-advisory.webp', pos: '50% 50%' },
};
