// Detail-page copy for the twelve pillar offers (/services/studio/<slug>).
// Restrained and factual: no clients, metrics, or guarantees. Timelines come
// from pillars.ts; everything else is scope description only.

import { pillars, offerSlug, type Offer, type Pillar } from './pillars';

export interface OfferDetail {
  what: string;
  deliverables: string[];
  forWho: string;
  notFor: string;
  faqs: { q: string; a: string }[];
}

type Step = { title: string; body: string };

// Process is the same shape within a pillar; each offer page shows its pillar's.
export const processByPillar: Record<Pillar['slug'], Step[]> = {
  ai: [
    { title: 'Brief', body: 'One conversation on the goal, audience, and references. Scope and timeline confirmed in writing.' },
    { title: 'Direction', body: 'A written treatment and look frames for approval before production starts.' },
    { title: 'Production', body: 'Generation, selection, edit, and grade, with a review round at the agreed checkpoint.' },
    { title: 'Delivery', body: 'Final files in the formats and ratios agreed at the brief, plus source selects.' },
  ],
  brand: [
    { title: 'Discovery', body: 'A working session on the business, the market, and what the current brand gets wrong.' },
    { title: 'Direction', body: 'Two or three routes presented with reasoning. You choose one to develop.' },
    { title: 'Build', body: 'The chosen route developed into a complete system, with a review round.' },
    { title: 'Handover', body: 'Files, rules, and a walkthrough so your team can use it without us.' },
  ],
  advisory: [
    { title: 'Intake', body: 'A short questionnaire and access to the material that matters.' },
    { title: 'Review', body: 'We study the business as it runs today, not as the deck describes it.' },
    { title: 'Findings', body: 'A working session to walk through what we found and why.' },
    { title: 'Plan', body: 'A written document with priorities, owners, and sequence.' },
  ],
};

