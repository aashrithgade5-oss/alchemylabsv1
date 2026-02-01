// Founder portfolio data following the master execution brief

export interface FounderExperience {
  company: string;
  role: string;
  dates: string;
  achievements: string[];
  logo?: string;
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
  bio: {
    portrait: string;
    intro: string;
    quote: string;
    location: string;
    expertise: string[];
    meta: string;
  };
  philosophy: {
    process: string[];
    statement: string;
  };
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
    titles: ["BRAND ARCHITECT", "CREATIVE DIRECTOR", "AI-NATIVE STRATEGIST"]
  },
  bio: {
    portrait: "/placeholder.svg",
    intro: "Brand architect operating at the intersection of strategy, culture, and AI-native execution. With over 8 years of hands-on experience across branding, marketing, and positioning, my work focuses on building identity systems that scale with intelligence—not noise.",
    quote: "I build identity systems that scale with intelligence—not noise.",
    location: "Mumbai",
    expertise: ["Brand Architecture", "Creative Direction", "Narrative Engineering", "Luxury Positioning", "AI-Native Strategy"],
    meta: "Mumbai, 21 • Founder-led studio practice"
  },
  philosophy: {
    process: ["DECODE", "ARCHITECT", "EXECUTE"],
    statement: "Luxury positioning. Narrative engineering. Creative direction designed for brands that think long-term."
  },
  experience: [
    {
      company: "Alchemy Labs",
      role: "Founder • Creative Director",
      dates: "2024 - Present",
      achievements: [
        "Founded AI-native creative studio focused on brand architecture",
        "Developed proprietary 'Aether Rituals' AI methodology",
        "Built identity systems for luxury and digital-first brands",
        "Pioneered narrative engineering frameworks"
      ]
    },
    {
      company: "Brand Alchemy",
      role: "Founder",
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
        "Integrated cutting-edge AI tools for brand work"
      ]
    },
    {
      company: "Cipla",
      role: "Brand Strategy",
      dates: "2022 - 2023",
      achievements: [
        "Healthcare brand positioning",
        "Strategic communications development",
        "Cross-functional campaign coordination"
      ]
    }
  ],
  skills: [
    {
      category: "Brand Architecture",
      items: ["Identity Systems", "Positioning Strategy", "Narrative Frameworks", "Visual Language Design"]
    },
    {
      category: "Creative Direction",
      items: ["Art Direction", "Campaign Design", "Visual Systems", "Editorial Design"]
    },
    {
      category: "AI-Native Strategy",
      items: ["Prompt Engineering", "Tool Integration", "Workflow Design", "Generative Media"]
    },
    {
      category: "Technical",
      items: ["Figma", "Adobe Creative Suite", "Midjourney", "Runway", "Notion", "Webflow"]
    }
  ],
  education: [
    {
      institution: "NMIMS",
      degree: "Bachelor's Degree",
      year: "Class of 2026",
      honors: "Marketing & Strategy Focus"
    }
  ],
  recognition: [
    {
      title: "Featured: AI in Creative Industries",
      source: "Industry Publication",
      date: "2024"
    },
    {
      title: "Brand Alchemy Community Launch",
      source: "Self-Published",
      date: "2023"
    }
  ],
  contact: {
    email: "aashrith@alchemylabs.in",
    linkedin: "https://linkedin.com/in/aashrith-gade-a6a01127a"
  }
};

// Eva Doshi Portfolio Data
export const evaData: FounderData = {
  hero: {
    name: "Eva Doshi",
    titles: ["DIRECTOR OF CLIENT RELATIONS", "OUTREACH HEAD"],
    tagline: "Luxury Brand Strategy • Creative Direction • Growth & Partnerships"
  },
  bio: {
    portrait: "/placeholder.svg",
    intro: "Leading client relations, outreach, and strategic growth at Alchemy Labs. With a background in fashion and luxury brand strategy, I bring a sharp understanding of market dynamics, creative storytelling, and relationship-led growth.",
    quote: "Bridging creative vision with executional precision",
    location: "Mumbai",
    expertise: ["Luxury Brand Strategy", "Creative Direction", "Growth & Partnerships", "Market Dynamics", "Creative Storytelling"],
    meta: "Mumbai • Co-founder • Client-first leadership"
  },
  philosophy: {
    process: ["CONNECT", "STRATEGIZE", "DELIVER"],
    statement: "Excellence—from first conversation to final delivery."
  },
  experience: [
    {
      company: "Alchemy Labs",
      role: "Co-Founder • Chief of Client Relations",
      dates: "2024 - Present",
      achievements: [
        "Built and leads client relations infrastructure",
        "Developed strategic partnerships with luxury brands",
        "Orchestrates project delivery and client success",
        "Bridges creative vision with client objectives"
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
      ]
    }
  ],
  skills: [
    {
      category: "Luxury Brand Strategy",
      items: ["Market Positioning", "Brand Narrative", "Competitive Analysis", "Trend Forecasting"]
    },
    {
      category: "Creative Direction",
      items: ["Campaign Oversight", "Visual Storytelling", "Brand Guidelines", "Content Strategy"]
    },
    {
      category: "Growth & Partnerships",
      items: ["Client Relations", "Strategic Partnerships", "Business Development", "Account Management"]
    },
    {
      category: "Operations",
      items: ["Project Management", "Team Coordination", "Process Optimization", "Quality Assurance"]
    }
  ],
  education: [
    {
      institution: "University",
      degree: "Bachelor's Degree",
      year: "2023",
      honors: "Fashion & Luxury Brand Focus"
    }
  ],
  recognition: [
    {
      title: "Ex-Dentsu Professional",
      source: "Career Milestone",
      date: "2024"
    }
  ],
  contact: {
    email: "eva@alchemylabs.in",
    linkedin: "https://www.linkedin.com/in/eva-doshi-27266b246/"
  }
};
