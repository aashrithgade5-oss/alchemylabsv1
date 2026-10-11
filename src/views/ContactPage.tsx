'use client';

import { useRef, type ReactNode } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Contact } from '@/components/Contact';
import { ArtPicture } from '@/components/furnace/ArtPicture';
import { KineticHeadline } from '@/components/furnace/KineticHeadline';
import { EmberField } from '@/components/fx/EmberField';
import { LiquidMark } from '@/components/fx/LiquidMark';
import {
  GlyphArrow,
  GlyphAudit,
  GlyphBrief,
  GlyphBuild,
  GlyphCall,
  GlyphGlobe,
  GlyphMessage,
  GlyphScope,
  GlyphShield,
} from '@/components/brand/Glyphs';
import { CONTACT_LOUNGE } from '@lib/hf';
import { EASE } from '@lib/motion';

const WHATSAPP_ESTIMATE = `https://wa.me/917794912315?text=${encodeURIComponent(
  'Hi Alchemy Labs, I would like a rough estimate. The brand: ',
)}`;

const trust = [
  { Icon: GlyphShield, text: 'NDA AVAILABLE' },
  { Icon: GlyphCall, text: '30-MIN STRATEGY CALL' },
  { Icon: GlyphGlobe, text: 'WORKING WORLDWIDE' },
];

const NEXT = [
  { Icon: GlyphCall, n: '01', title: 'A first conversation', body: 'A call or a brief. You tell us where the brand stands and where it has to go.' },
  { Icon: GlyphAudit, n: '02', title: 'The audit', body: 'We read the brand before we touch it, and tell you plainly what it needs and what it does not.' },
  { Icon: GlyphScope, n: '03', title: 'A written scope', body: 'One page: what we make, how long it takes, what it costs. Nothing starts until you agree to it.' },
  { Icon: GlyphBuild, n: '04', title: 'The build', body: 'Strategy, identity, campaign or film, made wide and cut down by judgment, reviewed with you at each stage.' },
];

