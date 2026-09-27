import { NextResponse, type NextRequest } from 'next/server';
import { VAULT_COOKIE, VAULT_PATH, verifySession } from '@lib/vault-session';

/**
 * Private vault. Every page under /alchemy-vault (except its login) and
 * every /api/vault call needs a valid signed session cookie. The retired
 * /admin URLs answer 404 so the old path reveals nothing.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.rewrite(new URL('/404-not-found', req.url));
  }

  const isLogin = pathname === `${VAULT_PATH}/login` || pathname === '/api/vault/login';
  const res = isLogin ? NextResponse.next() : null;
  if (!isLogin) {
    const ok = await verifySession(req.cookies.get(VAULT_COOKIE)?.value);
    if (!ok) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const url = new URL(`${VAULT_PATH}/login`, req.url);
      return NextResponse.redirect(url);
    }
  }
  const out = res ?? NextResponse.next();
  out.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  out.headers.set('Cache-Control', 'no-store');
  return out;
}

export const config = {
  matcher: ['/alchemy-vault/:path*', '/alchemy-vault', '/api/vault/:path*', '/admin', '/admin/:path*'],
};
