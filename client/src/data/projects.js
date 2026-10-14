/**
 * Projects Data
 * Schema: id, name, description, stack[], github, live, screenshot (optional), featured, placeholder.
 * Placeholders are marked placeholder: true.
 * Pure JS — no JSX or Vite imports.
 */

export const projects = [
  {
    id: 'portfolio-descent',
    name: 'Personal Portfolio',
    description:
      'Architectural personal developer portfolio built on the Descent metaphor. Features dual themes, contrast-validated tone depth, a Resend-ready contact flow, and automated CV document generation.',
    stack: ['React', 'JavaScript', 'Vite', 'CSS Modules', 'Framer Motion'],
    github: 'https://github.com/replace-with-username/portfolio', // replace with actual repo URL
    live: 'https://replace-with-live-url.vercel.app', // replace with actual deployment URL
    screenshot: null,
    featured: true,
    placeholder: false, // The portfolio itself is real; repo/live links are placeholders until deployed
  },
  {
    id: 'project-placeholder-2',
    name: 'Project Two (replace in src/data/projects.js)',
    description:
      'Backend REST API or full-stack web application demonstrating database design, authentication, and service orchestration. Replace this text with your project overview.', // replace in src/data/projects.js
    stack: ['Java', 'Spring Boot', 'PostgreSQL'],
    github: '', // replace in src/data/projects.js
    live: '', // replace in src/data/projects.js
    screenshot: null,
    featured: false,
    placeholder: true,
  },
  {
    id: 'project-placeholder-3',
    name: 'Project Three (replace in src/data/projects.js)',
    description:
      'Full-stack MERN or interactive web application featuring state management and responsive client experiences. Replace this text with your project overview.', // replace in src/data/projects.js
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: '', // replace in src/data/projects.js
    live: '', // replace in src/data/projects.js
    screenshot: null,
    featured: false,
    placeholder: true,
  },
];

export default projects;