// The three ways in, ranked by what most founders actually want first.
function Path({
  Icon,
  eyebrow,
  title,
  note,
  onClick,
  href,
  primary = false,
}: {
  Icon: typeof GlyphCall;
  eyebrow: string;
  title: ReactNode;
  note: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
}) {
  const cls = `group relative flex min-h-[156px] flex-col justify-between overflow-hidden rounded-[20px] border p-5 text-left transition-[border-color,transform,background-color] duration-500 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember md:p-6 ${
    primary
      ? 'border-ember/40 bg-[linear-gradient(150deg,rgba(255,77,28,0.16),rgba(10,9,8,0.4)_60%)] hover:border-ember/70'
      : 'border-bone/12 bg-void/50 hover:border-bone/30 hover:bg-void/70'
  }`;
  const inner = (
    <>
      <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-bone/40 to-transparent" />
      <span className="flex items-start justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full border ${primary ? 'border-ember/50 text-ember' : 'border-bone/15 text-bone/80'}`}>
          <Icon size={20} />
        </span>
        <GlyphArrow size={16} className="text-bone/35 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />
      </span>
      <span className="mt-6 block">
        <span className="block font-mono text-[10px] tracking-[0.25em] text-bone/50">{eyebrow}</span>
        <span className="mt-2 block font-headline text-xl font-bold tracking-[-0.02em] text-bone md:text-[1.375rem]">{title}</span>
        <span className="mt-1.5 block text-sm leading-relaxed text-bone/55">{note}</span>
      </span>
    </>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/**
 * /contact (Patches-6): the 404's brutalist calm applied to the page that
 * earns the money. A moving ember field and the liquid mark (the same pairing
 * as the 404), three clear ways in, what happens after you reach
 * out, then the brief over the recreated conversation room with parallax.
 */
export const ContactPage = () => {
  const formSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: formSectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.14, 1.04]);

  const book = () => window.dispatchEvent(new Event('alchemy:book'));
  const toBrief = () => document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main className="relative bg-void font-sans">
      {/* HERO: brutalist minimal, like the 404 */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-14 pt-36 md:px-10 md:pb-20">
        <EmberField preset="dusk" mask="fade" opacity={0.85} />
        <div aria-hidden className="contact-hero-grid absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="flex items-start justify-between gap-6">
            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-mono text-[10px] tracking-[0.3em] text-bone/70 md:text-[11px]"
            >
              CONTACT · START HERE
            </m.p>
            <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.3, ease: EASE.out }}>
              <LiquidMark size={88} className="-mt-4 md:-mt-6" />
            </m.div>
          </div>
          <KineticHeadline
            as="h1"
            text="Start the work."
            className="mt-6 font-headline text-[clamp(3.5rem,11vw,11rem)] font-black leading-[0.9] tracking-[-0.055em] text-bone"
            wordClassName="glass-type"
            delay={0.2}
          />
          <m.p
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.6, ease: EASE.out }}
            className="mt-6 max-w-xl font-playfair text-xl italic text-bone/75 md:text-2xl"
          >
            The first conversation is the audit.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: EASE.out }}
            className="mt-12 grid gap-3 md:grid-cols-3 md:gap-4"
          >
            <Path primary Icon={GlyphCall} eyebrow="30 MIN · VIDEO" title={<>Book a <span className="font-playfair font-normal italic">call</span></>} note="Pick a slot that suits you. Best if you want answers now." onClick={book} />
            <Path Icon={GlyphBrief} eyebrow="5 MIN · WRITTEN" title="Send a brief" note="Tell us the brand, the goal and the timing. Both founders read it." onClick={toBrief} />
            <Path Icon={GlyphMessage} eyebrow="WHATSAPP" title="Text for a rough estimate" note="A ballpark before you commit to a call." href={WHATSAPP_ESTIMATE} />
          </m.div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-bone/10 pt-6">
            {trust.map(({ Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-bone/55">
                <Icon size={14} className="text-ember/80" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT: removes the guesswork that stops a founder from writing */}
      <section className="relative border-t border-bone/10 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-headline text-[clamp(2rem,4.4vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.035em] text-bone">
              <span className="glass-type">What happens </span>
              <span className="font-playfair font-normal italic">next</span>
              <span className="glass-type">.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-bone/55">You see a written scope before anything is made, and nothing starts until you agree to it.</p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-bone/10 bg-bone/10 md:grid-cols-4">
            {NEXT.map(({ Icon, n, title, body }, i) => (
              <m.li
                key={n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: EASE.out }}
                className="relative flex flex-col bg-void p-6 md:min-h-[17rem] md:p-7"
              >
                <span className="flex items-center justify-between">
                  <Icon size={26} className="text-ember" />
                  <span className="font-mono text-[10px] tracking-[0.3em] text-bone/35">{n}</span>
                </span>
                <span className="mt-10 font-headline text-lg font-bold tracking-[-0.02em] text-bone md:mt-20">{title}</span>
                <span className="mt-2 text-sm leading-relaxed text-bone/55">{body}</span>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* THE BRIEF over the conversation room: two chairs, one table, waiting */}
      <section ref={formSectionRef} className="relative overflow-hidden px-4 py-28 md:px-6 md:py-40">
        <div aria-hidden className="section-feather absolute inset-0 overflow-hidden">
          <m.div className="absolute inset-0 will-change-transform" style={{ y: bgY, scale: bgScale }}>
            <ArtPicture wide={CONTACT_LOUNGE.wide} tall={CONTACT_LOUNGE.tall} priority={false} quality={85} className="object-[50%_60%] opacity-75" />
          </m.div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(10,9,8,0.72),rgba(10,9,8,0.35)_70%,rgba(10,9,8,0.6)_100%)]" />
        </div>
        <m.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE.out }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="gloss-card">
            <div className="gloss-card__body">
              <Contact />
            </div>
          </div>
        </m.div>
      </section>
    </main>
  );
};

export default ContactPage;
