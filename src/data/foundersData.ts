// Founder portfolio data following the master execution brief

export interface FounderExperience {
  company: string;
  role: string;
  dates: string;
  achievements: string[];
  logo?: string;
  revenueSignal?: string;
  metrics?: { label: string; value: string }[];
}

export interface FounderVenture {
  name: string;
  type: string;
  description: string;
  communitySize?: string;
  audience?: string;
  outputs?: string[];
  capabilities?: string[];
  founderRoles?: string[];
}

export interface FounderProject {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  role: string;
  outcome: string;
}

export interface FounderData {
  hero: {
    name: string;
    titles: string[];
    tagline?: string;
  };
  positioning: {
    short: string;
    expanded: string;
  };
  bio: {
    portrait: string;
    intro: string;
    extendedIntro?: string;
    quote: string;
    location: string;
    age?: number;
    expertise: string[];
    meta: string;
  };
  philosophy: {
    process: string[];
    statement: string;
    coreBelief?: string;
    strategicLens?: string[];
    designPhilosophy?: string;
  };
  ventures?: FounderVenture[];
  differentiators?: string[];
  experience: FounderExperience[];
  skills: {
    category: string;
    items: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
    honors?: string;
    focusAreas?: string[];
  }[];
  recognition: {
    title: string;
    source: string;
    date: string;
    link?: string;
  }[];
  contact: {
    email: string;
    linkedin: string;
    calendly?: string;
  };
}

