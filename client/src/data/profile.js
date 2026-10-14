/**
 * Profile & Personal Information
 * Strictly based on confirmed owner facts.
 * Pure JS — no JSX or Vite imports.
 */

export const profile = {
  name: 'Vishal Sharma',
  shortName: 'Vishal',
  designation: 'BTech Computer Science · JK Lakshmipat University',
  role: 'Computer Science Undergraduate',
  location: 'Jaipur, India',
  status: 'Student',
  graduation: 'Expected 2028',
  university: 'JK Lakshmipat University, Jaipur, India',
  degree: 'BTech in Computer Science',

  // Typewriter roles for Hero section
  typewriterRoles: [
    'Computer Science Undergraduate',
    'Backend & API Design',
    'Full-Stack Development',
    'React Interfaces',
  ],

  // About copy
  statement: 'I like the part of software that has to be right.', // DRAFT: edit to your voice
  bio: "I'm a BTech Computer Science student at JK Lakshmipat University in Jaipur, graduating in 2028. I'm most interested in backend engineering, API design and relational databases, and in building React interfaces on top of them.",

  // Contact & Social links (empty strings or placeholders until owner configures)
  email: '', // replace with real email (e.g. vishal@example.com)
  links: {
    github: '', // replace in src/data/profile.js with owner's GitHub profile
    linkedin: '', // replace in src/data/profile.js with owner's LinkedIn profile
  },

  // Academic & technical focus
  interests: [
    'Java and Spring Boot',
    'Backend engineering and API design',
    'PostgreSQL and relational design',
    'Full-stack development',
    'System architecture and scalable software',
    'React and interactive frontend experiences',
    'Practical AI integration',
    'MERN stack',
  ],

  // CV asset paths
  cv: {
    pdf: '/cv/Vishal_Sharma_CV.pdf',
    docx: '/cv/Vishal_Sharma_CV.docx',
  },
};

export default profile;
