import nodemailer from 'nodemailer';

/**
 * Owner notifications for briefs and newsletter sign-ups.
 *
 * Mail providers, first configured wins:
 *   1. Resend       RESEND_API_KEY (+ RESEND_FROM on a verified domain)
 *   2. Gmail SMTP   GMAIL_USER + GMAIL_APP_PASSWORD (Google app password)
 *   3. FormSubmit   zero-config fallback: the FIRST message sends an
 *                   activation link to NOTIFY_TO; click it once and every
 *                   later message is delivered.
 * Storage (optional): SUPABASE_SERVICE_ROLE_KEY writes rows server-side so
 * the vault dashboard can list them. Mail is the guaranteed channel.
 */

export const NOTIFY_TO = process.env.NOTIFY_TO ?? 'aashrithgade5@gmail.com';
export const NOTIFY_CC = (process.env.NOTIFY_CC ?? 'alchemylabs.work@gmail.com')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

export type MailProvider = 'resend' | 'gmail' | 'formsubmit';

export function mailProvider(): MailProvider {
  if (process.env.RESEND_API_KEY) return 'resend';
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) return 'gmail';
  return 'formsubmit';
}

export function storageConnected() {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY && supabaseUrl());
}

function supabaseUrl() {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Minimal branded mail: void background, bone type, ember rule. */
export function renderMail(title: string, rows: [string, string][]) {
  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 0;border-top:1px solid #2a2622;color:#9a9186;font:11px/1.4 monospace;letter-spacing:.18em;text-transform:uppercase;vertical-align:top;width:120px">${escapeHtml(
          k,
        )}</td><td style="padding:10px 0;border-top:1px solid #2a2622;color:#ede6dd;font:15px/1.6 -apple-system,Segoe UI,Inter,sans-serif;white-space:pre-wrap">${escapeHtml(
          v || '-',
        )}</td></tr>`,
    )
    .join('');
  return `<!doctype html><html><body style="margin:0;background:#0a0908;padding:32px 16px"><table role="presentation" style="max-width:560px;margin:0 auto;width:100%"><tr><td><p style="margin:0;color:#ff4d1c;font:11px monospace;letter-spacing:.3em">ALCHEMY LABS</p><h1 style="margin:12px 0 20px;color:#ede6dd;font:700 24px/1.2 -apple-system,Segoe UI,Inter,sans-serif">${escapeHtml(
    title,
  )}</h1><table role="presentation" style="width:100%;border-collapse:collapse">${body}</table></td></tr></table></body></html>`;
}

export interface Mail {
  subject: string;
  title: string;
  rows: [string, string][];
  replyTo?: string;
}

export interface Delivery {
  ok: boolean;
  provider: MailProvider;
  error?: string;
}

export async function sendNotification(mail: Mail): Promise<Delivery> {
  const provider = mailProvider();
  const html = renderMail(mail.title, mail.rows);
  const text = `${mail.title}\n\n${mail.rows.map(([k, v]) => `${k}: ${v || '-'}`).join('\n')}`;
  try {
    if (provider === 'resend') {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? 'Alchemy Labs <onboarding@resend.dev>',
          to: [NOTIFY_TO],
          cc: NOTIFY_CC,
          reply_to: mail.replyTo,
          subject: mail.subject,
          html,
          text,
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return { ok: true, provider };
    }

    if (provider === 'gmail') {
      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });
      await transport.sendMail({
        from: `Alchemy Labs <${process.env.GMAIL_USER}>`,
        to: NOTIFY_TO,
        cc: NOTIFY_CC,
        replyTo: mail.replyTo,
        subject: mail.subject,
        html,
        text,
      });
      return { ok: true, provider };
    }

    // FormSubmit: JSON AJAX endpoint. success:"false" (e.g. "needs
    // Activation") is a FAILURE here, so a brief is never reported as sent
    // when it only triggered the activation mail.
    const payload: Record<string, string> = {
      _subject: mail.subject,
      _template: 'table',
      _captcha: 'false',
      _cc: NOTIFY_CC.join(','),
    };
    if (mail.replyTo) payload._replyto = mail.replyTo;
    for (const [k, v] of mail.rows) payload[k] = v || '-';
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_TO)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://alchemylabs.in',
        Referer: 'https://alchemylabs.in/contact',
      },
      body: JSON.stringify(payload),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (!res.ok || String(json.success) !== 'true') {
      throw new Error(`formsubmit: ${json.message ?? res.status}`);
    }
    return { ok: true, provider };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error('[notify] delivery failed', provider, error);
    return { ok: false, provider, error };
  }
}

/** Insert a row with the service role (bypasses RLS). No-op without a key. */
export async function storeRow(
  table: 'contact_submissions' | 'newsletter_subscribers',
  row: Record<string, unknown>,
  opts: { ignoreDuplicates?: boolean; onConflict?: string } = {},
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!storageConnected()) return { ok: false, skipped: true };
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const qs = opts.onConflict ? `?on_conflict=${opts.onConflict}` : '';
  try {
    const res = await fetch(`${supabaseUrl()}/rest/v1/${table}${qs}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: `return=minimal${opts.ignoreDuplicates ? ',resolution=ignore-duplicates' : ''}`,
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 200)}`);
    return { ok: true };
  } catch (e) {
    const error = e instanceof Error ? e.message : String(e);
    console.error('[store] insert failed', table, error);
    return { ok: false, error };
  }
}

/** Service-role select for the vault. Returns [] when storage is off. */
export async function selectRows<T>(table: string, query: string): Promise<{ rows: T[]; error?: string }> {
  if (!storageConnected()) return { rows: [] };
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  try {
    const res = await fetch(`${supabaseUrl()}/rest/v1/${table}?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`${res.status}: ${(await res.text()).slice(0, 200)}`);
    return { rows: (await res.json()) as T[] };
  } catch (e) {
    return { rows: [], error: e instanceof Error ? e.message : String(e) };
  }
}
