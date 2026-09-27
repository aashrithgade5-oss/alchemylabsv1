'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Check, Download, LogOut, Mail, RefreshCw, Search } from 'lucide-react';

type Sub = { id: string; name: string; email: string; company: string | null; service: string | null; message: string; created_at: string };
type Nl = { id: string; email: string; source: string | null; created_at: string };
type View = { path: string; referrer_host: string | null; created_at: string };
type Data = {
  integrations: {
    mail: 'resend' | 'gmail' | 'formsubmit';
    mailTo: string[];
    storage: boolean;
    upi: string;
    card: boolean;
    intl: boolean;
    searchConsoleTag: boolean;
  };
  build: { env: string; sha: string; message: string; branch: string; region: string };
  deployments: { id: string; url: string; state: string; target: string | null; created: number; message: string }[] | null;
  submissions: Sub[];
  subscribers: Nl[];
  views: View[];
  errors: string[];
};

const DAY = 864e5;
const fmt = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

function csv(rows: Record<string, unknown>[], name: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const body = [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'text/csv' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `${name}-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click();
  URL.revokeObjectURL(url);
}

const VERCEL = 'https://vercel.com/aashrithgade5-oss-projects/alchemylabsv1';
const LINKS: [string, string, string][] = [
  ['Visitors', 'Vercel Web Analytics', `${VERCEL}/analytics`],
  ['Speed', 'Vercel Speed Insights', `${VERCEL}/speed-insights`],
  ['Errors + logs', 'Vercel Logs', `${VERCEL}/logs`],
  ['Deploys', 'Vercel Deployments', `${VERCEL}/deployments`],
  ['Google', 'Search Console', 'https://search.google.com/search-console?resource_id=sc-domain:alchemylabs.in'],
  ['Calls', 'Calendly bookings', 'https://calendly.com/app/scheduled_events/user/me'],
  ['Inbox', 'Briefs in Gmail', 'https://mail.google.com/mail/u/0/#search/%22Alchemy+Labs%22+brief'],
  ['Payments page', 'alchemylabs.in/pay', '/pay'],
];

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-[18px] border border-bone/[0.07] bg-carbon p-5 sm:p-6 ${className}`}>{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45">{children}</p>
);

export default function VaultDashboard() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [tab, setTab] = useState<'overview' | 'briefs' | 'newsletter' | 'traffic'>('overview');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vault/data', { cache: 'no-store' });
      if (res.status === 401) {
        window.location.assign('/alchemy-vault/login');
        return;
      }
      if (!res.ok) throw new Error(`Load failed (${res.status})`);
      setData(await res.json());
      setErr(null);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Load failed');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, [load]);

  const logout = async () => {
    await fetch('/api/vault/logout', { method: 'POST' });
    window.location.assign('/alchemy-vault/login');
  };

  const briefs = useMemo(() => {
    const s = q.trim().toLowerCase();
    const all = data?.submissions ?? [];
    return s ? all.filter((b) => `${b.name} ${b.email} ${b.company ?? ''} ${b.message}`.toLowerCase().includes(s)) : all;
  }, [data, q]);

  const traffic = useMemo(() => {
    const views = data?.views ?? [];
    const now = Date.now();
    const days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(now - (29 - i) * DAY).toISOString().slice(0, 10);
      return { d, n: 0 };
    });
    const idx = new Map(days.map((x, i) => [x.d, i]));
    const paths = new Map<string, number>();
    const refs = new Map<string, number>();
    let last7 = 0;
    for (const v of views) {
      const i = idx.get(v.created_at.slice(0, 10));
      if (i !== undefined) days[i].n++;
      if (now - new Date(v.created_at).getTime() < 7 * DAY) last7++;
      paths.set(v.path, (paths.get(v.path) ?? 0) + 1);
      if (v.referrer_host) refs.set(v.referrer_host, (refs.get(v.referrer_host) ?? 0) + 1);
    }
    const top = (m: Map<string, number>) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    return { days, max: Math.max(1, ...days.map((x) => x.n)), last7, total: views.length, paths: top(paths), refs: top(refs) };
  }, [data]);

  const briefs30 = (data?.submissions ?? []).filter((b) => Date.now() - new Date(b.created_at).getTime() < 30 * DAY).length;
  const i = data?.integrations;

  const tabBtn = (id: typeof tab, text: string, count?: number) => (
    <button
      type="button"
      role="tab"
      aria-selected={tab === id}
      onClick={() => setTab(id)}
      className={`min-h-[40px] rounded-full px-4 font-mono text-[10px] tracking-[0.2em] transition-colors ${tab === id ? 'bg-bone text-void' : 'text-bone/60 hover:text-bone'}`}
    >
      {text}
      {count !== undefined && <span className="ml-2 opacity-60">{count}</span>}
    </button>
  );

  return (
    <main className="min-h-[100svh] bg-void px-4 pb-24 pt-8 font-sans text-bone sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-ember">ALCHEMY LABS · VAULT</p>
            <h1 className="mt-2 font-headline text-3xl font-bold tracking-[-0.03em]">
              Studio <span className="font-playfair font-normal italic">ledger</span>
            </h1>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={load} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-bone/80 hover:border-ember/50">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} aria-hidden /> Refresh
            </button>
            <button type="button" onClick={logout} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-bone/80 hover:border-ember/50">
              <LogOut className="h-4 w-4" aria-hidden /> Sign out
            </button>
          </div>
        </header>

        {err && <p role="alert" className="mt-6 rounded-2xl border border-ember/40 bg-ember/[0.06] p-4 text-sm">{err}</p>}
        <section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ['Briefs · 30 days', briefs30],
            ['Subscribers', data?.subscribers.length ?? 0],
            ['Views · 7 days', traffic.last7],
            ['Views · 30 days', traffic.total],
          ].map(([k, v]) => (
            <Card key={k as string}>
              <Label>{k}</Label>
              <p className="mt-2 font-headline text-3xl font-bold tabular-nums sm:text-4xl">{v}</p>
            </Card>
          ))}
        </section>

        <nav role="tablist" aria-label="Vault sections" className="mt-8 flex flex-wrap gap-1 rounded-full border border-line p-1 sm:w-fit">
          {tabBtn('overview', 'OVERVIEW')}
          {tabBtn('briefs', 'BRIEFS', data?.submissions.length)}
          {tabBtn('newsletter', 'NEWSLETTER', data?.subscribers.length)}
          {tabBtn('traffic', 'TRAFFIC')}
        </nav>


        {tab === 'overview' && i && (
          <section className="mt-6 grid gap-3 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <Label>Open</Label>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {LINKS.map(([k, name, href]) => (
                  <li key={k}>
                    <a
                      href={href}
                      target={href.startsWith('/') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="group flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border border-bone/[0.07] px-4 py-3 transition-colors hover:border-ember/50"
                    >
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45">{k}</span>
                        <span className="text-sm">{name}</span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-bone/40 transition-colors group-hover:text-ember" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <Label>Live build</Label>
              <p className="mt-3 text-sm">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 align-middle" aria-hidden />
                {data?.build.env === 'production' ? 'Production' : data?.build.env} {data?.build.sha && <span className="font-mono text-bone/60">· {data.build.sha}</span>}
              </p>
              {data?.build.message && <p className="mt-2 text-sm leading-relaxed text-ash">{data.build.message}</p>}
              {data?.deployments && (
                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {data.deployments.map((d) => (
                    <li key={d.id} className="flex items-baseline justify-between gap-3 text-xs">
                      <span className="truncate text-bone/75">{d.message || d.url}</span>
                      <span className={`shrink-0 font-mono ${d.state === 'READY' ? 'text-emerald-400' : d.state === 'ERROR' ? 'text-ember' : 'text-amber'}`}>{d.state.toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            <Card className="lg:col-span-3">
              <Label>Setup</Label>
              <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-2">
                {(
                  [
                    [true, 'Vault sign-in', 'Working'],
                    [true, 'Brief + newsletter email', i.mail === 'formsubmit' ? `FormSubmit to ${i.mailTo[0]}. Click its one-time activation email once.` : `${i.mail === 'gmail' ? 'Gmail' : 'Resend'} to ${i.mailTo.join(', ')}`],
                    [i.storage, 'Brief ledger in this vault', i.storage ? 'Connected' : 'Vercel env: SUPABASE_SERVICE_ROLE_KEY (Supabase > Settings > API > service_role). Emails work without it.'],
                    [true, 'UPI', i.upi],
                    [i.card, 'Card / netbanking link', i.card ? 'Live' : 'Optional: NEXT_PUBLIC_CARD_PAYMENT_URL (Razorpay payment page)'],
                    [i.intl, 'International link', i.intl ? 'Live' : 'Optional: NEXT_PUBLIC_INTL_PAYMENT_URL (PayPal.me or Stripe link)'],
                    [Boolean(data?.deployments), 'Deploy feed here', data?.deployments ? 'Connected' : 'Optional: VERCEL_API_TOKEN (vercel.com/account/tokens)'],
                  ] as [boolean, string, string][]
                ).map(([ok, k, note]) => (
                  <li key={k} className="flex gap-3">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${ok ? 'bg-emerald-400/15 text-emerald-400' : 'border border-amber/50'}`} aria-hidden>
                      {ok && <Check className="h-3 w-3" />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{k}<span className="sr-only">{ok ? ': done' : ': to do'}</span></span>
                      <span className="block break-words text-sm text-ash">{note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </section>
        )}

        {tab === 'briefs' && (
          <section className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <label className="relative flex-1 sm:max-w-sm">
                <span className="sr-only">Search briefs</span>
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-bone/40" aria-hidden />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, brief" className="min-h-[44px] w-full rounded-full border border-line bg-transparent pl-11 pr-4 text-sm outline-none focus:border-ember/60" />
              </label>
              <button type="button" onClick={() => csv(briefs as unknown as Record<string, unknown>[], 'briefs')} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-bone/80 hover:border-ember/50">
                <Download className="h-4 w-4" aria-hidden /> CSV
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {briefs.length === 0 && <li className="rounded-2xl border border-line p-6 text-sm text-ash">{loading ? 'Loading' : i && !i.storage ? `Briefs arrive by email at ${i.mailTo.join(' and ')}. To list them here too, add the ledger key (see Overview > Setup).` : 'No briefs yet.'}</li>}
              {briefs.map((b) => (
                <li key={b.id} className="rounded-2xl border border-bone/[0.07] bg-carbon">
                  <button type="button" onClick={() => setOpen(open === b.id ? null : b.id)} aria-expanded={open === b.id} className="flex w-full flex-wrap items-baseline justify-between gap-2 p-5 text-left">
                    <span>
                      <span className="font-semibold">{b.name}</span>
                      {b.company && <span className="text-bone/50"> · {b.company}</span>}
                      <span className="block font-mono text-[11px] text-bone/45">{b.email}{b.service ? ` · ${b.service}` : ''}</span>
                    </span>
                    <span className="font-mono text-[11px] text-bone/45">{fmt(b.created_at)}</span>
                  </button>
                  {open === b.id && (
                    <div className="border-t border-line px-5 pb-5 pt-4">
                      <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-bone/85">{b.message}</p>
                      <a href={`mailto:${b.email}?subject=${encodeURIComponent('Re: your brief to Alchemy Labs')}`} className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-ember px-5 text-sm font-semibold text-void hover:bg-amber">
                        <Mail className="h-4 w-4" aria-hidden /> Reply
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'newsletter' && (
          <section className="mt-6">
            <button type="button" onClick={() => csv((data?.subscribers ?? []) as unknown as Record<string, unknown>[], 'subscribers')} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-bone/80 hover:border-ember/50">
              <Download className="h-4 w-4" aria-hidden /> Export CSV
            </button>
            <ul className="mt-4 divide-y divide-line rounded-2xl border border-bone/[0.07] bg-carbon">
              {(data?.subscribers.length ?? 0) === 0 && <li className="p-6 text-sm text-ash">{loading ? 'Loading' : i && !i.storage ? 'Sign-ups arrive by email. Add the ledger key to list them here (Overview > Setup).' : 'No subscribers yet.'}</li>}
              {data?.subscribers.map((s) => (
                <li key={s.id} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                  <span className="break-all text-sm">{s.email}</span>
                  <span className="font-mono text-[11px] text-bone/45">{s.source ?? 'site'} · {fmt(s.created_at)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'traffic' && (
          <section className="mt-6 grid gap-3 lg:grid-cols-3">
            <Card className="lg:col-span-3">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Label>Page views · last 30 days (visitors who accepted cookies)</Label>
                <a href={`${VERCEL}/analytics`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center gap-1 text-sm text-bone/75 underline decoration-ember/50 underline-offset-4 hover:text-bone">
                  Full analytics on Vercel <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
              <div className="mt-5 flex h-40 items-end gap-[3px]" role="img" aria-label="Daily page views, last 30 days">
                {traffic.days.map((d) => (
                  <div key={d.d} title={`${d.d}: ${d.n}`} className="flex-1 rounded-t bg-ember/70" style={{ height: `${Math.max(2, (d.n / traffic.max) * 100)}%` }} />
                ))}
              </div>
            </Card>
            {[
              ['Top pages', traffic.paths],
              ['Top referrers', traffic.refs],
            ].map(([title, rows]) => (
              <Card key={title as string} className="lg:col-span-1">
                <Label>{title as string}</Label>
                <ul className="mt-3 space-y-2 text-sm">
                  {(rows as [string, number][]).length === 0 && <li className="text-ash">No data yet.</li>}
                  {(rows as [string, number][]).map(([k, n]) => (
                    <li key={k} className="flex justify-between gap-3"><span className="truncate">{k}</span><span className="tabular-nums text-bone/60">{n}</span></li>
                  ))}
                </ul>
              </Card>
            ))}
          </section>
        )}

        {data?.errors.length ? (
          <Card className="mt-3"><Label>Storage errors</Label><pre className="mt-2 whitespace-pre-wrap text-xs text-ember">{data.errors.join('\n')}</pre></Card>
        ) : null}
      </div>
    </main>
  );
}
