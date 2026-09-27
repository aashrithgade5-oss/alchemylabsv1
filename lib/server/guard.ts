// Request guards shared by the public form endpoints.

const hits = new Map<string, number[]>();

/** Sliding-window limit per key, per server instance (best effort on serverless). */
export function rateLimited(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return list.length > max;
}

export function clientIp(req: Request) {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd?.split(',')[0] ?? req.headers.get('x-real-ip') ?? 'unknown').trim();
}

/** Browser posts only: blocks cross-site form spam aimed at the endpoint. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // same-origin fetches may omit it
  try {
    const o = new URL(origin).host;
    const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
    return o === host || o.endsWith('alchemylabs.in');
  } catch {
    return false;
  }
}

export function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}
