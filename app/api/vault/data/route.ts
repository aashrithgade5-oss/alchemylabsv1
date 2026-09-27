import { json } from '@lib/server/guard';
import { mailProvider, selectRows, storageConnected, NOTIFY_CC, NOTIFY_TO } from '@lib/server/notify';
import { cardPaymentUrl, intlPaymentUrl, upiVpa } from '@lib/payments';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Sub = { id: string; name: string; email: string; company: string | null; service: string | null; message: string; created_at: string };
type Nl = { id: string; email: string; source: string | null; created_at: string };
type View = { path: string; referrer_host: string | null; created_at: string };

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
    submissions: subs.rows,
    subscribers: nl.rows,
    views: views.rows,
    errors: [subs.error, nl.error, views.error].filter(Boolean),
  });
}
