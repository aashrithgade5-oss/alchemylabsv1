// Vault session: an HMAC-signed, HttpOnly cookie. Web Crypto only, so the
// same code verifies in middleware (edge) and route handlers (node).

export const VAULT_PATH = '/alchemy-vault';
export const VAULT_COOKIE = 'al_vault';
export const VAULT_TTL_S = 12 * 60 * 60; // 12h

const enc = new TextEncoder();

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? '';
}

async function hmac(data: string) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Constant-time string compare (no early exit on first differing char). */
export function safeEqual(a: string, b: string) {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < Math.max(ab.length, bb.length); i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

export function vaultConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && secret().length >= 32);
}

export async function createSession() {
  const exp = Math.floor(Date.now() / 1000) + VAULT_TTL_S;
  const payload = `v1.${exp}`;
  return `${payload}.${await hmac(payload)}`;
}

export async function verifySession(token: string | undefined | null) {
  if (!token || !vaultConfigured()) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  return safeEqual(parts[2], await hmac(`${parts[0]}.${parts[1]}`));
}
