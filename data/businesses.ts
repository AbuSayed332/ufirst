

interface Business {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  longDescription: string;
  features: string[];
}

export const businesses: Business[] = [
  { 
    id: 'tech', 
    name: 'uFirst Technology', 
    description: 'Sovereign OS & Enterprise Lattice Architectures.',
    icon: '💻',
    color: '#00adef',
    longDescription: 'Architecting the digital sovereignty of uFirst Limited. We engineer high-concurrency enterprise ecosystems, custom ERP frameworks (uFirst ERP v7), and AI-integrated neural nodes that drive industrial efficiency through absolute algorithmic precision.',
    features: ['Sovereign ERP Frameworks', 'Neural AI Integration', 'High-Load Node Optimization', 'Full-Stack Logic Synthesis']
  },
  { 
    id: 'academy', 
    name: 'uFirst Academy', 
    description: 'Cognitive Synthesis & Industrial Mastery Hub.',
    icon: '🎓',
    color: '#f58220',
    longDescription: 'Bridging the global industrial talent gap through elite cognitive synthesis. Our academy provides high-intensity executive coaching, ISA (Instruction Set Architecture) laboratories, and technical masterclasses designed to master next-generation industrial logic.',
    features: ['ISA Logic Laboratories', 'Executive Leadership Synthesis', 'Industrial Mastery Nodes', 'Professional Tech Pedagogy']
  },
  { 
    id: 'agro', 
    name: 'uFirst Agro', 
    description: 'Precision Bio-Tech & Sustainable Organic Synthesis.',
    icon: '🌱',
    color: '#22c55e',
    longDescription: 'Modernizing agro-science through precision IOT and organic ethics. We manage large-scale high-yield organic cultivation nodes, utilizing satellite telemetry and automated irrigation to deliver premium-grade sustainable exports to the global market.',
    features: ['IOT Telemetry Farming', 'Organic Bio-Synthesis', 'Global Export Protocols', 'Sustainable Yield Engines']
  },
  { 
    id: 'exim', 
    name: 'uFirst EXIM', 
    description: 'Blockchain Logistics & Global Trade Nexus.',
    icon: '🚢',
    color: '#004b93',
    longDescription: 'The sovereign gateway to international commerce. We facilitate high-volume trade through blockchain-verified supply chains, ensuring absolute transparency, customs protocol compliance, and zero-latency logistics for global import-export operations.',
    features: ['Blockchain Supply Sync', 'Customs Logic Automation', 'Global Source Verification', 'Port-to-Node Logistics']
  },
  { 
    id: 'tours', 
    name: 'uFirst Tours & Travels', 
    description: 'Diplomatic Mobility & Premium Global Logistics.',
    icon: '✈️',
    color: '#00adef',
    longDescription: 'Redefining global mobility for uFirst elite partners. We manage high-security diplomatic travel, complex visa protocols, and corporate mobility logistics with zero-error precision, ensuring seamless transit across global sovereign borders.',
    features: ['Diplomatic Visa Logic', 'Corporate Mobility Sync', 'Premium Transit Protocols', 'Global Destination Strategy']
  },
  { 
    id: 'healthcare', 
    name: 'uFirst Healthcare', 
    description: 'Neural Diagnostic Nodes & Patient-First Excellence.',
    icon: '🏥',
    color: '#ef4444',
    longDescription: 'Advancing human longevity through clinical precision. We operate high-tech diagnostic nodes and medical service hubs that integrate modern biometric hardware with a patient-centric, high-trust care philosophy.',
    features: ['Neural Diagnostic Nodes', 'Clinical Protocol Sync', 'Bio-Metric Telemetry', 'Healthcare Supply Integrity']
  },
  { 
    id: 'landmarks', 
    name: 'uFirst Landmarks', 
    description: 'Architectural Sovereignty & Real Estate Logic.',
    icon: '🏢',
    color: '#64748b',
    longDescription: 'Architecting the skylines of industrial excellence. We develop high-impact urban landmarks that combine sustainable architectural logic with premium real estate value for long-term industrial and residential growth nodes.',
    features: ['Sustainable Urbanism', 'Industrial Hub Architecture', 'Luxury Landmark Logic', 'Green-Grid Infrastructure']
  },
  { 
    id: 'consultancy', 
    name: 'uFirst Consultancy', 
    description: 'Algorithmic Intelligence & Strategic Advisory.',
    icon: '🤝',
    color: '#f58220',
    longDescription: 'Data-driven wisdom for global industrial leaders. We provide high-stakes strategic advisory services, utilizing algorithmic market intelligence to help sovereign entities navigate complex regulatory and high-growth landscapes.',
    features: ['Market Intelligence OS', 'Strategic Growth Audits', 'Regulatory Node Navigation', 'Industrial Scalability Briefs']
  }
];