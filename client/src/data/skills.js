/**
 * Skills Data
 * Grouped into three layers: Interface (Frontend), Service (Backend), Foundation (Tools & Technologies).
 * Labels: Beginner (<40), Intermediate (40-69), Advanced (70+).
 * All starter skills are confirmed: false until owner confirms proficiency.
 * Pure JS — no JSX or Vite imports.
 */

export const skills = {
  layers: [
    {
      id: 'interface',
      layerName: 'Interface',
      category: 'Frontend',
      description: 'Interactive client applications, responsive component architecture, and accessible UI engineering.',
      items: [
        {
          name: 'React',
          percent: 65,
          level: 'Intermediate',
          confirmed: false, // replace: set confirmed to true when self-assessed
        },
        {
          name: 'JavaScript',
          percent: 70,
          level: 'Advanced',
          confirmed: false,
        },
        {
          name: 'HTML & CSS',
          percent: 75,
          level: 'Advanced',
          confirmed: false,
        },
      ],
    },
    {
      id: 'service',
      layerName: 'Service',
      category: 'Backend',
      description: 'API design, server architectures, business domain services, and database integration.',
      items: [
        {
          name: 'Java',
          percent: 65,
          level: 'Intermediate',
          confirmed: false,
        },
        {
          name: 'Spring Boot',
          percent: 55,
          level: 'Intermediate',
          confirmed: false,
        },
        {
          name: 'Node.js',
          percent: 60,
          level: 'Intermediate',
          confirmed: false,
        },
        {
          name: 'Express.js',
          percent: 60,
          level: 'Intermediate',
          confirmed: false,
        },
        {
          name: 'PostgreSQL',
          percent: 55,
          level: 'Intermediate',
          confirmed: false,
        },
        {
          name: 'MongoDB',
          percent: 55,
          level: 'Intermediate',
          confirmed: false,
        },
      ],
    },
    {
      id: 'foundation',
      layerName: 'Foundation',
      category: 'Tools & Technologies',
      description: 'Version control, system tooling, execution environments, and core developer infrastructure.',
      items: [
        {
          name: 'Git & GitHub',
          percent: 70,
          level: 'Advanced',
          confirmed: false,
        },
      ],
    },
  ],
};

export default skills;
