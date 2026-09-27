'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Contact } from '@/components/Contact';
import { HomeAtmosphere } from '@/components/furnace/home/HomeAtmosphere';
import { AmbientVideo } from '@/components/furnace/home/AmbientVideo';
import { GlassPanel } from '@/components/furnace/GlassPanel';
import { KineticHeadline } from '@/components/furnace/KineticHeadline';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const trust = ['NDA AVAILABLE', '30-MIN STRATEGY CALL', 'EMAIL OR WHATSAPP'];

export const ContactPage = () => {
  // R-P5: scroll-driven scale on the form-section backdrop image — the old
  // static scale-110 becomes 1.1→1.22 as the section traverses the viewport.
  const formSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: formSectionRef,
    offset: ['start end', 'end start'],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.22]);

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
          className="mx-auto mt-7 justify-center font-headline text-[clamp(3rem,7vw,7rem)] font-black leading-[1.02] tracking-[-0.04em] text-bone"
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
              className="liquid-glass rounded-full px-4 py-1.5 font-mono text-[10px] tracking-[0.2em] text-bone/60"
            >
              {text}
            </span>
          ))}
        </m.div>
        </div>
      </section>

      {/* The form, in glass — bleed background restored from the last
          pre-Next.js ContactPage.tsx (commit 8599310): contact-bg.png,
          radial-masked so it fades before the edges rather than hard-cutting */}
      <section ref={formSectionRef} className="relative px-4 pb-28 md:px-6 md:pb-40">
        <div
          aria-hidden
          className="absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 20%, transparent 75%)',
            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 40%, black 20%, transparent 75%)',
          }}
        >
          <m.div className="absolute inset-0" style={{ scale: bgScale }}>
            <Image src="/media/mb-slat-corridor.webp" alt="" fill sizes="100vw" className="object-cover object-right opacity-50" />
          </m.div>
        </div>
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease }}
          className="mx-auto max-w-5xl"
        >
          <GlassPanel refract>
            <Contact />
          </GlassPanel>
        </m.div>
      </section>

    </main>
  );
};

export default ContactPage;
