import { LegalLayout, type Section } from '@/views/PrivacyPage';

const EMAIL = 'alchemylabs.work@gmail.com';

const sections: Section[] = [
  {
    id: 'agreement',
    title: 'Agreement',
    body: (
      <p>
        These terms cover your use of this site and any work you engage Alchemy Labs, Mumbai, India, to do. By
        using the site or confirming an engagement, you accept them. A signed proposal overrides these terms where
        the two differ.
      </p>
    ),
  },
  {
    id: 'scope',
    title: 'Scope and pricing',
    body: (
      <p>
        We work on fixed-scope engagements. Each is quoted per project, or priced per a printed offer on this
        site. The scope we agree in writing defines the deliverables. Work outside it is quoted separately.
      </p>
    ),
  },
  {
    id: 'payment',
    title: 'Payment and start date',
    body: (
      <>
        <p>
          Payment is due before work starts. We confirm the start date in writing once payment clears. Payments
          are made by UPI or, once live, card checkout through Shopify. We never collect card or bank details on
          this site.
        </p>
        <p>Fees paid for work already started are not refundable unless we agree otherwise in writing.</p>
      </>
    ),
  },
  {
    id: 'ip',
    title: 'Ownership',
    body: (
      <ul>
        <li>
          <strong>Deliverables.</strong> Intellectual property in final deliverables transfers to you on full
          payment.
        </li>
        <li>
          <strong>Your materials.</strong> You keep ownership of what you give us. You grant us a licence to use it
          only to deliver the engagement, and confirm you have the right to share it.
        </li>
        <li>
          <strong>Our tools.</strong> Our methods, templates and unused concepts stay ours. We may show finished work
          in our portfolio unless you ask us not to.
        </li>
      </ul>
    ),
  },
  {
    id: 'revisions',
    title: 'Revisions',
    body: (
      <p>
        Each scope states its revision rounds. Further revisions, or changes to an approved direction, are quoted
        as extra work.
      </p>
    ),
  },
  {
    id: 'outcomes',
    title: 'No guaranteed outcomes',
    body: (
      <p>
        We deliver the agreed work with care. We do not guarantee business results such as sales, reach, rankings
        or revenue. Those depend on factors outside our control.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    body: (
      <p>
        To the extent the law allows, our total liability for any engagement is limited to the fees you paid for
        it. We are not liable for indirect or consequential loss, including lost profits or data. The site is
        provided as is.
      </p>
    ),
  },
  {
    id: 'law',
    title: 'Governing law',
    body: <p>These terms are governed by the laws of India. The courts of Mumbai have exclusive jurisdiction.</p>,
  },
  {
    id: 'changes',
    title: 'Changes',
    body: (
      <p>
        We may update these terms and will change the date at the top when we do. Engagements already confirmed
        keep the terms in force when they were agreed.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    body: (
      <p>
        Questions go to{' '}
        <a href={`mailto:${EMAIL}`} className="text-ember underline underline-offset-4 decoration-ember/40 hover:decoration-ember">
          {EMAIL}
        </a>
        .
      </p>
    ),
  },
];

const TermsPage = () => (
  <LegalLayout label="Legal" lead="Terms, kept" em="simple" updated="20 September 2026" sections={sections} />
);

export default TermsPage;
