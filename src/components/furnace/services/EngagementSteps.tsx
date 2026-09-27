'use client';

import { m } from 'framer-motion';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps = [
  { title: 'Scope', body: 'One conversation to define the problem, the deliverable and the timeline.' },
  { title: 'Confirm', body: 'Scope, price and dates confirmed in writing before any work starts.' },
  { title: 'Build and hand over', body: 'Directed by hand, reviewed with you, delivered with the files you own.' },
];

/** "How engagements work": the three steps between first call and hand-over. */
export function EngagementSteps() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ash">HOW ENGAGEMENTS WORK</p>
        <h2 className="mt-5 font-headline text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-bone [text-wrap:balance]">
          <span className="glass-type">Three steps, no </span>
          <span className="font-playfair font-normal italic">guesswork</span>
          <span className="glass-type">.</span>
        </h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <m.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className="glass-solid rounded-2xl p-7"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] text-ember">0{i + 1}</p>
              <h3 className="mt-3 font-sans text-xl font-bold text-bone [text-wrap:balance]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ash [text-wrap:pretty]">{s.body}</p>
            </m.li>
          ))}
        </ol>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash [text-wrap:pretty]">
          Focused offers start from a set point and are scoped in one short conversation.
        </p>
      </div>
    </section>
  );
}
