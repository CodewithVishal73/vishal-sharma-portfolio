// Intelligent Systems Layer architecture data
// Grounded strictly in owner-stated interests and verified portfolio facts.
// Contains NO vendor lock-in, NO unverified claims, NO fake production AI claims.

export const intelligenceCopy = {
  heading: 'Practical Intelligence Integration',
  subheading:
    'I focus on integrating intelligent capabilities into practical software systems, bridging structured application logic and persistent data stores with external intelligence services.',
  caption:
    'Educational architecture diagram — not part of this site\'s runtime unless marked.',
};

export const EVIDENCE_TIERS = {
  verified: {
    id: 'verified',
    label: 'Implemented & verified',
    badgeVariant: 'ok',
    description: 'Confirmed by verifiable source code in this repository.',
  },
  demonstrated: {
    id: 'demonstrated',
    label: 'Demonstrated in a project',
    badgeVariant: 'signal',
    description: 'Built and verified as part of an applied project architecture.',
  },
  conceptual: {
    id: 'conceptual',
    label: 'Conceptual / planned',
    badgeVariant: 'default',
    description: 'Architectural direction or planned integration pattern.',
  },
};

export const intelligenceNodes = [
  {
    id: 'user-app',
    number: '01',
    name: 'User / Application',
    role: 'Client interface & trigger',
    description:
      'Initiates operational actions, user queries, or automated events that require processing and intelligent assistance.',
    tier: 'Implemented & verified',
    source: 'Portfolio Client (React 18)',
    statusVariant: 'ok',
  },
  {
    id: 'app-logic',
    number: '02',
    name: 'Application Logic',
    role: 'Core business & service orchestration',
    description:
      'Executes domain rules, validates parameters, handles authorization, and manages transaction boundaries.',
    tier: 'Implemented & verified',
    source: 'Portfolio Server (Express) & SellerLensIQ (Spring Boot)',
    statusVariant: 'ok',
  },
  {
    id: 'api-layer',
    number: '03',
    name: 'API Integration Layer',
    role: 'Adapter & schema translator',
    description:
      'Provides contract translation, auth propagation, rate-limit safeguards, and graceful error fallbacks for external APIs.',
    tier: 'Demonstrated in a project',
    source: 'REST API architectures in Portfolio & SellerLensIQ',
    statusVariant: 'signal',
  },
  {
    id: 'ai-service',
    number: '04',
    name: 'External AI Service',
    role: 'Generic model / intelligence endpoint',
    description:
      'Processes unstructured inputs (such as text or speech) and returns structured predictions. Generic interface without provider lock-in.',
    tier: 'Conceptual / planned',
    source: 'Exploratory architecture pattern',
    statusVariant: 'default',
  },
  {
    id: 'db-context',
    number: '05',
    name: 'Database & Context',
    role: 'Relational & persistent context store',
    description:
      'Persists user profiles, catalog entities, session state, and interaction logs for reliable recall.',
    tier: 'Implemented & verified',
    source: 'MongoDB Atlas (Portfolio) & PostgreSQL (SellerLensIQ)',
    statusVariant: 'ok',
  },
];

export const intelligenceScenarios = [
  {
    id: 'augment-app',
    number: 'S1',
    title: 'Add an AI feature to an existing app',
    description:
      'Augments an existing backend service with external intelligence while preserving business logic, authentication, and database schemas.',
    tier: 'Conceptual / planned',
    statusVariant: 'default',
    source: 'Practical AI integration concept',
    pathNodes: ['user-app', 'app-logic', 'api-layer', 'ai-service', 'app-logic', 'user-app'],
    flowSequence: [
      { from: 'user-app', to: 'app-logic', label: '1. User action' },
      { from: 'app-logic', to: 'api-layer', label: '2. Prepare payload' },
      { from: 'api-layer', to: 'ai-service', label: '3. Inference call' },
      { from: 'ai-service', to: 'app-logic', label: '4. Structured result' },
      { from: 'app-logic', to: 'user-app', label: '5. Rendered view' },
    ],
    takeaway:
      'Decouples the core domain from external AI changes, maintaining reliability and deterministic fallback behaviors.',
  },
  {
    id: 'voice-pos',
    number: 'S2',
    title: 'Voice input to structured data (Vaani Bill concept)',
    description:
      'Processes spoken billing inputs (Hindi / English / Hinglish) through an audio service to extract product line-items and save to persistent storage.',
    tier: 'Conceptual / planned',
    statusVariant: 'default',
    source: 'Vaani Bill concept (Owner-stated)',
    pathNodes: ['user-app', 'api-layer', 'ai-service', 'app-logic', 'db-context'],
    flowSequence: [
      { from: 'user-app', to: 'api-layer', label: '1. Speech audio stream' },
      { from: 'api-layer', to: 'ai-service', label: '2. Speech-to-text / parsing' },
      { from: 'ai-service', to: 'app-logic', label: '3. Extracted line items' },
      { from: 'app-logic', to: 'db-context', label: '4. Persist cart & ledger' },
    ],
    takeaway:
      'Transforms unstructured speech dialogue into validated database records without manual keyboard typing.',
  },
  {
    id: 'persisted-context',
    number: 'S3',
    title: 'Persisted context for repeat use',
    description:
      'Retrieves stored user settings and prior history from the database to contextualize requests and records the outcome back into storage.',
    tier: 'Conceptual / planned',
    statusVariant: 'default',
    source: 'Stateful application pattern',
    pathNodes: ['user-app', 'app-logic', 'db-context', 'api-layer', 'ai-service', 'db-context'],
    flowSequence: [
      { from: 'user-app', to: 'app-logic', label: '1. User query' },
      { from: 'app-logic', to: 'db-context', label: '2. Read context' },
      { from: 'db-context', to: 'api-layer', label: '3. Hydrated payload' },
      { from: 'api-layer', to: 'ai-service', label: '4. Prompt + context' },
      { from: 'ai-service', to: 'db-context', label: '5. Update history' },
    ],
    takeaway:
      'Maintains continuity across stateless API calls by anchoring conversation and user context in persistent storage.',
  },
];
