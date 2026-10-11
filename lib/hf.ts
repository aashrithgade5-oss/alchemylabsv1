// Higgsfield CDN media (Patches-3). Every generated asset used on the site is
// listed here by role, so swapping one is a one-line change and nothing is
// scattered across components. Images go through next/image (Vercel resizes
// and caches them); videos stream directly.
export const HF = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FUhukBmQOQ2FavgLXr2fi3ujjI/';
export const hf = (file: string) => `${HF}${file}`;

// About hero (restored original founders film, re-encoded 14.8MB -> 4.1MB H.264)
const UP = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3FUhukBmQOQ2FavgLXr2fi3ujjI';
export const ABOUT_HERO_VIDEO = `${UP}/68a85002-539d-4e46-8ed0-92b16920e2bc.mp4`;
export const ABOUT_HERO_POSTER = `${UP}/f733380a-fde8-4f13-92b7-306802a307c2.jpg`;

// Full-bleed art-directed stills (Patches-4, upscaled). Wide for md+, tall
// for phones. WORK_HERO is retired from /work (Patches-6: the hero is now the
// real work) and kept in the library; the doorway moved to About ("The name").
export const WORK_HERO = {
  wide: { src: hf('hf_20260927_121341_6e66e345-0b1d-458a-8545-865acfdd814d.png'), w: 4096, h: 2294 },
  tall: { src: hf('hf_20260927_121343_1710a498-e1d3-43ea-9a87-0d8f4f0f447b.png'), w: 2160, h: 3856 },
} as const;
export const DOORWAY = {
  wide: { src: hf('hf_20260927_121347_c95fbb24-bb67-43aa-a72c-f11f9b35499f.png'), w: 4096, h: 2294 },
  tall: { src: hf('hf_20260927_121349_ab8b80fe-db90-498c-a244-40354a2e2ce2.png'), w: 2160, h: 3856 },
} as const;
// Universal footer: a molten obsidian horizon (upscaled 21:9).
export const FOOTER_BG = hf('hf_20260927_122002_2171731c-b9c0-4c4a-8c08-8a3d33e7bd3b.png');

// Contact brief backdrop (Patches-6): the original two-chair conversation
// room (contact-bg.png, pre-Next) recreated in gpt_image_2_5 from the old
// frame as reference, upscaled. Same composition, real material detail.
export const CONTACT_LOUNGE = {
  wide: { src: hf('hf_20261011_185505_92822189-6007-454b-8d95-abac5520882f.png'), w: 5040, h: 2160 },
  tall: { src: hf('hf_20261011_185507_eb2a7d03-d14f-4c45-be1d-54675cef1462.png'), w: 2294, h: 4096 },
} as const;