// Aashrith Gade Portfolio Data
export const aashrithData: FounderData = {
  hero: {
    name: "AASHRITH GADE",
    titles: [
      "BRAND ARCHITECT",
      "CREATIVE DIRECTOR",
      "AI-NATIVE MARKETING STRATEGIST"
    ]
  },
  positioning: {
    short: "Founder-led brand architect designing AI-native brand systems with luxury-grade taste and long-term strategic intent.",
    expanded: "Aashrith Gade operates at the intersection of brand architecture, creative direction, and AI-native marketing. His work focuses on building scalable brand systems—where strategy, narrative, design, and execution align to compound value over time, particularly within luxury and founder-led ventures."
  },
  bio: {
    portrait: "/placeholder.svg",
    intro: "Brand architect operating at the intersection of strategy, culture, and AI-native marketing. With 8+ years of hands-on experience across branding, marketing, and positioning, my work focuses on building identity systems that scale with intelligence—not noise.",
    extendedIntro: "Alumni of NMIMS (Class of 2026). Previously worked across healthcare, luxury, and digital-first brands. My approach combines luxury positioning, narrative engineering, and creative direction, designed for brands that think long-term.",
    quote: "I don't chase trends. I architect frameworks that outlast them.",
    location: "Mumbai",
    age: 21,
    expertise: [
      "Brand Architecture",
      "Creative Direction",
      "AI-Native Strategy",
      "Narrative Engineering",
      "Luxury Positioning",
      "Systems Thinking"
    ],
    meta: "Mumbai, 21 • Founder-led studio practice"
  },
  philosophy: {
    process: ["DECODE", "ARCHITECT", "EXECUTE"],
    statement: "Luxury positioning. Narrative engineering. Creative direction designed for brands that think long-term.",
    coreBelief: "Brands are not campaigns or visuals — they are systems.",
    strategicLens: [
      "Brand = Infrastructure",
      "AI = Leverage, not shortcut",
      "Taste + Systems > Speed alone",
      "Long-term positioning over short-term hype"
    ],
    designPhilosophy: "Restraint, coherence, and narrative clarity over decorative aesthetics."
  },
  ventures: [
    {
      name: "Brand Alchemy",
      type: "Thought Leadership IP",
      description: "A research-driven thought leadership platform exploring how brands are built through culture, narrative, systems, and design.",
      outputs: [
        "Strategic branding content",
        "Marketing and positioning insights",
        "Brand systems thinking"
      ]
    },
    {
      name: "Ashzz.ai",
      type: "AI-Native Community Platform",
      communitySize: "3.8K+ members",
      audience: "Gen AI experts, builders, designers, marketers, and enthusiasts",
      description: "An active AI-native ecosystem focused on experimentation, applied learning, and practical AI workflows.",
      outputs: [
        "Discord community",
        "Value-driven AI content",
        "Thought leadership posts"
      ]
    },
    {
      name: "Alchemy Labs",
      type: "AI-Native Branding & Product Studio",
      description: "A founder-led studio delivering AI-powered brand systems, rapid product builds, and strategic advisory.",
      founderRoles: ["Founder", "CEO", "Head of Design", "Head of Project Execution"],
      capabilities: [
        "Brand architecture & identity systems",
        "AI-assisted product and visual builds",
        "Strategic brand advisory",
        "Founder-to-founder collaboration"
      ]
    },
  ],
  differentiators: [
    "Founder-led execution, not delegated work",
    "Systems-first branding mindset",
    "AI-native workflows with aesthetic discipline",
    "Luxury positioning without superficial gloss",
    "Community building alongside client work"
  ],
  experience: [
    {
      company: "Alchemy Labs",
      role: "Founder & CEO",
      dates: "2024 - Present",
      achievements: [
        "Founded AI-native creative studio focused on brand architecture",
        "Built and scaled AI-native branding ventures",
        "Delivered brand systems, visual identities, and strategic positioning",
        "Led end-to-end strategy, design, and execution"
      ],
      revenueSignal: "~$9,000+ generated within 6 months across 6+ client engagements",
      metrics: [
        { label: 'Clients', value: '6+' },
        { label: 'Revenue', value: '$9K+' },
        { label: 'Projects', value: '50+' }
      ]
    },
    {
      company: "Brand Alchemy",
      role: "Founder & Brand Strategist",
      dates: "2023 - Present",
      achievements: [
        "Platform for decoding branding and systems thinking",
        "Created educational content on brand strategy",
        "Built community of brand practitioners"
      ]
    },
    {
      company: "Ashzz.ai",
      role: "Founder",
      dates: "2023 - Present",
      achievements: [
        "AI-led creative execution platform",
        "Developed workflows for AI-augmented production",
        "Built 3.8K+ member community"
      ],
      metrics: [
        { label: 'Community', value: '3.8K+' }
      ]
    },
    {
      company: "Cipla",
      role: "Marketing & Sales Intern",
      dates: "2022 - 2023",
      achievements: [
        "Supported product marketing initiatives",
        "Assisted in sales enablement and messaging alignment",
        "Gained exposure to healthcare marketing systems"
      ]
    },
    {
      company: "S8UL Esports",
      role: "Editor & Social Media Manager",
      dates: "2021 - 2022",
      achievements: [
        "Content strategy and editing",
        "Community engagement systems",
        "Contributed to content across a 13M+ audience ecosystem"
      ],
      metrics: [
        { label: 'Audience', value: '13M+' }
      ]
    },
    {
      company: "Velocity Gaming",
      role: "Branding & Social Media Manager",
      dates: "2020 - 2021",
      achievements: [
        "Brand storytelling and UI-led content",
        "Scaled Instagram from 5K to 40K in 10 weeks",
        "Designed consistent visual and narrative systems"
      ],
      metrics: [
        { label: 'Growth', value: '5K→40K' },
        { label: 'Duration', value: '10 weeks' }
      ]
    }
  ],
  skills: [
    { category: "Brand Architecture", items: ["Identity Systems", "Positioning Strategy", "Narrative Frameworks", "Visual Language Design"] },
    { category: "Creative Direction", items: ["Art Direction", "Campaign Design", "Visual Systems", "Editorial Design"] },
    { category: "AI-Native Strategy", items: ["Prompt Engineering", "Tool Integration", "Workflow Design", "Generative Media"] },
    { category: "Technical", items: ["Figma", "Adobe Creative Suite", "Midjourney", "Runway", "Notion", "Webflow"] }
  ],
  education: [
    {
      institution: "NMIMS Mumbai",
      degree: "BBA — Branding & Advertising",
      year: "Class of 2026",
      honors: "Marketing & Strategy Focus",
      focusAreas: ["Branding & Brand Strategy", "Advertising & Communication", "Marketing Systems", "Creative Direction"]
    }
  ],
  recognition: [
    { title: "Featured: AI in Creative Industries", source: "Industry Publication", date: "2024" },
    { title: "Brand Alchemy Community Launch", source: "Self-Published", date: "2023" }
  ],
  contact: {
    email: "aashrithgadework@gmail.com",
    linkedin: "https://www.linkedin.com/in/aashrithgade"
  }
};

