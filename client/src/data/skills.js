// Authoritative Skills and Technologies Data
// Reorganized under faculty headings: Frontend / Backend / Tools & Technologies
// Strictly verified against CLAIMS.md. Evidence-based, with zero arbitrary scores or percentage numbers.

export const skillsData = {
  frontend: {
    title: 'Frontend',
    nodeLabel: '03.1 / CLIENT',
    description: 'Component architecture, responsive hierarchy, and reactive client state systems.',
    items: [
      {
        id: 'javascript',
        name: 'JavaScript',
        group: 'frontend',
        sub: 'Language',
        evidenceType: 'project',
        usedIn: ['Portfolio Client', 'Portfolio Server'],
        projectCount: 2,
        brandColor: '#F7DF1E',
        context: 'Interactive client state, server runtime, and reactive asynchronous event handling.',
        relations: ['react', 'node', 'express'],
      },
      {
        id: 'react',
        name: 'React',
        group: 'frontend',
        sub: 'UI Library',
        evidenceType: 'project',
        usedIn: ['Portfolio Client'],
        projectCount: 1,
        brandColor: '#61DAFB',
        context: 'Component-driven user interfaces, React 18 hooks, and modular UI state.',
        relations: ['javascript', 'rest-apis'],
      },
    ],
  },

  backend: {
    title: 'Backend',
    nodeLabel: '03.2 / SERVER & RUNTIME',
    description: 'Service frameworks, enterprise APIs, and relational & document persistence layers.',
    subgroups: [
      {
        id: 'languages-runtimes',
        title: 'Languages and runtimes',
        items: [
          {
            id: 'java',
            name: 'Java',
            group: 'backend',
            sub: 'Language',
            evidenceType: 'project',
            usedIn: ['SellerLensIQ', 'ClinicSaaS'],
            projectCount: 2,
            brandColor: '#ED8B00',
            context: 'Enterprise backend services, strong typing, and object-oriented service architecture.',
            relations: ['spring-boot', 'maven'],
          },
          {
            id: 'node',
            name: 'Node.js',
            group: 'backend',
            sub: 'Runtime',
            evidenceType: 'project',
            usedIn: ['Portfolio Server'],
            projectCount: 1,
            brandColor: '#5FA04E',
            context: 'Asynchronous event-driven backend runtime powering this portfolio site.',
            relations: ['express', 'javascript', 'mongodb'],
          },
          {
            id: 'cpp',
            name: 'C++',
            group: 'backend',
            sub: 'Language',
            evidenceType: 'knowledge',
            usedIn: [],
            projectCount: 0,
            brandColor: '#00599C',
            context: 'Core data structures, algorithms, memory management, and computational logic.',
            relations: ['java'],
          },
          {
            id: 'python',
            name: 'Python',
            group: 'backend',
            sub: 'Language',
            evidenceType: 'knowledge',
            usedIn: [],
            projectCount: 0,
            brandColor: '#3776AB',
            context: 'Automation scripting, data processing, and exploratory model prototyping.',
            relations: ['practical-ai'],
          },
        ],
      },
      {
        id: 'frameworks',
        title: 'Frameworks',
        items: [
          {
            id: 'spring-boot',
            name: 'Spring Boot',
            group: 'backend',
            sub: 'Framework',
            evidenceType: 'project',
            usedIn: ['SellerLensIQ', 'ClinicSaaS'],
            projectCount: 2,
            brandColor: '#6DB33F',
            context: 'REST controllers, dependency injection, and data persistence in Java services.',
            relations: ['java', 'postgres', 'rest-apis', 'maven'],
          },
          {
            id: 'express',
            name: 'Express',
            group: 'backend',
            sub: 'Framework',
            evidenceType: 'project',
            usedIn: ['Portfolio Server'],
            projectCount: 1,
            brandColor: '#EAF1EE',
            context: 'REST API routing, middleware chaining, and validation for this site.',
            relations: ['node', 'mongodb', 'rest-apis'],
          },
        ],
      },
      {
        id: 'apis-architecture',
        title: 'APIs and architecture',
        items: [
          {
            id: 'rest-apis',
            name: 'REST APIs',
            group: 'backend',
            sub: 'Architecture',
            evidenceType: 'project',
            usedIn: ['Portfolio Server', 'SellerLensIQ', 'ClinicSaaS'],
            projectCount: 3,
            brandColor: '#FF6C37',
            context: 'HTTP resource design, schema contracts, JSON payload validation, and status code semantics.',
            relations: ['spring-boot', 'express', 'react', 'postman'],
          },
        ],
      },
      {
        id: 'databases',
        title: 'Databases',
        items: [
          {
            id: 'postgres',
            name: 'PostgreSQL',
            group: 'backend',
            sub: 'Relational DB',
            evidenceType: 'project',
            usedIn: ['SellerLensIQ'],
            projectCount: 1,
            brandColor: '#4169E1',
            context: 'Relational database schema modeling, indexing, and transactional SQL in SellerLensIQ.',
            relations: ['sql', 'spring-boot'],
          },
          {
            id: 'mongodb',
            name: 'MongoDB',
            group: 'backend',
            sub: 'Document Store',
            evidenceType: 'project',
            usedIn: ['Portfolio Server'],
            projectCount: 1,
            brandColor: '#47A248',
            context: 'NoSQL document schema, Mongoose ODM validation, and Atlas cloud persistence.',
            relations: ['express', 'node'],
          },
          {
            id: 'mysql',
            name: 'MySQL',
            group: 'backend',
            sub: 'Relational DB',
            evidenceType: 'knowledge',
            usedIn: [],
            projectCount: 0,
            brandColor: '#4479A1',
            context: 'Relational database design, table normalization, and structured SQL querying.',
            relations: ['sql', 'spring-boot'],
          },
          {
            id: 'sql',
            name: 'SQL',
            group: 'backend',
            sub: 'Query Language',
            evidenceType: 'project',
            usedIn: ['SellerLensIQ'],
            projectCount: 1,
            brandColor: '#336791',
            context: 'Structured query formulation, joins, indexing, and relational DDL/DML statements.',
            relations: ['postgres', 'mysql'],
          },
        ],
      },
    ],
  },

  tools: {
    title: 'Tools & Technologies',
    nodeLabel: '03.3 / TOOLCHAIN & CAPABILITIES',
    description: 'Version control lifecycle, build automation, API contract validation, and practical AI augmentation.',
    subgroups: [
      {
        id: 'developer-tools',
        title: 'Developer tools',
        items: [
          {
            id: 'git',
            name: 'Git',
            group: 'tools',
            sub: 'Version Control',
            evidenceType: 'project',
            usedIn: ['Portfolio Repository'],
            projectCount: 1,
            brandColor: '#F05032',
            context: 'Feature branch workflows, commit hygiene, rebasing, and repository management.',
            relations: ['github'],
          },
          {
            id: 'github',
            name: 'GitHub',
            group: 'tools',
            sub: 'Collaboration',
            evidenceType: 'project',
            usedIn: ['Portfolio Monorepo'],
            projectCount: 1,
            brandColor: '#EAF1EE',
            context: 'Remote collaboration, code review, issue tracking, and repository hosting.',
            relations: ['git'],
          },
          {
            id: 'maven',
            name: 'Maven',
            group: 'tools',
            sub: 'Build Tool',
            evidenceType: 'project',
            usedIn: ['SellerLensIQ', 'ClinicSaaS'],
            projectCount: 2,
            brandColor: '#C71A36',
            context: 'POM configuration, dependency resolution, and build automation for Java/Spring services.',
            relations: ['java', 'spring-boot'],
          },
          {
            id: 'postman',
            name: 'Postman',
            group: 'tools',
            sub: 'API Testing',
            evidenceType: 'project',
            usedIn: ['API Verification'],
            projectCount: 1,
            brandColor: '#FF6C37',
            context: 'REST API endpoint testing, request validation, and integration verification.',
            relations: ['rest-apis'],
          },
        ],
      },
      {
        id: 'ai-integration',
        title: 'AI integration',
        items: [
          {
            id: 'practical-ai',
            name: 'Practical AI Integration',
            group: 'tools',
            sub: 'Capability',
            evidenceType: 'knowledge',
            usedIn: [],
            projectCount: 0,
            brandColor: '#7DF2C4',
            context: 'Integrating intelligent features into standard software architectures without vendor lock-in.',
            relations: ['ai-assisted', 'python'],
          },
          {
            id: 'ai-assisted',
            name: 'AI-Assisted App Development',
            group: 'tools',
            sub: 'Capability',
            evidenceType: 'knowledge',
            usedIn: [],
            projectCount: 0,
            brandColor: '#7DF2C4',
            context: 'Prompt workflow orchestration, system prompting, and developer productivity tooling.',
            relations: ['practical-ai'],
          },
        ],
      },
    ],
  },
};

// Flattened helper for lookups and relations
export function getAllSkills() {
  const list = [...skillsData.frontend.items];
  skillsData.backend.subgroups.forEach((sg) => {
    list.push(...sg.items);
  });
  skillsData.tools.subgroups.forEach((sg) => {
    list.push(...sg.items);
  });
  return list;
}

export function getSkillById(id) {
  if (!id) return null;
  return getAllSkills().find((s) => s.id === id) || null;
}

export function getRelatedSkillIds(activeId) {
  if (!activeId) return [];
  const all = getAllSkills();
  const current = all.find((s) => s.id === activeId);
  if (!current) return [];

  const related = new Set(current.relations || []);

  // Reciprocal relations
  all.forEach((s) => {
    if (s.relations && s.relations.includes(activeId)) {
      related.add(s.id);
    }
  });

  return Array.from(related);
}
