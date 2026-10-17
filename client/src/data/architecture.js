// Authoritative architecture map configuration for the hero telemetry section
// Single source of truth for nodes, edges, selectable paths, and metadata.
// Strictly aligned with CLAIMS.md and DESIGN_AND_MOTION.md.

export const ARCHITECTURE_META = {
  title: 'Multi-Stack Architecture Map',
  badge: 'Illustrative architecture',
  liveBackendNote: 'Node.js / Express path powers this portfolio site',
  disclaimer: 'Educational systems diagram — illustrative patterns and real site telemetry',
};

export const ARCHITECTURE_PATHS = {
  node: {
    id: 'node',
    label: 'Node.js / Express',
    shortLabel: 'Node.js / Express',
    kind: 'real',
    statusTag: 'This site',
    projectContext: 'This portfolio backend',
    caption: 'Node.js / Express — this site\'s live backend service connected to MongoDB Atlas',
    colorVariant: 'signal',
    // Ordered node IDs for the active path
    nodes: ['browser', 'react', 'api-node', 'backend-node', 'db-node'],
    returnNodes: ['db-node', 'backend-node', 'api-node', 'react', 'browser'],
  },
  java: {
    id: 'java',
    label: 'Java / Spring Boot',
    shortLabel: 'Java / Spring Boot',
    kind: 'illustrative',
    statusTag: 'Illustrative',
    projectContext: 'Pattern used in SellerLensIQ',
    caption: 'Java / Spring Boot — illustrative architecture (pattern used in SellerLensIQ with PostgreSQL)',
    colorVariant: 'signal',
    nodes: ['browser', 'react', 'api-java', 'backend-java', 'db-java'],
    returnNodes: ['db-java', 'backend-java', 'api-java', 'react', 'browser'],
  },
  ai: {
    id: 'ai',
    label: 'AI Integration',
    shortLabel: 'AI Integration',
    kind: 'optional',
    statusTag: 'Optional pattern',
    projectContext: 'Generic integration pattern',
    caption: 'AI Integration — optional integration pattern (generic interface, educational only)',
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
    col: 4,
    row: 2,
    x: 645,
    y: 215,
    icon: 'SiNodedotjs',
    secondaryIcon: 'SiExpress',
    siteBadge: 'This site',
    category: 'Application Layer',
  },
  'db-node': {
    id: 'db-node',
    label: 'MONGODB ATLAS',
    sub: 'Document Store',
    kind: 'node',
    col: 5,
    row: 2,
    x: 855,
    y: 215,
    icon: 'SiMongodb',
    category: 'Persistence Layer',
  },

  // Optional AI Integration Branch (Row 3, attached to backend)
  'ai-service': {
    id: 'ai-service',
    label: 'AI SERVICE',
    sub: 'Generic Inference',
    kind: 'ai',
    col: 4,
    row: 3,
    x: 645,
    y: 315,
    icon: 'FiCpu',
    tag: 'Optional integration pattern',
    category: 'Intelligence Extension',
  },
};

export const ARCHITECTURE_EDGES = [
  // Trunk
  { id: 'trunk-1', from: 'browser', to: 'react', kind: 'trunk', forwardLabel: 'USER ACTION' },

  // Java Fork
  { id: 'fork-java', from: 'react', to: 'api-java', kind: 'java', forwardLabel: 'HTTPS / JSON' },
  { id: 'java-1', from: 'api-java', to: 'backend-java', kind: 'java', forwardLabel: 'DTO PAYLOAD' },
  { id: 'java-2', from: 'backend-java', to: 'db-java', kind: 'java', forwardLabel: 'JDBC / SQL' },

  // Node Fork
  { id: 'fork-node', from: 'react', to: 'api-node', kind: 'node', forwardLabel: 'HTTPS / JSON' },
  { id: 'node-1', from: 'api-node', to: 'backend-node', kind: 'node', forwardLabel: 'REST REQUEST' },
  { id: 'node-2', from: 'backend-node', to: 'db-node', kind: 'node', forwardLabel: 'MONGOOSE' },

  // AI Extension
  { id: 'ai-ext', from: 'backend-node', to: 'ai-service', kind: 'ai', forwardLabel: 'OPTIONAL API CALL', isDashed: true },
];
