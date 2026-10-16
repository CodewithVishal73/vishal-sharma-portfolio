// Verified skills only from PROJECT_CONTEXT.md section 3 & DESIGN_AND_MOTION.md section 6
// Levels: 'learning' (0.35) | 'working' (0.55) | 'comfortable' (0.75) | 'strong' (0.90)
// Marked // CONFIRM until verified by Vishal

export const LEVEL_MAP = {
  learning: { value: 0.35, label: 'Learning' },
  working: { value: 0.55, label: 'Working' },
  comfortable: { value: 0.75, label: 'Comfortable' },
  strong: { value: 0.90, label: 'Strong' },
};

export const skills = {
  frontend: [
    {
      id: 'javascript',
      name: 'JavaScript',
      group: 'frontend',
      level: 'comfortable', // CONFIRM
      brandColor: '#F7DF1E',
      evidence: 'Full-stack application logic across React, Node.js & Portfolio',
      relations: ['react', 'node'],
    },
    {
      id: 'react',
      name: 'React',
      group: 'frontend',
      level: 'comfortable', // CONFIRM
      brandColor: '#61DAFB',
      evidence: 'Frontend interfaces for SellerLensIQ, Vaani Bill & Portfolio',
      relations: ['javascript'],
    },
  ],

  backend: {
    languages: [
      {
        id: 'java',
        name: 'Java',
        group: 'backend',
        sub: 'Languages',
        level: 'comfortable', // CONFIRM
        brandColor: '#ED8B00',
        evidence: 'Enterprise backend services for SellerLensIQ & ClinicSaaS',
        relations: ['spring-boot'],
      },
      {
        id: 'cpp',
        name: 'C++',
        group: 'backend',
        sub: 'Languages',
        level: 'working', // CONFIRM
        brandColor: '#00599C',
        evidence: 'Object-oriented programming, data structures & core algorithms',
        relations: [],
      },
      {
        id: 'python',
        name: 'Python',
        group: 'backend',
        sub: 'Languages',
        level: 'working', // CONFIRM
        brandColor: '#3776AB',
        evidence: 'Data processing, automation scripts & AI experimentation',
        relations: [],
      },
    ],

    frameworks: [
      {
        id: 'spring-boot',
        name: 'Spring Boot',
        group: 'backend',
        sub: 'Frameworks & APIs',
        level: 'comfortable', // CONFIRM
        brandColor: '#6DB33F',
        evidence: 'REST controllers, service layers & security in SellerLensIQ & ClinicSaaS',
        relations: ['java', 'rest-apis', 'mysql', 'postgres'],
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        group: 'backend',
        sub: 'Frameworks & APIs',
        level: 'strong', // CONFIRM
        brandColor: '#FF6C37',
        evidence: 'Contract-first API design across SellerLensIQ, ClinicSaaS & Vaani Bill',
        relations: ['spring-boot', 'express'],
      },
      {
        id: 'node',
        name: 'Node.js',
        group: 'backend',
        sub: 'Frameworks & APIs',
        level: 'comfortable', // CONFIRM
        brandColor: '#5FA04E',
        evidence: 'Backend service for Vaani Bill (AI Voice POS) & Portfolio API',
        relations: ['express', 'javascript'],
      },
      {
        id: 'express',
        name: 'Express',
        group: 'backend',
        sub: 'Frameworks & APIs',
        level: 'comfortable', // CONFIRM
        brandColor: '#EAF1EE',
        evidence: 'REST routing and middleware for Vaani Bill & Portfolio server',
        relations: ['node', 'mongodb', 'rest-apis'],
      },
    ],

    databases: [
      {
        id: 'mongodb',
        name: 'MongoDB',
        group: 'backend',
        sub: 'Databases',
        level: 'comfortable', // CONFIRM
        brandColor: '#47A248',
        evidence: 'Document store for Portfolio contact submissions & inquiries',
        relations: ['express'],
      },
      {
        id: 'postgres',
        name: 'PostgreSQL',
        group: 'backend',
        sub: 'Databases',
        level: 'working', // CONFIRM
        brandColor: '#4169E1',
        evidence: 'Relational data store & tenant RLS isolation in SellerLensIQ',
        relations: ['sql', 'spring-boot'],
      },
      {
        id: 'mysql',
        name: 'MySQL',
        group: 'backend',
        sub: 'Databases',
        level: 'comfortable', // CONFIRM
        brandColor: '#4479A1',
        evidence: 'Relational database schema & registries for ClinicSaaS',
        relations: ['spring-boot', 'sql'],
      },
      {
        id: 'sql',
        name: 'SQL',
        group: 'backend',
        sub: 'Databases',
        level: 'comfortable', // CONFIRM
        brandColor: '#336791',
        evidence: 'Relational query design, indexing & DDL across Postgres & MySQL',
        relations: ['postgres', 'mysql'],
      },
    ],
  },

  tools: [
    {
      id: 'git',
      name: 'Git',
      group: 'tools',
      level: 'strong', // CONFIRM
      brandColor: '#F05032',
      evidence: 'Branch management, rebasing & commit discipline',
      relations: ['github'],
    },
    {
      id: 'github',
      name: 'GitHub',
      group: 'tools',
      level: 'strong', // CONFIRM
      brandColor: '#EAF1EE',
      evidence: 'Monorepo hosting, actions & release management',
      relations: ['git'],
    },
    {
      id: 'maven',
      name: 'Maven',
      group: 'tools',
      level: 'working', // CONFIRM
      brandColor: '#C71A36',
      evidence: 'Build automation & dependency management for ClinicSaaS & Java services',
      relations: ['java', 'spring-boot'],
    },
    {
      id: 'postman',
      name: 'Postman',
      group: 'tools',
      level: 'strong', // CONFIRM
      brandColor: '#FF6C37',
      evidence: 'REST API testing, collection runs & schema validation for ClinicSaaS',
      relations: ['rest-apis'],
    },
  ],
};

export function getAllSkills() {
  return [
    ...skills.frontend,
    ...skills.backend.languages,
    ...skills.backend.frameworks,
    ...skills.backend.databases,
    ...skills.tools,
  ];
}

export function getRelatedSkillIds(activeId) {
  if (!activeId) return [];
  const all = getAllSkills();
  const current = all.find((s) => s.id === activeId);
  if (!current) return [];

  const related = new Set(current.relations || []);

  // Add reciprocal relations (if skill X lists activeId in relations, include X)
  all.forEach((s) => {
    if (s.relations && s.relations.includes(activeId)) {
      related.add(s.id);
    }
  });

  return Array.from(related);
}

