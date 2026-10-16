// Verified project data for faculty Section 4: Projects Showcase
// All data points strictly verified from PROJECT_CONTEXT.md and TASK P5 specification.
// Any unverified items are flagged with // CONFIRM.

export const projects = [
  {
    slug: 'seller-lens-iq',
    name: 'SellerLensIQ',
    category: 'Full-Stack Engineering',
    summary:
      'An end-to-end Amazon keyword research and SEO intelligence platform for managing keyword portfolios, analyzing competitors, and evaluating product listing quality.',
    problem:
      'Amazon sellers and catalog teams need a centralized way to organize keyword research, evaluate listing quality, track portfolio health, and identify competitor keyword opportunities.',
    built: [
      'React frontend integrated with a Java/Spring Boot REST API.',
      'PostgreSQL-backed data layer for keyword and portfolio management.',
      'JWT-based authentication and organization-level data isolation using PostgreSQL Row-Level Security.',
      'CSV-based bulk keyword import and processing pipeline.',
      'Competitor gap analysis and listing-quality analytics engine.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'React',
      'PostgreSQL',
      'REST APIs',
      'JWT',
      'Git',
      'GitHub',
    ],
    tags: ['Full-Stack', 'Java', 'Spring Boot', 'PostgreSQL', 'React', 'REST APIs'],
    github: null, // CONFIRM: repository URL not provided
    live: null, // CONFIRM: live demo URL not provided
    year: 2024, // CONFIRM: project year
    stage: 'In Development',
    architecture: {
      type: 'implemented',
      title: 'Full-Stack REST Architecture',
      description: 'React Client → Spring Boot REST API (Auth & RLS) → PostgreSQL Database',
      nodes: [
        {
          id: 'client',
          label: 'React Frontend',
          layer: 'Presentation Layer',
          detail: 'Keyword dashboards, CSV ingestion UI, and listing score views',
          x: 65,
          y: 70,
        },
        {
          id: 'api',
          label: 'Spring Boot REST API',
          layer: 'Application Layer',
          detail: 'JWT authentication, controller-service logic & tenant RLS isolation',
          x: 200,
          y: 70,
        },
        {
          id: 'db',
          label: 'PostgreSQL DB',
          layer: 'Persistence Layer',
          detail: 'Keyword portfolios, competitor catalog tables & RLS policies',
          x: 335,
          y: 70,
        },
      ],
      edges: [
        { from: 'client', to: 'api', label: 'HTTPS / REST' },
        { from: 'api', to: 'db', label: 'JDBC / SQL' },
      ],
    },
  },
  {
    slug: 'clinic-saas',
    name: 'ClinicSaaS',
    category: 'Backend & Systems',
    summary:
      'A clinic management platform designed to organize core healthcare administration workflows through a structured software application.',
    problem:
      'Clinics need a consistent way to organize patient information, doctor records, appointments, and related administrative workflows.',
    built: [
      'Java and Spring Boot backend service implementing modular controller-service-repository architecture.',
      'REST API endpoints for doctor records, patient registries, and appointment scheduling.',
      'Relational database integration with MySQL for structured healthcare entities.',
      'DTO-based input validation and centralized exception handling for clinical transactions.',
      'Postman collection test suites covering appointment booking lifecycle.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'MySQL',
      'Maven',
      'REST APIs',
      'Postman',
    ],
    tags: ['Backend', 'Java', 'Spring Boot', 'MySQL', 'REST APIs'],
    github: null, // CONFIRM: repository URL not provided
    live: null, // CONFIRM: live demo URL not provided
    year: 2024, // CONFIRM: project year
    stage: 'Application Prototype',
    architecture: {
      type: 'implemented',
      title: 'Modular Healthcare Backend',
      description: 'Clinic Interface → Spring Boot REST API & Service Layer → MySQL Database',
      nodes: [
        {
          id: 'client',
          label: 'Clinic Interface',
          layer: 'Interface Layer',
          detail: 'Administrative client requests & appointment booking consumers',
          x: 65,
          y: 70,
        },
        {
          id: 'api',
          label: 'Spring Boot API',
          layer: 'Application Layer',
          detail: 'Doctor scheduling logic, patient registries & DTO validators',
          x: 200,
          y: 70,
        },
        {
          id: 'db',
          label: 'MySQL Database',
          layer: 'Persistence Layer',
          detail: 'Relational tables for doctors, patients, and appointment slots',
          x: 335,
          y: 70,
        },
      ],
      edges: [
        { from: 'client', to: 'api', label: 'JSON REST Endpoints' },
        { from: 'api', to: 'db', label: 'JPA / Hibernate' },
      ],
    },
  },
  {
    slug: 'vaani-bill',
    name: 'Vaani Bill',
    subtitle: 'AI Voice POS',
    category: 'Voice AI & Point-of-Sale',
    summary:
      'An AI-assisted voice point-of-sale concept designed to simplify billing for small businesses through Hindi, English, and Hinglish voice interactions.',
    problem:
      'Small-business billing can be slow and inconvenient when users must manually enter every product and transaction detail, particularly when speaking is more practical than typing.',
    built: [
      'Voice-first point-of-sale interface built with React and Tailwind CSS.',
      'Node.js and Express backend service written in TypeScript for transaction orchestration.',
      'Lovable Cloud Database persistence layer for catalog items and ledger entries.',
      'Multilingual voice parsing architecture designed for Hindi, English, and Hinglish workflows (Planned).',
      'Offline queue synchronization, QR-payment integration, and PDF receipt rendering (Planned).',
    ],
    stack: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'TypeScript',
      'Lovable Cloud DB',
    ],
    tags: ['Voice AI', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    github: null, // CONFIRM: repository URL not provided
    live: null, // CONFIRM: live demo URL not provided
    year: 2025, // CONFIRM: project year
    stage: 'Planned Architecture',
    architecture: {
      type: 'planned',
      title: 'Voice-First POS Architecture (Planned)',
      description: 'Voice-Enabled React POS → Node.js / Express (TS) API → Lovable Cloud Database',
      nodes: [
        {
          id: 'client',
          label: 'Voice POS (React)',
          layer: 'Presentation Layer',
          detail: 'Multilingual speech capture (Hindi/Eng/Hinglish) & Tailwind POS',
          x: 65,
          y: 70,
        },
        {
          id: 'api',
          label: 'Node / Express (TS)',
          layer: 'Orchestration Layer',
          detail: 'Audio stream parser, cart assembler & offline transaction queue',
          x: 200,
          y: 70,
        },
        {
          id: 'db',
          label: 'Lovable Cloud DB',
          layer: 'Cloud Persistence',
          detail: 'Product catalog, customer receipts & cloud-synchronized ledgers',
          x: 335,
          y: 70,
        },
      ],
      edges: [
        { from: 'client', to: 'api', label: 'Audio & Cart Payload' },
        { from: 'api', to: 'db', label: 'Cloud DB Queries' },
      ],
    },
  },
];

// Helper to get project by slug
export function getProjectBySlug(slug) {
  if (!slug) return null;
  return projects.find((p) => p.slug === slug.toLowerCase()) || null;
}

// Helper to get adjacent projects for prev/next navigation
export function getAdjacentProjects(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };

  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];

  return { prev, next };
}

// Helper to extract all unique tags dynamically
export function getAllProjectTags() {
  const tagSet = new Set();
  projects.forEach((p) => {
    p.tags.forEach((t) => tagSet.add(t));
  });
  return ['All', ...Array.from(tagSet)];
}
