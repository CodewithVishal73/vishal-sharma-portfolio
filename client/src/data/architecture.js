// Authoritative architecture map configuration for the hero telemetry section
// Single source of truth for nodes, edges, selectable paths, and metadata.
// Strictly aligned with CLAIMS.md and DESIGN_AND_MOTION.md.

export const ARCHITECTURE_META = {
  title: 'Multi-Stack Architecture Map',
  badge: 'Illustrative architecture',
  liveBackendNote: 'Node.js / Express path powers this portfolio site',
  disclaimer: 'Educational systems diagram — illustrative patterns and real site telemetry',
};

export const ARCHITECTURE_LEGEND = [
  { kind: 'actual', tag: 'This site', label: 'This site (Real backend)' },
  { kind: 'project', tag: 'SellerLensIQ', label: 'Project pattern (SellerLensIQ)' },
  { kind: 'illustrative', tag: 'Illustrative', label: 'Illustrative pattern' },
];

export const ARCHITECTURE_PATHS = {
  node: {
    id: 'node',
    label: 'Node.js / Express',
    shortLabel: 'Node.js / Express',
    kind: 'actual',
    statusTag: 'This site',
    projectContext: 'This portfolio backend',
    caption: "Node.js / Express — this site's live backend service connected to MongoDB Atlas",
    colorVariant: 'signal',
    // Ordered node IDs for the active path
    nodes: ['browser', 'react', 'api-node', 'backend-node', 'db-node'],
    returnNodes: ['db-node', 'backend-node', 'api-node', 'react', 'browser'],
  },
  java: {
    id: 'java',
    label: 'Java / Spring Boot',
    shortLabel: 'Java / Spring Boot',
    kind: 'project',
    statusTag: 'SellerLensIQ',
    projectContext: 'Pattern used in SellerLensIQ',
    caption: 'Java / Spring Boot — architecture pattern used in SellerLensIQ with PostgreSQL',
    colorVariant: 'signal',
    nodes: ['browser', 'react', 'api-java', 'backend-java', 'db-java'],
    returnNodes: ['db-java', 'backend-java', 'api-java', 'react', 'browser'],
  },
  ai: {
    id: 'ai',
    label: 'AI Integration',
    shortLabel: 'AI Integration',
    kind: 'illustrative',
    statusTag: 'Illustrative',
    projectContext: 'Generic integration pattern',
    caption: 'AI Integration — illustrative integration pattern (generic interface, educational only)',
    colorVariant: 'signal',
    nodes: ['browser', 'react', 'api-node', 'backend-node', 'ai-service'],
    returnNodes: ['ai-service', 'backend-node', 'api-node', 'react', 'browser'],
  },
};

export const ARCHITECTURE_NODES = {
  // Shared Trunk
  browser: {
    id: 'browser',
    label: 'BROWSER',
    sub: 'Client / User',
    kind: 'trunk',
    archKind: 'actual',
    col: 1,
    row: 'center',
    x: 80,
    y: 155,
    icon: 'FiGlobe',
    category: 'Client Layer',
  },
  react: {
    id: 'react',
    label: 'REACT',
    sub: 'SPA & Router',
    kind: 'trunk',
    archKind: 'actual',
    col: 2,
    row: 'center',
    x: 235,
    y: 155,
    icon: 'SiReact',
    category: 'Presentation Layer',
  },

  // Path A: Java / Spring Boot Branch (Row 1)
  'api-java': {
    id: 'api-java',
    label: 'REST API',
    sub: 'Contract Gateway',
    kind: 'java',
    archKind: 'project',
    col: 3,
    row: 1,
    x: 435,
    y: 80,
    icon: 'FiLayers',
    category: 'Gateway Layer',
  },
  'backend-java': {
    id: 'backend-java',
    label: 'SPRING BOOT',
    sub: 'Java Enterprise Core',
    kind: 'java',
    archKind: 'project',
    col: 4,
    row: 1,
    x: 645,
    y: 80,
    icon: 'SiSpringboot',
    secondaryIcon: 'FaJava',
    buildBadge: 'Maven',
    category: 'Application Layer',
  },
  'db-java': {
    id: 'db-java',
    label: 'RELATIONAL DB',
    sub: 'Relational Option',
    kind: 'java',
    archKind: 'project',
    col: 5,
    row: 1,
    x: 855,
    y: 80,
    icon: 'FiDatabase',
    chips: ['PostgreSQL', 'MySQL'],
    category: 'Persistence Layer',
  },

  // Path B: Node.js / Express Branch (Row 2)
  'api-node': {
    id: 'api-node',
    label: 'REST API',
    sub: 'Express Endpoints',
    kind: 'node',
    archKind: 'actual',
    col: 3,
    row: 2,
    x: 435,
    y: 215,
    icon: 'FiLayers',
    category: 'Gateway Layer',
  },
  'backend-node': {
    id: 'backend-node',
    label: 'NODE / EXPRESS',
    sub: 'JavaScript Runtime',
    kind: 'node',
    archKind: 'actual',
    siteBadge: 'This site',
    col: 4,
    row: 2,
    x: 645,
    y: 215,
    icon: 'SiNodedotjs',
    secondaryIcon: 'SiExpress',
    category: 'Application Layer',
  },
  'db-node': {
    id: 'db-node',
    label: 'MONGODB ATLAS',
    sub: 'Document Store',
    kind: 'node',
    archKind: 'actual',
    col: 5,
    row: 2,
    x: 855,
    y: 215,
    icon: 'SiMongodb',
    category: 'Persistence Layer',
  },

  // Optional AI Integration Branch
  'ai-service': {
    id: 'ai-service',
    label: 'AI SERVICE',
    sub: 'Generic Inference',
    kind: 'ai',
    archKind: 'illustrative',
    tag: 'Optional integration pattern',
    col: 4,
    row: 3,
    x: 645,
    y: 310,
    icon: 'FiCpu',
    category: 'Intelligence Layer',
  },
};

export const ARCHITECTURE_EDGES = [
  // Shared Trunk
  { id: 'e-browser-react', from: 'browser', to: 'react', label: 'Client Events', style: 'solid' },

  // Path A: Java Ecosystem
  { id: 'e-react-apijava', from: 'react', to: 'api-java', label: 'HTTP / JSON', style: 'solid' },
  { id: 'e-apijava-boot', from: 'api-java', to: 'backend-java', label: 'Controller Dispatch', style: 'solid' },
  { id: 'e-boot-reldb', from: 'backend-java', to: 'db-java', label: 'JDBC / JPA', style: 'solid' },

  // Path B: Node Ecosystem (This site)
  { id: 'e-react-apinode', from: 'react', to: 'api-node', label: 'REST API', style: 'solid' },
  { id: 'e-apinode-node', from: 'api-node', to: 'backend-node', label: 'Express Router', style: 'solid' },
  { id: 'e-node-mongo', from: 'backend-node', to: 'db-node', label: 'Mongoose Protocol', style: 'solid' },

  // Optional AI branch
  { id: 'e-node-ai', from: 'backend-node', to: 'ai-service', label: 'API Integration', style: 'dashed' },
];
