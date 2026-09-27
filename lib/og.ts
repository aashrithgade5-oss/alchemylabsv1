// Per-page share cards (Patches-4): 1200x630 JPEGs rendered from each page's
// own hero (brand type, atom mark, ember rule), hosted on the Higgsfield CDN.
// Keys: page slug, `offer-<studio offer slug>`, `product-<product id>`.
const UP = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3FUhukBmQOQ2FavgLXr2fi3ujjI';
export const OG_CARDS: Record<string, string> = {
  'home': `${UP}/ad5d6be4-625b-46d4-b6ff-23d6df7a68aa.jpg`,
  'about': `${UP}/4b7d7cf7-3fcc-4dbd-8e66-8b42af5aa04b.jpg`,
  'services': `${UP}/7b691499-950c-4cfa-ae81-269c41b689d4.jpg`,
  'work': `${UP}/17cad624-3bd4-46fe-ba36-701f880b8e3e.jpg`,
  'contact': `${UP}/83e28b20-167a-43f9-b3f9-8fdbc1397ffd.jpg`,
  'pay': `${UP}/095d8f25-b7cc-4010-b461-8f3b90d3d8e7.jpg`,
  'journal': `${UP}/1ab5ac98-65ab-483d-b857-683bef9b51b9.jpg`,
  'aashrith': `${UP}/29cb819f-a982-4bae-bd4e-d4935a270f84.jpg`,
  'eva': `${UP}/69454c0f-661b-42af-9d3d-26bb8f080d18.jpg`,
  'offer-campaign-sprint': `${UP}/4e39dc8d-e52f-478c-9f9b-57279ca390d1.jpg`,
  'offer-cinematic-film': `${UP}/e8f429fb-d101-426b-8cfe-778b7f89957e.jpg`,
  'offer-ai-production': `${UP}/b980f3e2-b803-4ce4-af57-f984a91625a3.jpg`,
  'offer-content-engine': `${UP}/6669298a-56c7-4872-873e-cb1a14f93275.jpg`,
  'offer-identity-system': `${UP}/007cc091-0833-4313-bae9-8d49dc590759.jpg`,
  'offer-brand-world': `${UP}/9b90f876-9195-445e-b7ac-6d7529a2e02a.jpg`,
  'offer-narrative-system': `${UP}/86a7e7a6-d49b-46a1-9ce2-0d04f7152b72.jpg`,
  'offer-branding-360': `${UP}/20f4f4dc-6196-469c-974d-dcd2d2da3657.jpg`,
  'offer-ai-leverage-audit': `${UP}/9a3f39a1-6bc5-41a0-888c-5a0ea833ba0b.jpg`,
  'offer-precision-audit': `${UP}/dbf0123b-4a4e-494d-aefa-6a232bd20d6a.jpg`,
  'offer-strategy-build': `${UP}/8504e908-cb27-429b-998b-75ab4eed0458.jpg`,
  'offer-full-system-simulation': `${UP}/9fae314e-c93b-44e5-aa78-8fc5251876c3.jpg`,
  'product-brand-glow-up-audit': `${UP}/13bfe354-a310-4c31-99cf-f417f6a00b8d.jpg`,
  'product-website-teardown': `${UP}/e017f713-32a5-401e-9142-fc005bc5ea49.jpg`,
  'product-sample-reel': `${UP}/c579f2ba-b8fb-4ac7-bb2f-421d99e4736b.jpg`,
  'product-logo-rescue': `${UP}/fbeda9c5-9126-4c20-b8b5-e047bbc90ac8.jpg`,
  'product-instagram-aesthetic-audit': `${UP}/a491a515-f119-4741-99c5-286f86d3f5af.jpg`,
};

export const ogCard = (key: string) => OG_CARDS[key] ?? OG_CARDS.home;