export const offerDetails: Record<string, OfferDetail> = {
  'campaign-sprint': {
    what: 'A compact campaign produced in one focused run: one hero asset, the statics and cutdowns around it, and a map for how it rolls out across your channels.',
    deliverables: ['One hero film or key visual', 'Static set sized for your channels', 'Short cutdowns of the hero', 'Rollout map: what goes where, in what order'],
    forWho: 'Brands with a launch, drop, or moment on the calendar and a clear message to carry.',
    notFor: 'Teams still deciding what the product or message is. Start with the Narrative System or an audit.',
    faqs: [
      { q: 'What do you need from us?', a: 'The brief, any brand assets you already have, and one decision maker available for the review round.' },
      { q: 'Can the timeline move?', a: 'The range depends on scope. The exact date is confirmed in writing before work starts.' },
    ],
  },
  'cinematic-film': {
    what: 'A 45 to 90 second founder or product film made through an AI pipeline under human direction, with the social cutdowns and hook variations that let it travel.',
    deliverables: ['One 45 to 90 second film', 'Social cutdowns in vertical and square', 'Opening hook variations for testing', 'Script and treatment document'],
    forWho: 'Founders and product teams who need one film that explains the thing and sets the tone.',
    notFor: 'Live-action shoots with crew and talent on set. This work is produced in the pipeline.',
    faqs: [
      { q: 'Can you use our existing footage?', a: 'Yes. Existing footage, product shots, and brand assets can be brought into the edit.' },
      { q: 'Who writes the script?', a: 'We draft it from the brief and revise it with you before production starts.' },
    ],
  },
  'ai-production': {
    what: 'Campaign-grade stills and motion produced at volume, all held to one creative direction so the set reads as a single body of work.',
    deliverables: ['An agreed volume of finished stills', 'Short motion pieces from the same direction', 'A written look standard for the set', 'Organized, named delivery files'],
    forWho: 'Brands that need a steady supply of on-brand imagery for campaigns, ecommerce, or social.',
    notFor: 'One-off single images. The Sample Reel or a Campaign Sprint fits better.',
    faqs: [
      { q: 'How many assets are included?', a: 'Volume is set per project at the brief, based on formats and use.' },
      { q: 'Who owns the output?', a: 'Usage terms are written into the agreement before work starts.' },
    ],
  },
  'content-engine': {
    what: 'The system behind consistent output: a documented workflow, a prompt library tuned to your brand, and a content calendar your team can run. Monthly continuation is available.',
    deliverables: ['Documented production workflow', 'Prompt library tuned to your brand', 'Content calendar template and first cycle', 'Handover session with your team'],
    forWho: 'Teams producing content every week who want it to look like one brand, not many hands.',
    notFor: 'Brands without a settled visual identity yet. Fix the identity first.',
    faqs: [
      { q: 'Does our team need AI experience?', a: 'No. The workflow is written for the people who will run it, and the handover covers the tools.' },
      { q: 'What does monthly continuation include?', a: 'It is scoped separately once the engine is running, based on what your team wants to hand off.' },
    ],
  },
  'identity-system': {
    what: 'A complete identity built digital first: logo suite, typography, color logic, and the usage rules that keep it consistent wherever it appears.',
    deliverables: ['Primary logo and lockups', 'Typography system', 'Color palette with usage logic', 'Usage guide and export files'],
    forWho: 'New brands, or established ones whose identity no longer matches the business.',
    notFor: 'Small corrections to a mark you want to keep. Logo Rescue covers that.',
    faqs: [
      { q: 'How many logo routes do we see?', a: 'Two or three routes at the direction stage. One is developed into the full system.' },
      { q: 'Do we get source files?', a: 'Yes. Vector sources and export sets are part of the handover.' },
    ],
  },
  'brand-world': {
    what: 'The visual universe around the mark: direction boards, an imagery style, and composition rules that make every asset look like it came from the same place.',
    deliverables: ['Visual direction boards', 'Imagery and art direction style', 'Composition and layout rules', 'Reference asset set'],
    forWho: 'Brands with a mark in place that still look inconsistent across campaigns and channels.',
    notFor: 'Brands without a mark. Start with the Identity System or Branding 360.',
    faqs: [
      { q: 'Does this include a logo?', a: 'No. It builds around the mark you have. Branding 360 combines both.' },
      { q: 'Can agencies we hire use it?', a: 'Yes. The rules are written so any designer or agency can follow them.' },
    ],
  },
  'narrative-system': {
    what: 'Positioning, origin story, and a messaging hierarchy that keeps one voice across your site, decks, and campaigns.',
    deliverables: ['Positioning statement', 'Origin story', 'Messaging hierarchy', 'Voice and tone guide with examples'],
    forWho: 'Founders who can explain the business in person but not yet on the page.',
    notFor: 'Teams looking only for ad copy or a single campaign line.',
    faqs: [
      { q: 'Do you interview our team?', a: 'Yes. The discovery session includes the founders and anyone who talks to customers.' },
      { q: 'Does it include website copy?', a: 'The system gives your site its structure and voice. Full page copy can be scoped separately.' },
    ],
  },
  'branding-360': {
    what: 'Identity, narrative, and visual direction sequenced into one engagement, so the brand launches as a single, coherent system.',
    deliverables: ['Identity system', 'Narrative system', 'Visual direction and imagery style', 'Launch asset starter set'],
    forWho: 'New ventures or full rebrands that want the whole brand built together, in order.',
    notFor: 'Brands that need only one layer fixed. Pick the single offer instead.',
    faqs: [
      { q: 'Why one engagement instead of three?', a: 'Each layer informs the next. Sequencing them avoids rework between separate projects.' },
      { q: 'Can we pause between stages?', a: 'Yes, if agreed at scoping. The timeline is confirmed in writing before work starts.' },
    ],
  },
  'ai-leverage-audit': {
    what: 'A review of your operation to find each point where AI can realistically save time or create revenue, ranked by expected return and effort.',
    deliverables: ['Map of current workflows reviewed', 'Ranked list of AI opportunities', 'Effort and risk notes for each', 'Recommended first three moves'],
    forWho: 'Operators who suspect AI can help but want a sober, ranked view before spending.',
    notFor: 'Teams that want software built. This audit recommends; implementation is scoped separately.',
    faqs: [
      { q: 'Do you need access to our systems?', a: 'Only what is needed to understand the workflow. Access is agreed at intake.' },
      { q: 'Will you recommend specific tools?', a: 'Where a tool fits, yes, with the reasoning and the trade-offs.' },
    ],
  },
  'precision-audit': {
    what: 'One recorded strategy session on the question that matters most right now, followed by a priority map and concrete next steps.',
    deliverables: ['One recorded working session', 'Priority map', 'Written next steps'],
    forWho: 'Founders facing one specific decision who want an outside read quickly.',
    notFor: 'Problems that need weeks of research. Strategy Build is the better fit.',
    faqs: [
      { q: 'How do we prepare?', a: 'Send the question and relevant material ahead of the session so the time goes to answers.' },
      { q: 'Do we keep the recording?', a: 'Yes. The recording and written notes are yours.' },
    ],
  },
  'strategy-build': {
    what: 'A roadmap that turns a direction into an executable sequence: priorities, order of moves, and what each depends on.',
    deliverables: ['Strategic roadmap document', 'Prioritized initiative list', 'Sequencing and dependencies', 'Review session with leadership'],
    forWho: 'Teams with a clear ambition and too many possible next steps.',
    notFor: 'Teams that need hands-on execution rather than a plan.',
    faqs: [
      { q: 'Who should be involved?', a: 'The people who will own the plan. We keep the group small.' },
      { q: 'What happens after the roadmap?', a: 'Your team runs it. Follow-up support can be scoped if you want it.' },
    ],
  },
  'full-system-simulation': {
    what: 'A complete blueprint across brand, marketing, and operations, stress-tested on paper before you commit budget to scale.',
    deliverables: ['Brand and positioning review', 'Marketing system blueprint', 'Operations and workflow blueprint', 'Scenario notes and risk register'],
    forWho: 'Businesses preparing to scale, raise, or enter a new market.',
    notFor: 'Early ideas without a working product or customers yet.',
    faqs: [
      { q: 'Why simulate before scaling?', a: 'Gaps are cheaper to find in a document than in a live launch.' },
      { q: 'Is this a financial model?', a: 'No. It covers brand, marketing, and operations. Financial modelling stays with your finance advisers.' },
    ],
  },
};

export interface OfferEntry {
  slug: string;
  offer: Offer;
  pillar: Pillar;
  detail: OfferDetail;
}

export const allOffers: OfferEntry[] = pillars.flatMap((pillar) =>
  pillar.offers.map((offer) => {
    const slug = offerSlug(offer.name);
    return { slug, offer, pillar, detail: offerDetails[slug] };
  }),
);

export const findOffer = (slug: string) => allOffers.find((o) => o.slug === slug);
