// Verified project data for faculty Section 4: Projects Showcase
// Strictly aligned with owner-stated facts and CLAIMS.md.
// All claims adhere strictly to verification constraints: no multitenancy, no unverified metrics.

export const projects = [
  {
    slug: 'seller-lens-iq',
    name: 'SellerLensIQ',
    status: 'in-progress',
    stage: 'In Progress',
    category: 'Full-Stack Engineering',
    summary:
      'An Amazon keyword research and listing SEO intelligence platform for keyword portfolio management and listing quality evaluation.',
    problem:
      'Amazon catalog managers lack a unified backend service to import bulk keyword data via CSV, manage keyword portfolios, and evaluate listing SEO performance.',
    built: [
      'Spring Boot REST API service layer for keyword and portfolio management.',
      'PostgreSQL database persistence for listing catalog and keyword datasets.',
      'Authentication service for user session and credential handling.',
      'CSV file ingestion pipeline for bulk keyword data uploads.',
      'Listing SEO quality and keyword performance analytics computation.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'REST APIs',
    ],
    tags: ['Full-Stack', 'Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    github: null, // Repository is private / not publicly hosted
    live: null, // No public live deployment hosted yet
    year: 2024,
    architecture: {
      type: 'implemented',
      title: 'Full-Stack Service Architecture',
      description: 'Client Interface → Spring Boot REST API → PostgreSQL Database',
      nodes: [
        {
          id: 'client',
          label: 'Client Interface',
          layer: 'Presentation Layer',
          detail: 'Keyword management dashboards and CSV upload interface',
          x: 65,
          y: 70,
        },
        {
          id: 'api',
          label: 'Spring Boot REST API',
          layer: 'Application Layer',
          detail: 'Authentication, service logic & listing SEO analytics',
          x: 200,
          y: 70,
        },
        {
          id: 'db',
          label: 'PostgreSQL Database',
          layer: 'Persistence Layer',
          detail: 'Keyword portfolios and listing catalog persistence',
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
    status: 'in-progress',
    stage: 'In Progress',
    category: 'Backend & Systems',
    summary:
      'A structured clinic management application designed to organize core healthcare administration and appointment workflows.',
    problem:
      'Healthcare clinics face administrative friction when managing doctor availability, patient intake records, and appointment scheduling.',
    built: [
      'Java and Spring Boot application core for clinic operational workflows.',
      'REST endpoints for doctor schedules, patient intake records, and appointments.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'REST APIs',
    ],
    tags: ['Backend', 'Java', 'Spring Boot', 'REST APIs'],
    github: null, // Repository is private / not publicly hosted
    live: null, // No public live deployment hosted yet
    year: 2024,
    architecture: {
      type: 'implemented',
      title: 'Modular Healthcare Backend',
      description: 'Clinic Consumer → Spring Boot REST API → Relational Database',
      nodes: [
        {
          id: 'client',
          label: 'Clinic Interface',
          layer: 'Interface Layer',
          detail: 'Administrative client requests & appointment workflows',
          x: 65,
          y: 70,
        },
        {
          id: 'api',
          label: 'Spring Boot API',
          layer: 'Application Layer',
          detail: 'Doctor scheduling logic and patient records services',
          x: 200,
          y: 70,
        },
        {
          id: 'db',
          label: 'Relational Database',
          layer: 'Persistence Layer',
          detail: 'Data persistence for doctors, patients, and appointments',
          x: 335,
          y: 70,
        },
      ],
      edges: [
        { from: 'client', to: 'api', label: 'JSON REST Endpoints' },
        { from: 'api', to: 'db', label: 'JDBC / SQL' },
      ],
    },
  },
  {
    slug: 'vaani-bill',
    name: 'Vaani Bill',
    subtitle: 'AI Voice POS Concept',
    status: 'concept',
    stage: 'Concept',
    category: 'Voice AI & Point-of-Sale (Concept)',
    summary:
      'An AI-assisted voice point-of-sale concept designed to explore billing simplification through Hindi, English, and Hinglish speech interactions.',
    problem:
      'Retail billing counters experience input bottlenecks during peak hours when entering product itemization manually instead of using spoken dialogue.',
    built: [],
    planned: [
      'Multilingual voice capture concept supporting Hindi, English, and Hinglish phrases.',
      'Planned speech parsing model to identify catalog items and quantities from spoken phrases.',
      'Planned transaction orchestration service for billing workflow and invoice creation.',
      'Planned integration with payment gateways and receipt printers.',
    ],
    stack: [
      'React',
      'Node.js',
      'REST APIs',
    ],
    tags: ['Voice AI Concept', 'React', 'Node.js', 'REST APIs'],
    github: null, // Repository is private / concept stage
    live: null, // No public live deployment (concept stage)
    year: 2025,
    architecture: {
      type: 'planned',
      title: 'Planned Voice POS Architecture (Concept)',
      description: 'Planned Concept: Multilingual Speech Capture → Orchestration API → Data Persistence',
      nodes: [
        {
          id: 'client',
          label: 'Planned POS UI',
          layer: 'Presentation Concept',
          detail: 'Multilingual speech capture concept (Hindi / English / Hinglish)',
          x: 65,
          y: 70,
        },
        {
          id: 'api',
          label: 'Planned API Layer',
          layer: 'Orchestration Concept',
          detail: 'Planned audio stream ingestion & cart parsing pipeline',
          x: 200,
          y: 70,
        },
        {
          id: 'db',
          label: 'Planned Persistence',
          layer: 'Persistence Concept',
          detail: 'Planned catalog items and transaction records storage',
          x: 335,
          y: 70,
        },
      ],
      edges: [
        { from: 'client', to: 'api', label: 'Audio & Payload (Planned)' },
        { from: 'api', to: 'db', label: 'Queries (Planned)' },
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
