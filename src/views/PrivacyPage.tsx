import type { ReactNode } from 'react';

type Section = { id: string; title: string; body: ReactNode };

const EMAIL = 'alchemylabs.work@gmail.com';
const Mail = () => (
  <a href={`mailto:${EMAIL}`} className="text-ember underline underline-offset-4 decoration-ember/40 hover:decoration-ember">
    {EMAIL}
  </a>
);

const sections: Section[] = [
  {
    id: 'who',
    title: 'Who we are',
    body: (
      <p>
        Alchemy Labs is an AI brand studio based in Mumbai, India. We run this site and decide how the
        information described here is used. Questions go to <Mail />.
      </p>
    ),
  },
  {
    id: 'collect',
    title: 'What we collect',
    body: (
      <>
        <p>We collect only what the site needs to work. Nothing else.</p>
        <ul>
          <li>
            <strong>Contact form.</strong> Your name, email and message, plus your company and chosen service if you give them.
            It is checked by our server, stored in our database and emailed to us. We also send you one
            confirmation email.
          </li>
          <li>
            <strong>Bot check.</strong> Cloudflare Turnstile runs on the contact form to stop spam. Cloudflare
            processes technical signals from your browser to do this.
          </li>
          <li>
            <strong>Page-view counter.</strong> Only if you accept on the consent banner. We record the page path,
            the site you came from (host name only) and the time. No IP address, no cookies, no user agent.
          </li>
          <li>
            <strong>Performance data.</strong> Vercel Speed Insights measures page load speed. It reports
            anonymous performance metrics, not who you are.
          </li>
          <li>
            <strong>Booking.</strong> Calendly is embedded for calls. What you type there goes to Calendly under
            its own policy.
          </li>
          <li>
            <strong>Payments.</strong> UPI payments open your own UPI app. Card checkout, when live, runs on
            Shopify. This site never sees or stores card or bank details.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'device',
    title: 'Stored on your device',
    body: (
      <>
        <p>We use your browser&apos;s local storage, not tracking cookies. These keys stay on your device:</p>
        <ul>
          <li><code>alchemy-cookie-consent</code> remembers that you accepted.</li>
          <li><code>alchemy-cookies-declined</code> remembers that you declined.</li>
          <li><code>alchemy-device-profile</code> caches a performance tier so animations suit your device. Set only after you accept.</li>
          <li><code>aashrith-theme</code> remembers light or dark mode on the founder portfolio page.</li>
          <li>Signed-in site administrators also get a Supabase login session key. Visitors never do.</li>
        </ul>
        <p>Clear your browser storage at any time to remove them.</p>
      </>
    ),
  },
  {
    id: 'why',
    title: 'Why and on what basis',
    body: (
      <ul>
        <li><strong>Replying to you.</strong> You asked us to. We use your details to answer and to scope work.</li>
        <li><strong>Page views and device tiering.</strong> Your consent. Decline and neither runs.</li>
        <li><strong>Security and site speed.</strong> Our legitimate interest in a safe, fast site.</li>
        <li><strong>Records.</strong> Legal obligations, such as tax records for paid work.</li>
      </ul>
    ),
  },
  {
    id: 'processors',
    title: 'Who processes it',
    body: (
      <>
        <p>We do not sell your data. We share it only with the services that run the site:</p>
        <ul>
          <li><strong>Supabase</strong> hosts our database and server functions.</li>
          <li><strong>Resend</strong> delivers our emails.</li>
          <li><strong>Cloudflare</strong> runs the Turnstile bot check.</li>
          <li><strong>Vercel</strong> hosts the site and Speed Insights.</li>
          <li><strong>Calendly</strong> handles bookings.</li>
          <li><strong>Shopify</strong> will handle card payments once live.</li>
        </ul>
        <p>Some of these store data outside India. Each is bound by its own terms and security practices.</p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: (
      <ul>
        <li>Contact form submissions: up to 24 months, unless you ask us to delete them sooner.</li>
        <li>Page-view rows hold no personal identifiers. We keep them for as long as they are useful.</li>
        <li>Records for paid work: as long as Indian law requires.</li>
      </ul>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>
          You can ask to access, correct or delete your data, and withdraw consent at any time. India&apos;s
          Digital Personal Data Protection Act, 2023 gives you these rights. If you are in the EU, the GDPR also
          lets you object, restrict processing, request portability and complain to your local authority.
        </p>
        <p>Email <Mail />. We respond as soon as we can.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <p>
        Data travels over HTTPS. The browser cannot write to our contact table directly; only our verified server
        function can. No system is perfectly secure, but we keep access tight.
      </p>
    ),
  },
  {
    id: 'changes',
    title: 'Changes',
    body: <p>If this policy changes, we update this page and the date at the top.</p>,
  },
];

export const LegalLayout = ({
  label,
  lead,
  em,
  updated,
  sections,
}: {
  label: string;
  lead: string;
  em: string;
  updated: string;
  sections: Section[];
}) => (
  <div className="min-h-screen bg-void text-bone">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-12 pt-32 pb-24 lg:grid lg:grid-cols-[13rem_minmax(0,48rem)] lg:gap-16">
      <nav aria-label="On this page" className="hidden lg:block">
        <div className="sticky top-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bone/40 mb-4">On this page</p>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="flex min-h-[44px] items-center text-sm text-bone/60 hover:text-bone transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <main className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember mb-6">{label}</p>
        <h1 className="font-headline font-bold text-4xl md:text-6xl leading-[1.05] mb-6">
          <span className="glass-type">{lead} </span>
          <span className="font-playfair italic font-normal text-ember">{em}</span>
        </h1>
        <p className="font-mono text-xs text-bone/50 mb-16 md:mb-24">Last updated: {updated}</p>

        <div className="space-y-16 md:space-y-20 text-base md:text-lg leading-relaxed text-bone/70 [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_ul+p]:mt-4 [&_ul]:space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:marker:text-ember/60 [&_strong]:font-semibold [&_strong]:text-bone [&_code]:font-mono [&_code]:text-sm [&_code]:text-bone [&_code]:break-all">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-32">
              <p className="font-mono text-xs text-bone/40 mb-3">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="font-headline font-bold text-2xl md:text-3xl text-bone mb-5">{s.title}</h2>
              {s.body}
            </section>
          ))}
        </div>

        <p className="mt-24 pt-8 border-t border-bone/10 font-mono text-xs leading-relaxed text-bone/40">
          This document is a plain-language summary, not legal advice. It should be reviewed by qualified counsel.
        </p>
      </main>
    </div>
  </div>
);

export type { Section };

const PrivacyPage = () => (
  <LegalLayout label="Legal" lead="Privacy," em="plainly" updated="20 September 2026" sections={sections} />
);

export default PrivacyPage;
