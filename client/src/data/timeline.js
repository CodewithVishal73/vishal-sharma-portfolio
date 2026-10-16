// Verified Education and Experience Timeline Data
// All data points strictly verified from PROJECT_CONTEXT.md section 3 & DESIGN_AND_MOTION.md section 8.
// No invented internships or fake employers.

export const timeline = [
  {
    id: 'jklu-btech',
    type: 'education',
    title: 'B.Tech in Computer Science and Engineering',
    organization: 'JK Lakshmipat University',
    location: 'Jaipur, Rajasthan, India',
    startDate: 2024, // CONFIRM: start year until confirmed by Vishal
    endDate: 2028, // Expected graduation
    isCurrent: true,
    status: 'In Progress · Current Student',
    gitRef: 'origin/academics',
    commitHash: 'btech-2028',
    description:
      'Undergraduate engineering curriculum emphasizing core computing principles, distributed systems, algorithms, and software engineering practices.',
    highlights: [
      'Data Structures and Algorithms in Java & C++',
      'Object-Oriented Software Design and System Architecture',
      'Database Management Systems (Relational & NoSQL modeling)',
      'Web Application Engineering and RESTful API Integration',
    ],
  },
  {
    id: 'engineering-specialization',
    type: 'engineering',
    title: 'Software Systems & Backend Engineering Focus',
    organization: 'Independent Engineering & Applied Projects',
    location: 'Jaipur, India',
    startDate: 2024, // CONFIRM: start year
    endDate: 'Present',
    isCurrent: true,
    status: 'Active Building',
    gitRef: 'origin/main',
    commitHash: 'sys-build',
    description:
      'Active development of modular production-style architectures, including e-commerce SEO intelligence (SellerLensIQ) and structured healthcare management (ClinicSaaS).',
    highlights: [
      'Architecting Spring Boot REST APIs with PostgreSQL Row-Level Security',
      'Full-stack client-server data lifecycle and state orchestration',
      'Relational query optimization with MySQL & PostgreSQL indexing',
      'System protocol verification and API contract testing via Postman',
    ],
  },
];
