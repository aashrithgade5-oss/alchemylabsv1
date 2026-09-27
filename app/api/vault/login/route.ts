import { cookies } from 'next/headers';
import { z } from 'zod';
import { VAULT_COOKIE, VAULT_TTL_S, createSession, safeEqual, vaultConfigured } from '@lib/vault-session';
import { clientIp, json, rateLimited, sameOrigin } from '@lib/server/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({ username: z.string().max(100), password: z.string().max(200) });

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  if (!vaultConfigured()) {
    return json({ error: 'The vault is not configured on this server (ADMIN_* env vars missing).' }, 503);
  }
  // brute-force brake: 8 attempts per 15 minutes per connection
  if (rateLimited(`vault:${clientIp(req)}`, 8, 15 * 60 * 1000)) {
    return json({ error: 'Too many attempts. Wait 15 minutes and try again.' }, 429);
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ error: 'Invalid request' }, 400);

  // username is forgiving (case, extra spaces); the password is exact
  const norm = (v: string) => v.trim().replace(/\s+/g, ' ').toLowerCase();
  const userOk = safeEqual(norm(parsed.data.username), norm(process.env.ADMIN_USERNAME!));
  // tolerate a stray space pasted into the Vercel env value
  const envPass = process.env.ADMIN_PASSWORD!;
  const passOk = safeEqual(parsed.data.password, envPass) || safeEqual(parsed.data.password, envPass.trim());
  if (!(userOk && passOk)) {
    await new Promise((r) => setTimeout(r, 450));
    return json({ error: 'That username or password is not right. The password is case-sensitive.' }, 401);
  }

  cookies().set(VAULT_COOKIE, await createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: VAULT_TTL_S,
  });
  return json({ ok: true });
}
