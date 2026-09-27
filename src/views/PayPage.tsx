'use client';

import { m } from 'framer-motion';
import Link from 'next/link';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';
import { GlassPanel } from '@/components/furnace/GlassPanel';
import { UpiPay } from '@/components/furnace/UpiPay';
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '@lib/payments';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** The link a client receives with an invoice: one panel, every rail. */
export default function PayPage() {
  return (
    <main className="relative font-sans">
      <HomeAtmosphere />
      <section className="relative px-4 pb-28 pt-36 md:px-6 md:pt-44">
        <div className="mx-auto max-w-md text-center">
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-mono text-[10px] tracking-[0.3em] text-bone/70"
          >
            ALREADY SCOPED WITH US
          </m.p>
          <m.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-5 font-headline text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.035em] text-bone"
          >
            <span className="glass-type">Pay an agreed </span>
            <span className="font-playfair font-normal italic">invoice</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-base leading-relaxed text-ash"
          >
            Enter the amount on your invoice. Every rail below lands in the same account.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="mx-auto mt-10 max-w-md"
        >
          <GlassPanel solid className="px-5 py-7 sm:px-8 sm:py-9">
            <UpiPay note="Alchemy Labs invoice" />
          </GlassPanel>
        </m.div>

        <div className="mx-auto mt-10 max-w-md text-center text-sm leading-relaxed text-ash">
          <p>Once paid, send the receipt and we confirm the start date in writing.</p>
          <p className="mt-3 flex flex-col items-center font-mono text-xs tracking-wider">
            <a href={`mailto:${CONTACT_EMAIL}?subject=Payment receipt`} className="inline-flex min-h-[44px] items-center text-bone underline decoration-ember/50 underline-offset-4 hover:decoration-ember">
              {CONTACT_EMAIL}
            </a>
            <a href={whatsappLink('Paid my Alchemy Labs invoice. Receipt attached.')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center text-bone underline decoration-ember/50 underline-offset-4 hover:decoration-ember">
              WhatsApp · {WHATSAPP_DISPLAY}
            </a>
          </p>
          <Link href="/contact" className="mt-8 inline-flex min-h-[44px] items-center font-mono text-[10px] tracking-[0.25em] text-bone/50 hover:text-bone">
            NOT SCOPED YET? START HERE
          </Link>
        </div>
      </section>
    </main>
  );
}
