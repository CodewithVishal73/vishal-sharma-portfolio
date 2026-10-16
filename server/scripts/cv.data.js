// CV facts source of truth - only verified facts from PROJECT_CONTEXT.md section 3
export const cvData = {
  name: 'Vishal Sharma',
  education: {
    degree: 'B.Tech Computer Science and Engineering',
    institution: 'JK Lakshmipat University, Jaipur',
    expectedGraduation: 2028,
  },
  skills: {
    languages: ['Java', 'C++', 'JavaScript', 'Python', 'SQL'],
    frameworks: ['Spring Boot', 'REST APIs', 'React', 'Node.js', 'Express'],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
    tools: ['Git', 'GitHub', 'Maven', 'Postman'],
  },
  projects: [
    {
      name: 'SellerLensIQ',
      description: 'E-commerce intelligence and monitoring platform.', // CONFIRM
    },
    {
      name: 'Clinic Management System',
      description: 'Healthcare scheduling and patient management system.', // CONFIRM
    },
  ],
};
