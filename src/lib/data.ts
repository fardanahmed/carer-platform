// src/lib/data.ts

export const SITE_DATA = {
  name: 'Nasir Uddin Centre for Applied Research & Educational Resources',
  abbreviation: 'CARER',
  tagline: 'Integrity. Innovation. Impact.',
  contact: {
    email: 'info@carer.edu.pk', // Placeholder until confirmed
    phone: '+92 306 1666687', // From screenshot
    address: 'Lahore, Pakistan',
  },
};

export const HERO_CONTENT = {
  headline: 'Bridging Academia & Industry',
  subheadline:
    'Knowledge, when nurtured and applied with integrity, has the power to transform societies.',
  ctaPrimary: 'Explore Research',
  ctaSecondary: 'Our Mission',
};

export const RESEARCH_AREAS = [
  {
    id: 'energy',
    title: 'Energy & Sustainable Tech',
    description:
      'Developing renewable energy solutions and advanced materials for a sustainable future.',
    icon: 'Zap', // We will map this string to a real Icon component later
  },
  {
    id: 'health',
    title: 'Health Technologies',
    description:
      'Innovating in health sciences to improve quality of life through applied research.',
    icon: 'Activity',
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Food Security',
    description:
      'Modernizing agricultural practices and ensuring food security through technology.',
    icon: 'Sprout',
  },
  {
    id: 'digital',
    title: 'Digital Systems & AI',
    description:
      'Leveraging Artificial Intelligence and digital systems to solve complex industrial problems.',
    icon: 'Cpu',
  },
];

export const OBJECTIVES = [
  'Promote Academic Excellence through mentorship and advanced training.',
  'Bridge Academia and Industry to create commercially viable solutions.',
  'Develop Skilled Manpower to meet evolving industrial demands.',
  'Foster Collaborative Research at national and international levels.',
];
