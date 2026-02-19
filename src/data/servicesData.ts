import { 
  Brain, Film, Zap, Image, Palette, Fingerprint, BookOpen, Package, 
  Cog, Repeat, Target, Compass, LayoutGrid 
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  category: string;
  tier?: string;
  name: string;
  tagline: string;
  description: string;
  conviction: string;
  deliverables: string[];
  timeline: string;
  pricing: string;
  idealFor: string;
  icon: typeof Brain;
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}

export interface ServiceCategory {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  services: ServiceItem[];
}

// ── 01 AI ADVISORY ──
const aiAdvisory: ServiceItem[] = [
  {
    id: 'ai-leverage-audit',
    category: 'AI Advisory',
    tier: 'Flagship Service',
    name: 'Alchemy AI Leverage Audit™',
    tagline: 'From confusion to competitive advantage — in 7–10 days',
    description: 'Most businesses know AI matters. Few know exactly where it should touch their operations. This is a structured, ruthlessly specific audit of your business model — mapping every viable point where AI creates revenue, speed, or operational lift.',
    conviction: 'We don\'t recommend tools. We architect the system around you — then show you exactly how to run it.',
    deliverables: [
      'AI Opportunity Map — immediate wins to long-term architecture',
      'Revenue-Linked Use Case Blueprint',
      'Prioritized AI Roadmap — ranked by ROI',
      '30–60–90 Day Execution Plan',
      'Implementation Guardrails',
      'Internal Team Alignment Framework',
    ],
    timeline: '7–10 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Founder-led brands, D2C operators, agencies, and growth-stage companies that know AI is non-negotiable.',
    icon: Brain,
    gradientFrom: 'from-blue-500/20',
    gradientVia: 'via-purple-500/20',
    gradientTo: 'to-alchemy-red/20',
  },
];

// ── 02 CAMPAIGN & CREATIVE ──
const campaignCreative: ServiceItem[] = [
  {
    id: 'campaign-sprint',
    category: 'Campaign & Creative',
    tier: 'Speed-First',
    name: 'AI-Powered Campaign Sprint™',
    tagline: 'Full campaign. Cinematic quality. Live in 2–5 days.',
    description: 'Momentum windows don\'t wait. The Campaign Sprint compresses weeks of ideation, production, and rollout into a focused creative burst — not by cutting corners, but by eliminating friction that doesn\'t add value.',
    conviction: 'This is not "content." This is a precision campaign designed to land, convert, and compound.',
    deliverables: [
      'Hero Campaign Asset — film or visual centrepiece',
      'Strategic Creative Direction',
      '6–10 High-Performance Campaign Statics',
      '2–4 Short-Form Cutdowns',
      'Caption & Hook Variations',
      'Multi-Channel Rollout Map',
      'Paid Media-Ready Variations',
    ],
    timeline: '2–5 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Product drops, seasonal launches, funding announcements, festival windows, and fast-moving D2C brands.',
    icon: Zap,
    gradientFrom: 'from-orange-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-pink-500/20',
  },
  {
    id: 'cinematic-film',
    category: 'Campaign & Creative',
    tier: 'Authority Builder',
    name: 'AI Cinematic Film™',
    tagline: 'One film. More trust than months of posts.',
    description: 'In saturated markets, authority isn\'t earned by volume. We craft cinematic founder and brand films that do the one thing most marketing can\'t: they make people feel something.',
    conviction: 'Your brand\'s most powerful first impression — engineered to convert at every stage of the funnel.',
    deliverables: [
      '45–90s Cinematic Founder or Product Film',
      'Narrative Strategy & Story Architecture',
      'Visual World & Tonal Direction',
      'Multiple Social Cutdowns',
      'Hook Variations for paid and organic',
      'Website & Investor Integration Strategy',
      'Platform-Specific Export Suite',
    ],
    timeline: '7–10 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Founder-led brands, scaling companies, premium D2C operators, luxury startups, and investment-stage ventures.',
    icon: Film,
    gradientFrom: 'from-purple-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-pink-500/20',
  },
  {
    id: 'ai-production',
    category: 'Campaign & Creative',
    tier: 'Visual Scale',
    name: 'AI-Infused Production™',
    tagline: 'Campaign-grade visuals at scale. No studio. No delays.',
    description: 'We\'ve rebuilt the production model for your world. This service blends advanced AI image and video generation with senior creative direction to produce high-volume, campaign-grade visuals.',
    conviction: 'AI as amplifier. Not shortcut. Every pixel directed with taste.',
    deliverables: [
      'Campaign-Grade AI Visual Assets',
      'Product & Packaging Renders',
      'Editorial Visual Concepts',
      'Motion Assets & Micro-Films',
      'Creative Direction Framework',
      'Brand-Aligned Style Guardrails',
      'Multi-Platform Export Versions',
    ],
    timeline: '7–14 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Modern brands needing high-volume premium visuals, D2C companies scaling ad creative, startups without physical production.',
    icon: Image,
    gradientFrom: 'from-amber-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-orange-500/20',
  },
];

