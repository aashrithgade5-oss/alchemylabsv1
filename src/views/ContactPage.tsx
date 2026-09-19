'use client';

import { m } from 'framer-motion';
import { Contact } from '@/components/Contact';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';
import { AmbientVideo } from '@/components/furnace/home/AmbientVideo';
import { KineticHeadline } from '@/components/furnace/KineticHeadline';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const trust = ['24H RESPONSE', 'NDA AVAILABLE', 'FREE FIRST CALL'];

export const ContactPage = () => {
  return (
    <main className="relative font-sans">
      <HomeAtmosphere />

      {/* Centered header: oversized Inter, one Playfair italic line */}
      <section className="relative px-6 pb-16 pt-40 text-center md:pt-48">
        {/* running silhouettes, dissolving into void before the form */}
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
          }}
        >
          <AmbientVideo
            src="/media/red-slats-tall.mp4"
            poster="/media/red-slats-tall-poster.jpg"
            className="h-full w-full object-cover opacity-25"
          />
        </div>
        <div className="relative">
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]"
        >
          CONTACT · MUMBAI · WORLDWIDE
        </m.p>
        <KineticHeadline
          as="h1"
          text="Start the work."
          className="mx-auto mt-7 justify-center type-display text-[clamp(3rem,7vw,7rem)] text-bone"
          wordClassName="glass-type"
          delay={0.2}
        />
        <m.p
          initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.7, ease }}
          className="mx-auto mt-7 max-w-xl font-playfair text-xl italic text-bone/75 md:text-2xl"
        >
          The first conversation is the audit.
        </m.p>
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {trust.map((text) => (
            <span
              key={text}
              className="rounded-full border border-bone/10 px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-bone/60"
            >
              {text}
            </span>
          ))}
        </m.div>
        </div>
      </section>

      <Contact />
    </main>
  );
};

export default ContactPage;
