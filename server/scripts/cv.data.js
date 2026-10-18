// Authoritative CV data strictly derived from CLAIMS.md and profile.js
// No separate business/startup. No phone number or home address.
// No bracketed placeholders or unverified claims.
export const cvData = {
  name: 'Vishal Sharma',
  role: 'Software Engineer',
  contact: {
    location: 'Jaipur, India',
    email: 'vishal.sharma.tech1@gmail.com',
  },
  summary:
    'Computer Science undergraduate specializing in backend architecture, REST API engineering, and scalable software systems. Experienced in developing secure service layers, relational and document database integrations, and intelligent web applications.',
  education: [
    {
      institution: 'JK Lakshmipat University, Jaipur',
      degree: 'B.Tech in Computer Science and Engineering',
      duration: 'Expected Graduation: 2028',
      status: 'Current Student',
    },
  ],
  experience: [
    {
      organization: 'JGS Jaipur Global Services Pvt. Ltd., Jaipur',
      role: 'Internship',
      duration: '18 May 2026 – 18 July 2026',
      description:
        'Engineered backend service layer and data persistence for SellerLensIQ, an Amazon keyword research and listing SEO platform. Built Spring Boot REST APIs, implemented authentication, CSV bulk ingestion pipeline, and PostgreSQL database models.',
    },
  ],
  skills: {
    frontend: ['JavaScript', 'React'],
    backend: [
      'Java',
      'C++',
      'Python',
      'Spring Boot',
      'REST APIs',
      'Node.js',
      'Express',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'SQL',
    ],
    toolsAndTechnologies: [
      'Git',
      'GitHub',
      'Maven',
      'Postman',
      'Practical AI Integration',
      'AI-Assisted App Development',
    ],
  },
  projects: [
    {
      name: 'SellerLensIQ',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
      status: 'Associated with JGS',
      description:
        'Amazon keyword research and listing SEO intelligence platform. Engineered RESTful endpoints for keyword portfolio tracking, CSV bulk upload pipeline, and PostgreSQL persistence.',
    },
    {
      name: 'ClinicSaaS',
      tech: ['Java', 'Spring Boot', 'REST APIs'],
      status: 'In Progress',
      description:
        'Healthcare clinic management application for administrative and appointment workflows. Implemented structured domain models, doctor scheduling logic, and secure REST endpoints.',
    },
    {
      name: 'Vaani Bill',
      tech: ['React', 'Node.js', 'REST APIs'],
      status: 'Concept',
      description:
        'AI voice point-of-sale concept exploring billing simplification through Hindi, English, and Hinglish speech interactions. (Product concept, not yet deployed).',
    },
  ],
  competencies: [
    'Strict API Contracts & Schema Validation',
    'Relational & Document Persistence Boundaries',
    'Defensive Security & Middleware Architecture',
    'Practical AI Systems Integration',
  ],
};

