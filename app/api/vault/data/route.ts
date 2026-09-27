import { json } from '@lib/server/guard';
import { mailProvider, selectRows, storageConnected, NOTIFY_CC, NOTIFY_TO } from '@lib/server/notify';
import { cardPaymentUrl, intlPaymentUrl, upiVpa } from '@lib/payments';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Sub = { id: string; name: string; email: string; company: string | null; service: string | null; message: string; created_at: string };
type Nl = { id: string; email: string; source: string | null; created_at: string };
type View = { path: string; referrer_host: string | null; created_at: string };

type Deploy = { uid: string; url: string; state: string; target: string | null; created: number; meta?: { githubCommitMessage?: string } };

/** Optional: VERCEL_API_TOKEN (read-only scope is enough) lists recent deploys. */
async function recentDeployments() {
  const token = process.env.VERCEL_API_TOKEN;
  const project = process.env.VERCEL_PROJECT_ID ?? 'prj_2pyPSIePbwpF3jOB5t76sbfG9NaM';
  if (!token) return null;
  try {
    const qs = new URLSearchParams({ projectId: project, limit: '6' });
    if (process.env.VERCEL_TEAM_ID) qs.set('teamId', process.env.VERCEL_TEAM_ID);
    const res = await fetch(`https://api.vercel.com/v6/deployments?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const { deployments } = (await res.json()) as { deployments: Deploy[] };
    return deployments.map((d) => ({
      id: d.uid,
      url: d.url,
      state: d.state,
      target: d.target,
      created: d.created,
      message: (d.meta?.githubCommitMessage ?? '').split('\n')[0].slice(0, 100),
    }));
  } catch {
    return null;
  }
}

// Auth is enforced by middleware.ts before this handler runs.
export async function GET() {
  const since = new Date(Date.now() - 30 * 864e5).toISOString();
  const [subs, nl, views] = await Promise.all([
    selectRows<Sub>('contact_submissions', 'select=*&order=created_at.desc&limit=500'),
    selectRows<Nl>('newsletter_subscribers', 'select=*&order=created_at.desc&limit=2000'),
    selectRows<View>('page_views', `select=path,referrer_host,created_at&created_at=gte.${since}&order=created_at.desc&limit=20000`),
  ]);

  return json({
    integrations: {
      mail: mailProvider(),
      mailTo: [NOTIFY_TO, ...NOTIFY_CC],
      storage: storageConnected(),
      upi: upiVpa,
      card: Boolean(cardPaymentUrl),
      intl: Boolean(intlPaymentUrl),
      searchConsoleTag: Boolean(process.env.NEXT_PUBLIC_GSC_VERIFICATION),
    },
    // Vercel system env (Settings > Environment Variables > "Automatically expose System Environment Variables")
    build: {
      env: process.env.VERCEL_ENV ?? 'local',
      sha: (process.env.VERCEL_GIT_COMMIT_SHA ?? '').slice(0, 7),
      message: (process.env.VERCEL_GIT_COMMIT_MESSAGE ?? '').split('\n')[0].slice(0, 120),
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? '',
      region: process.env.VERCEL_REGION ?? '',
    },
    deployments: await recentDeployments(),
    submissions: subs.rows,
    subscribers: nl.rows,
    views: views.rows,
    errors: [subs.error, nl.error, views.error].filter(Boolean),
  });
}
