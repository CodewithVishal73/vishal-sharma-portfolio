/**
 * Profile & Personal Information
 * Strictly based on confirmed owner facts.
 * Pure JS — no JSX or Vite imports.
 */

export const profile = {
  name: 'Vishal Sharma',
  shortName: 'Vishal',
  identity: 'Software Engineer', // editable identity line
  role: 'Software Engineer', // backwards compatibility
  designation: 'BTech Computer Science · JK Lakshmipat University',
  location: 'Jaipur, Rajasthan, India',
  status: 'Computer Science and Engineering student / software developer',
  graduation: '2028',
  university: 'JK Lakshmipat University, Jaipur, India',
  degree: 'BTech in Computer Science',

  // Headline prefix & rotating words for Hero section
  headlinePrefix: 'Engineering the Future of',
  typewriterWords: [
    'AI Systems',
    'Backend Infrastructure',
    'Intelligent Platforms',
  ],
  // Typewriter roles alias for backwards compatibility
  typewriterRoles: [
    'AI Systems',
    'Backend Infrastructure',
    'Intelligent Platforms',
  ],

  // Supporting copy
  supportingCopy:
    'Building scalable software, reliable backend systems, and intelligent digital experiences.',

  // Hero CTAs
  ctas: {
    primary: {
      label: 'View Projects',
      to: '/projects',
    },
    secondary: {
      label: 'Download CV',
      href: '/cv/Vishal_Sharma_CV.pdf',
      download: 'Vishal_Sharma_CV.pdf',
    },
    word: {
      label: 'Word (.docx)',
      href: '/cv/Vishal_Sharma_CV.docx',
      download: 'Vishal_Sharma_CV.docx',
    },
  },

  // About copy
  statement: 'I like the part of software that has to be right.', // DRAFT: edit to your voice
  bio: "I'm a BTech Computer Science student at JK Lakshmipat University in Jaipur, graduating in 2028. I'm most interested in backend engineering, API design and relational databases, and in building React interfaces on top of them.",

  // Contact & Social links (empty strings by default until owner configures)
  email: '',
  links: {
    github: '', // owner GitHub profile URL
    linkedin: '', // owner LinkedIn profile URL
    leetcode: '', // owner LeetCode profile URL
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