// ── 03 BRAND SYSTEMS ──
const brandSystems: ServiceItem[] = [
  {
    id: 'brand-world',
    category: 'Brand Systems',
    tier: 'Brand Foundation',
    name: 'Brand World™',
    tagline: 'Most brands have assets. Very few have a world.',
    description: 'What separates category leaders from forgettable competitors isn\'t individual assets — it\'s the coherent visual and emotional universe they operate inside. Brand World™ builds that universe.',
    conviction: 'This is how brands stop looking tactical — and start looking inevitable.',
    deliverables: [
      'Visual Direction Board — imagery, texture, and reference world',
      'Typography-in-Use System',
      'Color Logic & Application Rules',
      'Layout & Composition Framework',
      'AI Imagery Style Guide',
      'Motion & Reel Aesthetic Direction',
      'Do / Don\'t Visual Commandments',
      'Brand Environment Blueprint',
    ],
    timeline: '10–14 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Scaling brands, rebrands, funded startups, founders evolving beyond DIY design.',
    icon: LayoutGrid,
    gradientFrom: 'from-emerald-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-teal-500/20',
  },
  {
    id: 'brand-identity',
    category: 'Brand Systems',
    tier: 'Identity',
    name: 'Brand Identity System™',
    tagline: 'Your logo is the start. Your system is the brand.',
    description: 'A great logo without a system behind it is a beautiful door with no house. We build the complete visual infrastructure — designed for digital-first performance.',
    conviction: 'When your visuals are this aligned, premium perception becomes your default.',
    deliverables: [
      'Primary & Secondary Logo Suite',
      'Brand Marks & Variations',
      'Typography System',
      'Color System with Usage Logic',
      'Social & Digital Application Examples',
      'Visual Consistency Rules',
      'Export-Ready Asset Library',
    ],
    timeline: '7–14 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Early-stage brands launching properly, businesses outgrowing inconsistent visuals.',
    icon: Fingerprint,
    gradientFrom: 'from-cyan-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-blue-500/20',
  },
  {
    id: 'brand-narrative',
    category: 'Brand Systems',
    tier: 'Messaging',
    name: 'Brand Narrative System™',
    tagline: 'If your brand can\'t explain why it matters, it won\'t.',
    description: 'Positioning is the most leveraged work in marketing. The right narrative makes your audience feel like they\'d be missing something by not choosing you.',
    conviction: 'When messaging is this aligned, conversion starts feeling like inevitability.',
    deliverables: [
      'Brand Origin Story',
      'Manifesto & Core Belief System',
      'Messaging Hierarchy',
      'Tone-of-Voice Architecture',
      'Key Phrases & Narrative Angles',
      'Website & Social Messaging Framework',
      'Founder Positioning Guide',
    ],
    timeline: '5–12 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Founder-led brands, companies pivoting direction, businesses whose messaging isn\'t landing.',
    icon: BookOpen,
    gradientFrom: 'from-rose-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-pink-500/20',
  },
  {
    id: 'branding-360',
    category: 'Brand Systems',
    tier: 'Complete Package',
    name: 'Branding 360™',
    tagline: 'Everything you need to launch with authority. Nothing you don\'t.',
    description: 'The Branding 360™ brings together Identity, Narrative, and Visual Direction in a single, sequenced engagement — so everything lands cohesively from day one.',
    conviction: 'Not partial branding. Not "good enough for now." Complete, rollout-ready, launch-grade.',
    deliverables: [
      'Identity System — logo, marks, typography, colour, usage rules',
      'Narrative Foundation — story, manifesto, messaging hierarchy',
      'Visual Direction Guide',
      'Launch Messaging Framework',
      'Social & Digital Starter Kit',
      'Foundational Asset Library',
    ],
    timeline: '7–14 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Startups preparing for launch, founders entering competitive markets, brands needing a clean strategic reset.',
    icon: Package,
    gradientFrom: 'from-violet-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-fuchsia-500/20',
  },
];

