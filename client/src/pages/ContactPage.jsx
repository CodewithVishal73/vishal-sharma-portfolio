import React, { useEffect } from 'react';
import Contact from '../sections/Contact/Contact.jsx';
import NodeNav from '../components/NodeNav/NodeNav.jsx';
import { getSectionById, getAdjacentSections } from '../data/sections.js';

export default function ContactPage() {
  const section = getSectionById('response');
  const { prev, next } = getAdjacentSections('response');

  useEffect(() => {
    document.title = 'Response & Contact · Vishal Sharma | Portfolio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-shell" style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>
      <Contact />
      <NodeNav
        prev={prev}
        next={next}
        currentNum={section.num}
        currentLabel={section.nodeLabel}
      />
    </div>
  );
}