// Eva Doshi Portfolio Data
export const evaData: FounderData = {
  hero: {
    name: "Eva Doshi",
    titles: ["CO-FOUNDER · BRAND STRATEGIST", "FASHION × LUXURY × CREATIVE DIRECTION"],
    tagline: "Ex-Dentsu · Mumbai"
  },
  positioning: {
    short: "Strategic leader bridging creative vision with executional precision across luxury brand partnerships.",
    expanded: "Eva Doshi leads client relations, outreach, and strategic growth at Alchemy Labs. With a background in fashion and luxury brand strategy, she brings a sharp understanding of market dynamics, creative storytelling, and relationship-led growth."
  },
  bio: {
    portrait: "/placeholder.svg",
    intro: "Leading client relations, outreach, and strategic growth at Alchemy Labs. With a background in fashion and luxury brand strategy, I bridge creative vision with executional precision—from first conversation to final delivery.",
    extendedIntro: "Ex-Dentsu professional with experience across business development, marketing, sales, and AI-led marketing initiatives. My role ensures that Alchemy Labs operates with both strategic clarity and operational excellence.",
    quote: "Strategy meets storytelling. Execution meets elegance.",
    location: "Mumbai",
    expertise: ["Luxury Brand Strategy", "Creative Direction", "Growth & Partnerships", "Market Dynamics", "Creative Storytelling"],
    meta: "Mumbai • Co-founder • Client-first leadership"
  },
  philosophy: {
    process: ["CONNECT", "STRATEGIZE", "DELIVER"],
    statement: "Excellence—from first conversation to final delivery.",
    coreBelief: "Every client relationship is a partnership, not a transaction.",
    strategicLens: [
      "Client success = Studio success",
      "Relationships before revenue",
      "Operational excellence enables creative freedom",
      "Every touchpoint matters"
    ],
    designPhilosophy: "Elegant solutions through careful attention to client needs and market positioning."
  },
  experience: [
    {
      company: "Alchemy Labs",
      role: "Co-Founder · Chief of Client Relations",
      dates: "2024 - Present",
      achievements: [
        "Built and leads client relations infrastructure",
        "Developed strategic partnerships with luxury brands",
        "Orchestrates project delivery and client success",
        "Bridges creative vision with client objectives"
      ],
      metrics: [
        { label: 'Partnerships', value: '10+' },
        { label: 'Client Retention', value: '95%' }
      ]
    },
    {
      company: "@hitakkshi Collaboration",
      role: "Videographer — Fashion Influencer Projects",
      dates: "Feb 2025",
      achievements: [
        "Branded content creation for fashion and retail",
        "Shot and edited Instagram Reels for Inorbit Mall, Bonkers Corner, Azorte, Pepe Jeans, AND",
        "Managed end-to-end production from concept to delivery"
      ],
      metrics: [
        { label: 'Brands', value: '5+' },
        { label: 'Reels', value: '20+' },
        { label: 'Engagement', value: '15K+' }
      ]
    },
    {
      company: "Sparsh Concept",
      role: "Marketing, PR & Sales",
      dates: "2024 - 2025",
      achievements: [
        "Led marketing and PR initiatives for events and exhibitions",
        "Managed sales pipeline and client outreach",
        "Coordinated press coverage and media partnerships"
      ],
      metrics: [
        { label: 'Events', value: '10+' },
        { label: 'Press Hits', value: '15+' }
      ]
    },
    {
      company: "Dentsu",
      role: "Business Development",
      dates: "2022 - 2024",
      achievements: [
        "Led business development initiatives",
        "Managed key client relationships",
        "Contributed to marketing and sales strategies",
        "AI-led marketing initiatives"
      ],
      metrics: [
        { label: 'Clients Managed', value: '15+' },
        { label: 'Revenue Growth', value: '30%+' }
      ]
    }
  ],
  skills: [
    { category: "Luxury Brand Strategy", items: ["Market Positioning", "Brand Narrative", "Competitive Analysis", "Trend Forecasting"] },
    { category: "Creative Direction", items: ["Campaign Oversight", "Visual Storytelling", "Brand Guidelines", "Content Strategy"] },
    { category: "Growth & Partnerships", items: ["Client Relations", "Strategic Partnerships", "Business Development", "Account Management"] },
    { category: "Operations", items: ["Project Management", "Team Coordination", "Process Optimization", "Quality Assurance"] }
  ],
  education: [
    { institution: "University", degree: "Bachelor's Degree", year: "2023", honors: "Fashion & Luxury Brand Focus" }
  ],
  recognition: [
    { title: "Ex-Dentsu Professional", source: "Career Milestone", date: "2024" }
  ],
  contact: {
    email: "eva@alchemylabs.in",
    linkedin: "https://www.linkedin.com/in/eva-doshi-0b07b531b/"
  }
};

// Brand collaboration data for Eva
export const evaBrandCollaborations = [
  { name: 'Inorbit Mall', role: 'Brand Partnership & Content', metric: 'Multi-campaign collaboration' },
  { name: 'Bonkers Corner', role: 'Fashion Brand Strategy', metric: 'Retail brand positioning' },
  { name: 'Azorte', role: 'Creative Direction', metric: 'Visual identity refresh' },
  { name: 'Pepe Jeans', role: 'Campaign & Content Strategy', metric: 'Social media campaign' },
  { name: 'AND', role: 'Luxury Brand Outreach', metric: 'Partnership development' },
];
