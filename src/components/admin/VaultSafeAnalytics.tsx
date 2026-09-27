'use client';

import { Analytics } from '@vercel/analytics/next';

/** Vercel Web Analytics (cookieless). The private vault never reports a view. */
export function VaultSafeAnalytics() {
  return <Analytics beforeSend={(e) => (e.url.includes('/alchemy-vault') ? null : e)} />;
}
