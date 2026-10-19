import React, { useEffect } from 'react';
import Certifications from '../sections/Certifications/Certifications.jsx';
import NodeNav from '../components/NodeNav/NodeNav.jsx';
import { getSectionById, getAdjacentSections } from '../data/sections.js';

export default function CertificationsPage() {
  const section = getSectionById('proof');
  const { prev, next } = getAdjacentSections('proof');

  useEffect(() => {
    document.title = 'Proof & Certifications · Vishal Sharma | Portfolio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-shell" style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>
      <Certifications />
      <NodeNav
        prev={prev}
        next={next}
        currentNum={section.num}
        currentLabel={section.nodeLabel}
      />
    </div>
  );
}
