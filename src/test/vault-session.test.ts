// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';

const load = async () => {
  vi.resetModules();
  vi.stubEnv('ADMIN_USERNAME', 'Alchemy Labs');
  vi.stubEnv('ADMIN_PASSWORD', 'pw');
  vi.stubEnv('ADMIN_SESSION_SECRET', 'x'.repeat(40));
  return import('../../lib/vault-session');
};

afterEach(() => vi.unstubAllEnvs());

describe('vault session', () => {
  it('accepts its own token, rejects tampering and expiry', async () => {
    const v = await load();
    const t = await v.createSession();
    expect(await v.verifySession(t)).toBe(true);
    const [ver, exp, sig] = t.split('.');
    expect(await v.verifySession(`${ver}.${Number(exp) + 999}.${sig}`)).toBe(false);
    expect(await v.verifySession(`${ver}.${exp}.${sig.slice(0, -2)}xx`)).toBe(false);
    expect(await v.verifySession(`v1.${Math.floor(Date.now() / 1000) - 10}.${sig}`)).toBe(false);
    expect(await v.verifySession(undefined)).toBe(false);
  });

  it('fails closed when not configured', async () => {
    const v = await load();
    const t = await v.createSession();
    vi.stubEnv('ADMIN_SESSION_SECRET', 'short');
    expect(v.vaultConfigured()).toBe(false);
    expect(await v.verifySession(t)).toBe(false);
  });

  it('safeEqual', async () => {
    const v = await load();
    expect(v.safeEqual('Alchemy Labs*55', 'Alchemy Labs*55')).toBe(true);
    expect(v.safeEqual('Alchemy Labs*55', 'Alchemy Labs*5')).toBe(false);
  });
});
