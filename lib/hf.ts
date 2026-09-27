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
