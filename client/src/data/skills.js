// Authoritative Skills and Technologies Data
// Reorganized under faculty headings: Frontend / Backend / Tools & Technologies
// Strictly verified against CLAIMS.md. Evidence-based, with qualitative levels and zero arbitrary percentages.

/**
 * PROFICIENCY DERIVATION RULE (Derivation based on verified CLAIMS.md evidence):
 * - Core (0.90 visual fill): Used in 2+ verified projects (Java, Spring Boot, JavaScript, REST APIs, Maven)
 * - Working (0.60 visual fill): Used in 1 verified project (React, Node.js, Express, PostgreSQL, MongoDB, SQL, Git, GitHub, Postman)
 * - Familiar (0.35 visual fill): Owner-stated / foundational knowledge without multi-project verification (C++, Python, MySQL)
 *
 * NOTE FOR OVERRIDES: To customize a skill level, adjust the `level` property directly on the skill object below.
 */
export const LEVEL_MAP = {
  core: {
    label: 'Core',
    ratio: 0.9,
    description: 'Core proficiency — verified across 2+ projects',
  },
  working: {
    label: 'Working',
    ratio: 0.6,
    description: 'Working proficiency — verified in project implementations',
  },
  familiar: {
    label: 'Familiar',
    ratio: 0.35,
    description: 'Familiar — foundational knowledge & applied exploration',
  },
};

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
        level: 'core',
        evidence: 'Core · used in SellerLensIQ, Vaani Bill',
        evidenceType: 'project',
        usedIn: ['SellerLensIQ', 'Vaani Bill'],
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
        level: 'core',
        evidence: 'Core · used in SellerLensIQ, ClinicSaaS, Vaani Bill',
        evidenceType: 'project',
        usedIn: ['SellerLensIQ', 'ClinicSaaS', 'Vaani Bill'],
        projectCount: 3,
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
            level: 'core',
            evidence: 'Core · used in SellerLensIQ, ClinicSaaS',
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
            level: 'working',
            evidence: 'Working · used in Vaani Bill, Portfolio Server',
            evidenceType: 'project',
            usedIn: ['Vaani Bill', 'Portfolio Server'],
            projectCount: 2,
            brandColor: '#5FA04E',
            context: 'Asynchronous event-driven backend runtime powering APIs and services.',
            relations: ['express', 'javascript', 'mongodb'],
          },
          {
            id: 'cpp',
            name: 'C++',
            group: 'backend',
            sub: 'Language',
            level: 'familiar',
            evidence: 'Familiar · foundational systems knowledge',
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
            level: 'familiar',
            evidence: 'Familiar · scripting and data experimentation',
            evidenceType: 'knowledge',
            usedIn: [],
            projectCount: 0,
            brandColor: '#3776AB',
            context: 'Automation scripting, data processing, and exploratory model prototyping.',
            relations: ['prompt-engineering', 'practical-ai'],
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
            level: 'core',
            evidence: 'Core · used in SellerLensIQ, ClinicSaaS',
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
            level: 'working',
            evidence: 'Working · used in Portfolio Server',
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
            level: 'core',
            evidence: 'Core · used in Portfolio Server, SellerLensIQ, ClinicSaaS',
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
            level: 'working',
            evidence: 'Working · used in SellerLensIQ',
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
            level: 'working',
            evidence: 'Working · used in Portfolio Server',
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
            level: 'familiar',
            evidence: 'Familiar · relational schema design',
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
            level: 'working',
            evidence: 'Working · used in SellerLensIQ',
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

  ai: {
    title: 'Applied AI & Intelligent Systems',
    nodeLabel: '03.3 / APPLIED AI',
    description: 'Generative AI integration, structured prompt engineering, and intelligent application workflows.',
    items: [
      {
        id: 'prompt-engineering',
        name: 'Prompt Engineering',
        group: 'ai',
        sub: 'Technique',
        level: 'working',
        evidence: 'Certified · Google AI Essentials & IBM Generative AI',
        evidenceType: 'project',
        usedIn: ['IBM Prompt Spec.', 'Google AI Cert.'],
        projectCount: 2,
        brandColor: '#4285F4',
        context: 'Structured system instructions, few-shot prompt formulation, parameter calibration, and deterministic LLM outputs.',
        relations: ['practical-ai', 'python', 'rest-apis'],
      },
      {
        id: 'practical-ai',
        name: 'Practical AI Systems',
        group: 'ai',
        sub: 'Integration',
        level: 'working',
        evidence: 'Working · applied in Vaani Bill & portfolio architecture',
        evidenceType: 'project',
        usedIn: ['Vaani Bill Concept'],
        projectCount: 1,
        brandColor: '#10A37F',
        context: 'Connecting LLM endpoints to production services, JSON contract enforcement, error boundaries, and contextual prompt augmentation.',
        relations: ['prompt-engineering', 'rest-apis', 'node', 'express'],
      },
      {
        id: 'ai-assisted-dev',
        name: 'AI-Assisted Development',
        group: 'ai',
        sub: 'Toolchain & Flow',
        level: 'working',
        evidence: 'Working · accelerated engineering lifecycle',
        evidenceType: 'knowledge',
        usedIn: [],
        projectCount: 0,
        brandColor: '#8B5CF6',
        context: 'Modern LLM-assisted coding workflows, test automation scaffolding, and context-aware codebase refactoring.',
        relations: ['git', 'github', 'practical-ai'],
      },
      {
        id: 'voice-ai',
        name: 'Speech & Voice AI',
        group: 'ai',
        sub: 'Applied NLP',
        level: 'familiar',
        evidence: 'Familiar · conversational POS architecture concept',
        evidenceType: 'knowledge',
        usedIn: [],
        projectCount: 0,
        brandColor: '#F59E0B',
        context: 'Multilingual speech-to-text pipeline concepts and conversational billing parsing for Hindi, Hinglish, and English.',
        relations: ['practical-ai', 'react'],
      },
    ],
  },

  tools: {
    title: 'Tools & Technologies',
    nodeLabel: '03.4 / TOOLCHAIN & CAPABILITIES',
    description: 'Version control lifecycle, build automation, API contract validation, and developer tooling.',
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
            level: 'working',
            evidence: 'Working · used in Portfolio Repository',
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
            level: 'working',
            evidence: 'Working · used in Portfolio Monorepo',
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
            level: 'core',
            evidence: 'Core · used in SellerLensIQ, ClinicSaaS',
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
            level: 'working',
            evidence: 'Working · used in API Verification',
            evidenceType: 'project',
            usedIn: ['API Verification'],
            projectCount: 1,
            brandColor: '#FF6C37',
            context: 'REST API endpoint testing, request validation, and integration verification.',
            relations: ['rest-apis'],
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
  if (skillsData.ai) {
    list.push(...skillsData.ai.items);
  }
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
