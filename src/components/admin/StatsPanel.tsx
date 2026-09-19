'use client';

import { useEffect, useMemo, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

type Lead = { service: string | null; created_at: string };
type View = { path: string; referrer_host: string | null; created_at: string };

// page_views is not in the generated types yet; regenerate types.ts to drop this cast.
const db = supabase as unknown as SupabaseClient;
const DAY = 864e5;

function last30(dates: string[]) {
  const days: { day: string; count: number }[] = [];
  const idx = new Map<string, number>();
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * DAY).toISOString().slice(0, 10);
    idx.set(d, days.length);
    days.push({ day: d.slice(5), count: 0 });
  }
  for (const c of dates) {
    const i = idx.get(new Date(c).toISOString().slice(0, 10));
    if (i !== undefined) days[i].count++;
  }
  return days;
}

function tally<T>(items: T[], key: (t: T) => string | null, n = 10) {
  const m = new Map<string, number>();
  for (const t of items) {
    const k = key(t);
    if (k) m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-carbon border border-bone/[0.06] rounded-2xl p-5 sm:p-6 ${className}`}>{children}</div>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-bone/45">{children}</p>
);
const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <Card>
    <Label>{label}</Label>
    <p className="font-headline font-bold text-3xl sm:text-4xl text-bone mt-2 tabular-nums">{value}</p>
  </Card>
);

function Spark({ data }: { data: { day: string; count: number }[] }) {
  return (
    <div className="h-40 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
          <XAxis dataKey="day" tick={{ fill: 'rgba(237,230,221,0.4)', fontSize: 10 }} interval={6} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: 'rgba(237,230,221,0.4)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: '#161412', border: '1px solid rgba(237,230,221,0.1)', borderRadius: 12, color: '#EDE6DD' }}
            cursor={{ stroke: 'rgba(237,230,221,0.15)' }}
          />
          <Area type="monotone" dataKey="count" stroke="#FF4D1C" strokeWidth={2} fill="#FF4D1C" fillOpacity={0.12} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Bars({ rows, empty }: { rows: [string, number][]; empty: string }) {
  if (!rows.length) return <p className="font-body text-sm text-bone/40 py-6">{empty}</p>;
  const max = rows[0][1];
  return (
    <ul className="mt-4 space-y-3">
      {rows.map(([k, v]) => (
        <li key={k}>
          <div className="flex justify-between gap-3 text-sm">
            <span className="font-body text-bone/80 truncate">{k}</span>
            <span className="font-mono text-xs text-bone/50 tabular-nums">{v}</span>
          </div>
          <div className="h-1.5 mt-1.5 rounded-full bg-bone/5 overflow-hidden">
            <div className="h-full rounded-full bg-ember/70" style={{ width: `${(v / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function StatsPanel({ leads }: { leads: Lead[] }) {
  const [views, setViews] = useState<View[]>([]);
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const since = new Date(Date.now() - 30 * DAY).toISOString();
    Promise.all([
      db.from('page_views').select('id', { count: 'exact', head: true }),
      // ponytail: aggregates client-side over 30d of rows (capped 10k); move to a SQL view/RPC if traffic outgrows it.
      db.from('page_views').select('path,referrer_host,created_at').gte('created_at', since).order('created_at', { ascending: false }).limit(10000),
    ]).then(([c, r]) => {
      if (c.error || r.error) setError((c.error || r.error)!.message);
      setTotalViews(c.count ?? 0);
      setViews((r.data as View[]) || []);
    });
  }, []);

  const s = useMemo(() => {
    const now = Date.now();
    const within = (d: string, days: number) => now - new Date(d).getTime() <= days * DAY;
    return {
      l7: leads.filter((l) => within(l.created_at, 7)).length,
      l30: leads.filter((l) => within(l.created_at, 30)).length,
      services: tally(leads, (l) => l.service || 'Unspecified', 20),
      leadDaily: last30(leads.map((l) => l.created_at)),
      v7: views.filter((v) => within(v.created_at, 7)).length,
      pages: tally(views, (v) => v.path),
      refs: tally(views, (v) => v.referrer_host),
      viewDaily: last30(views.map((v) => v.created_at)),
    };
  }, [leads, views]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <Label>Leads · contact form</Label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Stat label="Total" value={leads.length} />
          <Stat label="Last 7 days" value={s.l7} />
          <Stat label="Last 30 days" value={s.l30} />
        </div>
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-4">
          <Card>
            <Label>Leads per day · 30d</Label>
            <Spark data={s.leadDaily} />
          </Card>
          <Card>
            <Label>By service</Label>
            <Bars rows={s.services} empty="No leads yet." />
          </Card>
        </div>
      </section>

      <section className="space-y-4">
        <Label>Traffic · first-party, consented visitors only</Label>
        {error && (
          <Card className="border-ember/30">
            <p className="font-body text-sm text-bone/70">
              Could not load page views ({error}). Has the <code className="font-mono text-ember">page_views</code> migration been applied?
            </p>
          </Card>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <Stat label="All-time views" value={totalViews ?? '…'} />
          <Stat label="Views · 7d" value={s.v7} />
          <Stat label="Views · 30d" value={views.length} />
        </div>
        <Card>
          <Label>Daily views · 30d</Label>
          <Spark data={s.viewDaily} />
        </Card>
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-4">
          <Card>
            <Label>Top pages · 30d</Label>
            <Bars rows={s.pages} empty="No views recorded yet." />
          </Card>
          <Card>
            <Label>Top referrers · 30d</Label>
            <Bars rows={s.refs} empty="No external referrers yet." />
          </Card>
        </div>
        <p className="font-body text-xs text-bone/40 leading-relaxed max-w-2xl">
          Counts only visitors who accepted cookies; no IPs, cookies or user agents are stored. Admin pages are
          never counted. For full traffic and Core Web Vitals, see Vercel Analytics / Speed Insights in the Vercel
          project dashboard (separate, not wired in here).
        </p>
      </section>
    </div>
  );
}
