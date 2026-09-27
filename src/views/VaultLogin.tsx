'use client';

import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';

const field =
  'mt-2 block min-h-[48px] w-full rounded-2xl border border-bone/10 bg-bone/[0.03] px-4 py-3 text-[15px] text-bone outline-none transition-[border-color,box-shadow] focus:border-ember/60 focus:shadow-[0_0_0_4px_rgba(255,77,28,0.12)]';

export default function VaultLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/vault/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Sign-in failed.');
      window.location.assign('/alchemy-vault');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed.');
      setBusy(false);
    }
  };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center bg-void px-5 py-24 font-sans">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_40%,rgba(255,77,28,0.10),transparent_70%)]" />
      <form onSubmit={submit} className="glass-solid relative w-full max-w-sm rounded-[20px] p-7 sm:p-9" aria-label="Vault sign-in">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ember/40 text-ember">
          <Lock className="h-4 w-4" aria-hidden />
        </span>
        <p className="mt-6 font-mono text-[10px] tracking-[0.3em] text-ash">ALCHEMY LABS · PRIVATE</p>
        <h1 className="mt-3 font-headline text-3xl font-bold tracking-[-0.03em] text-bone">
          The <span className="font-playfair font-normal italic">vault</span>
        </h1>
        <label htmlFor="v-user" className="mt-8 block font-mono text-[10px] tracking-[0.2em] text-bone/55">USERNAME</label>
        <input id="v-user" autoComplete="username" required value={username} onChange={(e) => setUsername(e.target.value)} className={field} />
        <label htmlFor="v-pass" className="mt-5 block font-mono text-[10px] tracking-[0.2em] text-bone/55">PASSWORD</label>
        <input id="v-pass" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
        {error && <p role="alert" className="mt-4 text-sm text-ember">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ember font-semibold text-void transition-colors hover:bg-amber disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
          {busy ? 'Opening' : 'Open the vault'}
        </button>
      </form>
    </main>
  );
}
