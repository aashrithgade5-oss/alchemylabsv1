import { z } from 'zod';
import { sendNotification, storeRow } from '@lib/server/notify';
import { clientIp, json, rateLimited, sameOrigin } from '@lib/server/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
  website: z.string().max(500).optional(), // honeypot: any value = bot
  source: z.string().max(60).optional().default('site'),
});

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  if (rateLimited(`nl:${clientIp(req)}`, 5, 60 * 60 * 1000)) {
    return json({ error: 'Too many attempts. Try again later.' }, 429);
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'Enter a valid email address.' }, 400);
  const { email, website, source } = parsed.data;
  if (website) return json({ ok: true });

  const [mail, stored] = await Promise.all([
    sendNotification({
      subject: `New newsletter subscriber: ${email}`,
      title: 'Someone joined the newsletter',
      replyTo: email,
      rows: [
        ['Email', email],
        ['From', source],
        ['Joined', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
      ],
    }),
    storeRow('newsletter_subscribers', { email, source }, { ignoreDuplicates: true, onConflict: 'email' }),
  ]);

  if (!mail.ok && !stored.ok) {
    return json({ error: 'Could not subscribe right now. Please try again shortly.' }, 502);
  }
  return json({ ok: true });
}