// ── 04 SYSTEMS & GROWTH ──
const systemsGrowth: ServiceItem[] = [
  {
    id: 'content-engine-setup',
    category: 'Systems & Growth',
    tier: 'Infrastructure',
    name: 'AI Content Engine Setup™',
    tagline: 'Stop creating. Start operating.',
    description: 'Consistent content isn\'t a motivation problem. It\'s a systems problem. The brands that show up every week have built an engine. Not a habit. We build that engine for you.',
    conviction: 'Content becomes leverage when it runs without you. That\'s what this builds.',
    deliverables: [
      'Custom AI Workflow Architecture',
      'Prompt Library (Brand-Calibrated)',
      'Caption Bank Framework',
      '30-Day Strategic Content Plan',
      'Calendar Deployment System',
      'Internal Execution SOP',
      'Platform Adaptation Guidelines',
    ],
    timeline: '10–14 Days',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Scaling brands, founder-led businesses, D2C operators, agencies ready for structured visibility.',
    icon: Cog,
    gradientFrom: 'from-indigo-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-purple-500/20',
  },
  {
    id: 'always-on-engine',
    category: 'Systems & Growth',
    tier: 'Retainer',
    name: 'Always-On Content Engine',
    tagline: 'Visibility that compounds. Month after month.',
    description: 'A great campaign moment fades. A content engine compounds. Every month of consistent, strategic presence adds to your brand\'s authority and your audience\'s familiarity.',
    conviction: 'Brand equity is built in months, not campaigns. This is the infrastructure for the long game.',
    deliverables: [
      'Monthly Strategic Content Calendar',
      'Short-Form Video Assets',
      'Static Campaign Assets',
      'Caption & Hook Optimisation',
      'Platform Repurposing Strategy',
      'Performance Feedback Loop',
    ],
    timeline: 'Ongoing Monthly',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Growth-stage brands, funded startups, D2C operators scaling ad spend.',
    icon: Repeat,
    gradientFrom: 'from-green-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-emerald-500/20',
  },
];

// ── 05 CONSULTING ──
const consulting: ServiceItem[] = [
  {
    id: 'precision-audit',
    category: 'Consulting',
    tier: 'Tier 01 — Clarity',
    name: 'Precision Audit',
    tagline: 'Sharp answers without a long engagement.',
    description: 'A focused strategic session built to remove confusion and surface immediate direction. Recorded, with tactical action summary, priority mapping, and concrete next steps.',
    conviction: 'Sometimes clarity is worth more than a strategy deck.',
    deliverables: [
      'Recorded Strategic Session',
      'Tactical Action Summary',
      'Priority Mapping',
      'Concrete Next Steps',
    ],
    timeline: 'Single Session',
    pricing: 'Personalised, Session-Based',
    idealFor: 'Founders needing immediate strategic clarity, businesses at decision crossroads.',
    icon: Target,
    gradientFrom: 'from-slate-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-zinc-500/20',
  },
  {
    id: 'strategy-build',
    category: 'Consulting',
    tier: 'Tier 02 — Direction',
    name: 'Strategy Build',
    tagline: 'The roadmap that brings vision into executable sequence.',
    description: 'A structured, deep-dive strategic engagement aligned to your growth objectives, positioning, and operational leverage.',
    conviction: 'Strategy without execution is theatre. This is both.',
    deliverables: [
      'Comprehensive Strategy Document',
      'Execution Sequence',
      'Resource Allocation Guide',
      'Risk Mitigation Framework',
    ],
    timeline: '2–3 Weeks',
    pricing: 'Personalised, Project-Based',
    idealFor: 'Scaling brands, funded startups, businesses ready to move from vision to execution.',
    icon: Compass,
    gradientFrom: 'from-gray-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-stone-500/20',
  },
  {
    id: 'full-simulation',
    category: 'Consulting',
    tier: 'Tier 03 — Architecture',
    name: 'Full System Simulation',
    tagline: 'The complete picture, mapped before you move.',
    description: 'Elite-level advisory for brands preparing to scale aggressively. A comprehensive blueprint spanning brand, marketing, operations, and AI integration.',
    conviction: 'Most brands break when they scale. This is the blueprint that prevents it.',
    deliverables: [
      'Complete System Blueprint',
      'Scaling Roadmap',
      'Infrastructure Requirements',
      'Team & Resource Planning',
    ],
    timeline: '4–6 Weeks',
    pricing: 'Personalised, Engagement-Based',
    idealFor: 'Funded brands preparing for rapid scale, businesses entering new markets.',
    icon: Palette,
    gradientFrom: 'from-neutral-500/20',
    gradientVia: 'via-alchemy-red/20',
    gradientTo: 'to-gray-500/20',
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    number: '01',
    title: 'AI Advisory',
    subtitle: 'The Intelligence Engine',
    description: 'Where AI stops being a buzzword and starts being your operating advantage.',
    services: aiAdvisory,
  },
  {
    number: '02',
    title: 'Campaign & Creative',
    subtitle: 'The Momentum Engine',
    description: 'Campaigns that don\'t just launch — they land, convert, and compound.',
    services: campaignCreative,
  },
  {
    number: '03',
    title: 'Brand Systems',
    subtitle: 'The Identity Engine',
    description: 'Identity infrastructure. Narrative precision. Visual inevitability.',
    services: brandSystems,
  },
  {
    number: '04',
    title: 'Systems & Growth',
    subtitle: 'The Scale Engine',
    description: 'Content infrastructure that compounds while you focus on the business.',
    services: systemsGrowth,
  },
  {
    number: '05',
    title: 'Consulting',
    subtitle: 'The Clarity Engine',
    description: 'Precision strategy — from a single session to a full system simulation.',
    services: consulting,
  },
];
