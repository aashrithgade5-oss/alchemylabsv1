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

// Full-bleed page heroes (Patches-4, upscaled): Work = the gallery after
// hours, Contact = the lit doorway. Wide for md+, tall for phones.
export const WORK_HERO = {
  wide: { src: hf('hf_20260927_121341_6e66e345-0b1d-458a-8545-865acfdd814d.png'), w: 4096, h: 2294 },
  tall: { src: hf('hf_20260927_121343_1710a498-e1d3-43ea-9a87-0d8f4f0f447b.png'), w: 2160, h: 3856 },
} as const;
export const CONTACT_HERO = {
  wide: { src: hf('hf_20260927_121347_c95fbb24-bb67-43aa-a72c-f11f9b35499f.png'), w: 4096, h: 2294 },
  tall: { src: hf('hf_20260927_121349_ab8b80fe-db90-498c-a244-40354a2e2ce2.png'), w: 2160, h: 3856 },
} as const;
// Universal footer: a molten obsidian horizon (upscaled 21:9).
export const FOOTER_BG = hf('hf_20260927_122002_2171731c-b9c0-4c4a-8c08-8a3d33e7bd3b.png');
