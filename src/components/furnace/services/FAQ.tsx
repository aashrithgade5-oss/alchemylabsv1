'use client';

import { faqs } from './faqs';

/**
 * Native details/summary accordion. The FAQPage JSON-LD mirroring these
 * strings lives in app/services/page.tsx, fed from the same faqs array.
 */
export function FAQ() {
  return (
    <section className="relative bg-void">
      <div className="mx-auto max-w-3xl px-6 py-24 md:px-12 md:py-32">
        <h2 className="font-sans text-4xl font-bold text-bone md:text-5xl">
          Asked before you ask.
        </h2>
        <div className="mt-12">
          {faqs.map((item) => (
            <details key={item.q} className="group border-t border-line py-6 last:border-b">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-lg font-bold text-bone transition-colors duration-300 group-hover:text-ember md:text-xl">
                  {item.q}
                </h3>
                <span
                  aria-hidden
                  className="font-mono text-lg text-ash transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ash">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
