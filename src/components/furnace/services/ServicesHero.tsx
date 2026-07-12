'use client';

import Image from 'next/image';
import { m } from 'framer-motion';
import { KineticHeadline } from '../KineticHeadline';
import { CapacityTag } from '../CapacityTag';

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-void">
      {/* dimmed still, fading into void before the pillars */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/media/b2-bomber-3.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.55) 55%, rgba(10,9,8,1) 100%)',
          }}
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-48 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]">
          SERVICES · SCOPED PER PROJECT
        </p>
        <KineticHeadline
          text="Three ways in."
          className="mt-7 max-w-4xl font-sans text-6xl font-bold leading-[1.02] tracking-tight text-bone md:text-8xl"
          delay={0.15}
        />
        <m.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg"
        >
          Every engagement is scoped per project and held to one standard. Printed prices live on
          the five fixed offers below.
        </m.p>
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10"
        >
          <CapacityTag />
        </m.div>
      </div>
    </section>
  );
}
