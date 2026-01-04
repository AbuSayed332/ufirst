export interface CorporateTopic {
  id: string;
  title: string;
  category: 'Core' | 'Governance';
  content: string;
  highlights: string[];
  icon: string;
}

export const corporateTopics: CorporateTopic[] = [
  {
    id: 'heritage',
    title: 'The Heritage',
    category: 'Core',
    icon: '🏛️',
    content: 'uFirst Limited was forged from a vision of industrial sovereignty. Our journey began with a single commitment: to provide excellence where others provided standard service. Today, we stand as a multi-sector titan, rooted in the values of trust and absolute precision.',
    highlights: ['Decade of Excellence', 'Founder-Led Vision', 'Sustainable Growth Path']
  },
  {
    id: 'ecosystem',
    title: 'Executive Ecosystem',
    category: 'Core',
    icon: '🕸️',
    content: 'Our ecosystem is a living network of specialized divisions, each operating with the agility of a startup and the resources of a global conglomerate. We foster cross-industry synergy to solve complex global challenges.',
    highlights: ['Inter-Division Synergy', 'Agile Governance', 'Resource Optimization']
  },
  {
    id: 'pillars',
    title: 'Legacy Pillars',
    category: 'Core',
    icon: '🏺',
    content: 'The four pillars of uFirst—Integrity, Innovation, Impact, and Inclusion—form the bedrock of every decision we make. We do not just build businesses; we build legacies that serve generations.',
    highlights: ['Ethical Foundation', 'Future-Proofing', 'Social Responsibility']
  },
  {
    id: 'engagement',
    title: 'Global Engagement',
    category: 'Core',
    icon: '🌐',
    content: 'Operating across borders requires a sophisticated understanding of global markets. uFirst engages with international partners through transparent frameworks and strategic value-sharing.',
    highlights: ['Cross-Border Logistics', 'Strategic Partnerships', 'Market Entry Mastery']
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance',
    category: 'Governance',
    icon: '⚖️',
    content: 'We adhere to the highest international standards of corporate governance, including ISO 9001:2015. Our compliance division ensures that every operation meets or exceeds local and international legal requirements.',
    highlights: ['ISO 9001 Certified', 'Audit Transparency', 'Legal Sovereignty']
  },
  {
    id: 'privacy',
    title: 'Privacy Architecture',
    category: 'Governance',
    icon: '🛡️',
    content: 'In a digital-first world, data is a sacred trust. Our proprietary Privacy Architecture utilizes military-grade encryption and strict access protocols to protect the information of our partners and clients.',
    highlights: ['End-to-End Encryption', 'GDPR Alignment', 'Secure Data Vaults']
  },
  {
    id: 'ethical',
    title: 'Ethical Standards',
    category: 'Governance',
    icon: '💎',
    content: 'The uFirst Code of Ethics is non-negotiable. We maintain a zero-tolerance policy toward corruption and malpractice, ensuring our reputation remains as solid as our infrastructure.',
    highlights: ['Zero-Tolerance Policy', 'Fair Trade Principles', 'Integrity Reporting']
  },
  {
    id: 'directors',
    title: 'Board of Directors',
    category: 'Governance',
    icon: '👔',
    content: 'Our board consists of world-class leaders from diverse industrial backgrounds. Together, they provide the strategic oversight and wisdom necessary to navigate the complexities of the 21st-century economy.',
    highlights: ['Diverse Leadership', 'Strategic Oversight', 'Experienced Wisdom']
  }
];