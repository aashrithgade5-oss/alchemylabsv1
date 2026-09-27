// Higgsfield CDN media (Patches-3). Every generated asset used on the site is
// listed here by role, so swapping one is a one-line change and nothing is
// scattered across components. Images go through next/image (Vercel resizes
// and caches them); videos stream directly.
export const HF = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FUhukBmQOQ2FavgLXr2fi3ujjI/';
export const hf = (file: string) => `${HF}${file}`;

// ---- About (Patches-3) -----------------------------------------------------
export const ABOUT_HERO_WIDE = hf('hf_20260927_102503_9344b4bc-e690-4a99-b0d1-2dd49f27524c.png'); // 2688x1152, figures right, dark left
export const ABOUT_HERO_TALL = hf('hf_20260927_102502_852a3fe5-c6c5-437d-ab57-94def6027797.png'); // 1520x2688, figures top, dark bottom
// Seedance 2.5 image-to-video, H.264 1920w ping-pong loop, 784KB, 12s (Higgsfield storage)
export const ABOUT_HERO_LOOP = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3FUhukBmQOQ2FavgLXr2fi3ujjI/cbad09ef-3f36-428b-b096-cc0df379d143.mp4';
