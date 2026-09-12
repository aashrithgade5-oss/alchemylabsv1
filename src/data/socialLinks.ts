// Single source for outbound social/contact URLs. Lives in src/data (not in a
// component) so importing it can never drag a React tree + framer-motion into
// a route's bundle — the reason /contact used to pull in the whole legacy
// Footer just to read this object. furnace/Footer.tsx mirrors these values.
export const socialLinks = {
  instagram: 'https://www.instagram.com/brandalchemy._',
  linkedin: 'https://www.linkedin.com/company/brandalchemylabs/',
  youtube: 'https://www.youtube.com/@brandalchemy-in',
  founderEmail: 'alchemylabs.work@gmail.com',
  founders: {
    aashrith: 'https://www.linkedin.com/in/aashrithgade',
    eva: 'https://www.linkedin.com/in/eva-doshi-0b07b531b/',
  },
};
