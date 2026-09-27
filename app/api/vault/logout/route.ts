import { cookies } from 'next/headers';
import { VAULT_COOKIE } from '@lib/vault-session';
import { json } from '@lib/server/guard';

export const dynamic = 'force-dynamic';

export async function POST() {
  cookies().set(VAULT_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0, sameSite: 'strict' });
  return json({ ok: true });
}
