// Authoritative Education and Experience Timeline Data
// Strictly verified from owner-stated facts and CLAIMS.md.
// No invented university start year, grades, or fake promotions.

export const timeline = [
  {
    id: 'jklu-btech',
    type: 'education',
    title: 'B.Tech in Computer Science and Engineering',
    organization: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan, India',
    dateLabel: 'Expected Graduation 2028',
    startDate: null, // Start year NOT stated: do not invent it
    endDate: 'Expected 2028',
    isCurrent: true,
    status: 'In Progress · Current Student',
    gitRef: 'origin/academics',
    commitHash: 'btech-2028',
    description:
      'Undergraduate Computer Science and Engineering degree program.',
    highlights: [],
  },
  {
    id: 'jgs-internship',
    type: 'experience',
    // CONFIRM: Official designation not confirmed; "Internship" is a neutral placeholder for Vishal's confirmation
    title: 'Internship',
    organization: 'JGS Jaipur Global Services Pvt. Ltd.',
    location: 'Jaipur, Rajasthan, India',
    dateLabel: '18 May 2026 – 18 July 2026',
    startDate: '18 May 2026',
    endDate: '18 July 2026',
    isCurrent: false,
    status: 'Completed',
    gitRef: 'origin/jgs-internship',
    commitHash: 'jgs-2026',
    description:
      'Software engineering internship focusing on backend service architecture and e-commerce SEO data systems.',
    associatedProject: {
      name: 'SellerLensIQ',
      slug: 'seller-lens-iq',
      context: 'Associated project: SellerLensIQ was developed in this company context.',
    },
    highlights: [],
  },
  {
    id: 'engineering-specialization',
    type: 'engineering',
    title: 'Software Systems & Backend Engineering Focus',
    organization: 'Independent Engineering & Applied Projects',
    location: 'Jaipur, India',
    dateLabel: 'Ongoing',
    startDate: null,
    endDate: 'Present',
    isCurrent: true,
    status: 'Active Building',
    gitRef: 'origin/main',
    commitHash: 'sys-build',
    description:
      'Active development of modular production-style architectures and systems-oriented engineering projects.',
    associatedProject: null,
    highlights: [
      'Spring Boot REST APIs with PostgreSQL relational persistence',
      'Full-stack client-server data lifecycle and state orchestration',
      'System protocol verification and API contract testing via Postman',
    ],
  },
];
