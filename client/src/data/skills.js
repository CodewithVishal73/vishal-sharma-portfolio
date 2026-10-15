/**
 * Skills Data Architecture
 * Visual Technology Cards — No arbitrary percentages or proficiency levels.
 *
 * Organized into four primary groups:
 * - Group A: Languages
 * - Group B: Frontend
 * - Group C: Backend & Databases
 * - Group D: Tools & Engineering
 *
 * Pure JS — no JSX or Vite imports.
 */

export const skillsHeader = {
  eyebrow: '02 / Technical Stack',
  title: 'The Stack',
  subtitle: 'Technologies and tools I use to build software, engineer backend systems, and create modern web experiences.',
};

export const skillGroups = [
  {
    id: 'languages',
    number: '01',
    title: 'Languages',
    category: 'Core Engineering',
    description: 'Foundational programming languages and syntax for robust logic, data structures, and algorithmic execution.',
    skills: [
      {
        id: 'java',
        name: 'Java',
        iconId: 'java',
        context: 'Enterprise & Systems',
      },
      {
        id: 'cpp',
        name: 'C++',
        iconId: 'cpp',
        context: 'Algorithms & STL',
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        iconId: 'javascript',
        context: 'Modern ES6+ & Async',
      },
      {
        id: 'python',
        name: 'Python',
        iconId: 'python',
        context: 'Scripting & Automation',
      },
      {
        id: 'sql',
        name: 'SQL',
        iconId: 'sql',
        context: 'Relational Queries & DDL',
      },
    ],
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend',
    category: 'User Interface',
    description: 'Modern client architectures, component state systems, fluid typography, and responsive web layouts.',
    skills: [
      {
        id: 'react',
        name: 'React',
        iconId: 'react',
        context: 'SPA & Component State',
      },
      {
        id: 'html5',
        name: 'HTML5',
        iconId: 'html5',
        context: 'Semantic & Accessible UI',
      },
      {
        id: 'css3',
        name: 'CSS3',
        iconId: 'css3',
        context: 'Responsive & Modern CSS',
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        iconId: 'tailwind',
        context: 'Utility-First Systems',
      },
    ],
  },
  {
    id: 'backend-databases',
    number: '03',
    title: 'Backend & Databases',
    category: 'Services & Storage',
    description: 'Server frameworks, RESTful API contract design, persistent data storage, and authentication pipelines.',
    skills: [
      {
        id: 'spring-boot',
        name: 'Spring Boot',
        iconId: 'spring-boot',
        context: 'REST & Application Services',
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        iconId: 'nodejs',
        context: 'Asynchronous Event Runtime',
      },
      {
        id: 'express',
        name: 'Express.js',
        iconId: 'express',
        context: 'Routing & Middleware Chains',
      },
      {
        id: 'rest-apis',
        name: 'REST APIs',
        iconId: 'rest-apis',
        context: 'Contract Design & Semantics',
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        iconId: 'postgresql',
        context: 'Relational Modeling & Indexes',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        iconId: 'mysql',
        context: 'Schema Design & Queries',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        iconId: 'mongodb',
        context: 'Document Stores & BSON',
      },
      {
        id: 'mongoose',
        name: 'Mongoose',
        iconId: 'mongoose',
        context: 'ODM & Schema Validation',
      },
      {
        id: 'spring-security',
        name: 'Spring Security',
        iconId: 'spring-security',
        context: 'RBAC & Security Filters',
      },
      {
        id: 'jwt',
        name: 'JWT Authentication',
        iconId: 'jwt',
        context: 'Stateless Token Security',
      },
    ],
  },
  {
    id: 'tools-engineering',
    number: '04',
    title: 'Tools & Engineering',
    category: 'Tooling & Workflow',
    description: 'Version control workflows, dependency managers, API verification tools, and practical AI integration.',
    skills: [
      {
        id: 'git',
        name: 'Git',
        iconId: 'git',
        context: 'Version Control & Branching',
      },
      {
        id: 'github',
        name: 'GitHub',
        iconId: 'github',
        context: 'Collaboration & Repositories',
      },
      {
        id: 'maven',
        name: 'Maven',
        iconId: 'maven',
        context: 'Builds & Lifecycle Mgmt',
      },
      {
        id: 'postman',
        name: 'Postman',
        iconId: 'postman',
        context: 'API Testing & Inspection',
      },
      {
        id: 'ai-integration',
        name: 'Practical AI Integration',
        iconId: 'ai-integration',
        context: 'LLM APIs & Tool Workflows',
      },
    ],
  },
];

// Backwards-compatible structure for CV generation & tooling
export const skills = {
  header: skillsHeader,
  groups: skillGroups,
  layers: skillGroups.map((g) => ({
    id: g.id,
    layerIndex: g.number,
    layerName: g.title,
    category: g.category,
    description: g.description,
    items: g.skills,
  })),
};

export default skills;
