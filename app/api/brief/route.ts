import { z } from 'zod';
import { sendNotification, storeRow } from '@lib/server/notify';
import { clientIp, json, rateLimited, sameOrigin } from '@lib/server/guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SERVICE_LABELS: Record<string, string> = {
  'fast-24h': 'AI Creative Studio · Campaign & film',
  'foundation-brand': 'Foundation · Brand system',
  'clarity-advisory': 'Clarity · Strategy advisory',
  'not-sure': 'Not sure yet',
};

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().default(''),
  service: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(500).optional(), // honeypot: any value = bot
  startedAt: z.number().int().optional(),
});

export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: 'Forbidden' }, 403);
  const ip = clientIp(req);
  if (rateLimited(`brief:${ip}`, 5, 60 * 60 * 1000)) {
    return json({ error: 'Too many briefs from this connection. Please email us directly.' }, 429);
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request' }, 400);
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: 'Please check the highlighted fields.' }, 400);
  const b = parsed.data;

  // Bots: filled the hidden field, or submitted faster than a human can type.
  // Answer 200 so they learn nothing; nothing is sent or stored.
  const tooFast = b.startedAt !== undefined && Date.now() - b.startedAt < 2500;
  if (b.website || tooFast) return json({ ok: true });

  const service = SERVICE_LABELS[b.service] ?? b.service;
  const [mail, stored] = await Promise.all([
    sendNotification({
      subject: `New brief: ${b.name}${b.company ? ` · ${b.company}` : ''}`,
      title: 'A new project brief',
      replyTo: b.email,
      rows: [
        ['Name', b.name],
        ['Email', b.email],
        ['Company', b.company],
        ['Needs', service],
        ['Brief', b.message],
        ['Received', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST'],
      ],
    }),
    storeRow('contact_submissions', {
      name: b.name,
      email: b.email,
      company: b.company || null,
      service: service || null,
      message: b.message,
    }),
  ]);

  if (!mail.ok && !stored.ok) {
    return json(
      { error: 'We could not deliver your brief right now. Please email alchemylabs.work@gmail.com or WhatsApp us.' },
      502,
    );
  }
  return json({ ok: true });
}
