'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Must match CONSENT_KEY in src/contexts/PerformanceContext.tsx.
const CONSENT_KEY = 'alchemy-cookie-consent';
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function hasConsent(): boolean {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return !!raw && JSON.parse(raw)?.accepted === true;
  } catch {
    return false;
  }
}

// document.referrer never changes on client-side navigation, so only the landing view carries it.
let sentReferrer = false;

function referrerHost(): string | null {
  if (sentReferrer) return null;
  sentReferrer = true;
  try {
    if (!document.referrer) return null;
    const host = new window.URL(document.referrer).hostname;
    return host && host !== location.hostname ? host.slice(0, 253) : null;
  } catch {
    return null;
  }
}

/**
 * One row per route change into public.page_views, only after cookie consent,
 * never on /admin. Plain fetch (no supabase-js) to keep public bundles small.
 */
export default function PageViewBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !URL || !KEY) return;
    if (pathname.startsWith('/admin') || !hasConsent()) return;
    fetch(`${URL}/rest/v1/page_views`, {
      method: 'POST',
      keepalive: true,
      headers: {
        apikey: KEY,
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ path: pathname.slice(0, 200), referrer_host: referrerHost() }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
