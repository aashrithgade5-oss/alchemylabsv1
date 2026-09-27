// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

const load = async () => {
  vi.resetModules();
  return import('../../lib/server/notify');
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const mail = {
  subject: 'New brief: Ana',
  title: 'A new project brief',
  replyTo: 'ana@maison.co',
  rows: [['Name', 'Ana <script>'], ['Brief', 'Launch film']] as [string, string][],
};

describe('sendNotification', () => {
  it('Resend: sends to both founders with reply-to, escapes HTML', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test');
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"id":"1"}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const { sendNotification } = await load();
    const r = await sendNotification(mail);
    expect(r).toEqual({ ok: true, provider: 'resend' });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(['aashrithgade5@gmail.com']);
    expect(body.cc).toEqual(['alchemylabs.work@gmail.com']);
    expect(body.reply_to).toBe('ana@maison.co');
    expect(body.html).toContain('Ana &lt;script&gt;');
    expect(body.html).not.toContain('<script>');
  });

  it('FormSubmit fallback: activation reply counts as a FAILURE', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('{"success":"false","message":"This form needs Activation."}', { status: 200 }),
    );
    vi.stubGlobal('fetch', fetchMock);
    const { sendNotification } = await load();
    const r = await sendNotification(mail);
    expect(r.ok).toBe(false);
    expect(r.provider).toBe('formsubmit');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://formsubmit.co/ajax/aashrithgade5%40gmail.com');
    const body = JSON.parse(init.body);
    expect(body._cc).toBe('alchemylabs.work@gmail.com');
    expect(body._replyto).toBe('ana@maison.co');
    expect(body.Brief).toBe('Launch film');
  });

  it('FormSubmit fallback: success after activation', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"success":"true"}', { status: 200 })));
    const { sendNotification } = await load();
    expect((await sendNotification(mail)).ok).toBe(true);
  });

  it('storeRow is a no-op without the service key', async () => {
    vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', '');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const { storeRow } = await load();
    expect(await storeRow('contact_submissions', { a: 1 })).toEqual({ ok: false, skipped: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
