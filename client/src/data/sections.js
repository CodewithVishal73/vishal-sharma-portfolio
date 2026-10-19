// Single source of truth for portfolio section ordering, navigation, and numbering
// Aligns Header, SpineRail, SectionShells, and routes automatically.

export const SECTIONS = [
  {
    id: 'client',
    num: '01',
    navLabel: 'Client',
    nodeLabel: 'CLIENT',
    path: '/',
    alias: '/client',
    title: 'Client Node · Overview',
    desc: 'System entry point, developer identity, and core mission.',
  },
  {
    id: 'identity',
    num: '02',
    navLabel: 'Identity',
    nodeLabel: 'IDENTITY',
    path: '/about',
    alias: '/identity',
    title: 'Identity · About Vishal',
    desc: 'Engineering background, academic foundation at JKLU, and verified bio.',
  },
  {
    id: 'stack',
    num: '03',
    navLabel: 'Stack',
    nodeLabel: 'STACK',
    path: '/skills',
    alias: '/stack',
    title: 'Stack · Skills & Architecture',
    desc: 'Verified technical breadth across client, server, database, applied AI, and tooling.',
  },
  {
    id: 'services',
    num: '04',
    navLabel: 'Services',
    nodeLabel: 'SERVICES',
    path: '/projects',
    alias: '/services',
    title: 'Services · Featured Projects',
    desc: 'Production systems, intelligent architectures, and full-stack software.',
  },
  {
    id: 'history',
    num: '05',
    navLabel: 'History',
    nodeLabel: 'HISTORY',
    path: '/timeline',
    alias: '/history',
    title: 'History · Education & Timeline',
    desc: 'Git-graph chronological progression of academic and engineering milestones.',
  },
  {
    id: 'proof',
    num: '06',
    navLabel: 'Proof',
    nodeLabel: 'PROOF',
    path: '/certifications',
    alias: '/proof',
    title: 'Proof · Certifications & Credentials',
    desc: 'Verified enterprise credentials, professional specializations, and hackathons.',
  },
  {
    id: 'response',
    num: '07',
    navLabel: 'Response',
    nodeLabel: 'RESPONSE',
    path: '/contact',
    alias: '/response',
    title: 'Response · Contact & Transmission',
    desc: 'Direct communication channels, verified message submission, and resume.',
  },
];

export function getSectionById(id) {
  return (
    SECTIONS.find((s) => s.id === id) || {
      id,
      num: '00',
      navLabel: id,
      nodeLabel: id.toUpperCase(),
      path: '/',
      alias: '/',
    }
  );
}

export function getAdjacentSections(currentIdOrPath) {
  const index = SECTIONS.findIndex(
    (s) =>
      s.id === currentIdOrPath ||
      s.path === currentIdOrPath ||
      s.alias === currentIdOrPath
  );
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? SECTIONS[index - 1] : null,
    next: index < SECTIONS.length - 1 ? SECTIONS[index + 1] : null,
  };
}
