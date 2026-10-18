// Single source of truth for portfolio section ordering, navigation, and numbering
// Aligns Header, SpineRail, SectionShells, and scrollspy automatically.

export const SECTIONS = [
  { id: 'client', num: '01', navLabel: 'Client', nodeLabel: 'CLIENT' },
  { id: 'identity', num: '02', navLabel: 'Identity', nodeLabel: 'IDENTITY' },
  { id: 'stack', num: '03', navLabel: 'Stack', nodeLabel: 'STACK' },
  { id: 'approach', num: '04', navLabel: 'Approach', nodeLabel: 'APPROACH' },
  { id: 'intelligence', num: '05', navLabel: 'Intelligence', nodeLabel: 'INTELLIGENCE' },
  { id: 'services', num: '06', navLabel: 'Services', nodeLabel: 'SERVICES' },
  { id: 'history', num: '07', navLabel: 'History', nodeLabel: 'HISTORY' },
  { id: 'proof', num: '08', navLabel: 'Proof', nodeLabel: 'PROOF' },
  { id: 'response', num: '09', navLabel: 'Response', nodeLabel: 'RESPONSE' },
];

export function getSectionById(id) {
  return SECTIONS.find((s) => s.id === id) || { id, num: '00', navLabel: id, nodeLabel: id.toUpperCase() };
}
