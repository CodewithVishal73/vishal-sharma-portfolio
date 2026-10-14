/**
 * Certifications & Achievements Data (Journey Route)
 * Schema:
 * - certifications: id, title, issuer, year, url, image, placeholder
 * - achievements: id, title, event, year, description, url, placeholder
 * Pure JS — no JSX or Vite imports.
 */

export const certifications = [
  {
    id: 'cert-placeholder-1',
    title: 'Professional Certification (replace in src/data/certifications.js)',
    issuer: 'Issuing Organization (e.g. Oracle, AWS, Coursera)',
    year: '2025 (replace)',
    url: '', // verified certificate link
    image: null,
    placeholder: true,
  },
  {
    id: 'cert-placeholder-2',
    title: 'Technical Specialization (replace in src/data/certifications.js)',
    issuer: 'Issuing Organization (e.g. Meta, DeepLearning.AI)',
    year: '2024 (replace)',
    url: '',
    image: null,
    placeholder: true,
  },
];

export const achievements = [
  {
    id: 'achieve-placeholder-1',
    title: 'Hackathon Award / Technical Achievement (replace in src/data/certifications.js)',
    event: 'Competition or Event Name (replace)',
    year: '2025 (replace)',
    description:
      'Honest description of award, project scope, or academic achievement. (Replace in src/data/certifications.js).',
    url: '',
    placeholder: true,
  },
];

export default { certifications, achievements };
