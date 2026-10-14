/**
 * Timeline Data (Journey Route)
 * Schema: id, category ('education' | 'experience'), title, organization, location, period, description, placeholder.
 * Experience group is an empty placeholder, omitted in production if empty.
 * Pure JS — no JSX or Vite imports.
 */

export const timeline = {
  education: [
    {
      id: 'edu-btech',
      title: 'BTech in Computer Science',
      organization: 'JK Lakshmipat University',
      location: 'Jaipur, India',
      period: 'Expected graduation 2028',
      description:
        'Undergraduate studies focusing on data structures, algorithms, relational database systems, backend architecture, and software engineering principles.',
      placeholder: false,
    },
    {
      id: 'edu-schooling',
      title: 'Secondary Education (replace in src/data/timeline.js)',
      organization: 'High School / Senior Secondary (replace in src/data/timeline.js)',
      location: 'Jaipur, India',
      period: '2024 (replace)',
      description:
        'Completed senior secondary schooling with concentration in Science / Mathematics. (Replace or remove in src/data/timeline.js).',
      placeholder: true,
    },
  ],

  experience: [
    {
      id: 'exp-placeholder-1',
      title: 'Engineering Internship / Role (replace in src/data/timeline.js)',
      organization: 'Organization Name (replace in src/data/timeline.js)',
      location: 'Location',
      period: 'Dates (replace)',
      description:
        'Honest engineering contribution or academic research role. If no formal experience yet, this group remains empty and is omitted in production.',
      placeholder: true,
    },
  ],
};

export default timeline;
