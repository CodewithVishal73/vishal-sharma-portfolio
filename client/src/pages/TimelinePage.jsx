import React, { useEffect } from 'react';
import Timeline from '../sections/Timeline/Timeline.jsx';
import NodeNav from '../components/NodeNav/NodeNav.jsx';
import { getSectionById, getAdjacentSections } from '../data/sections.js';

export default function TimelinePage() {
  const section = getSectionById('history');
  const { prev, next } = getAdjacentSections('history');

  useEffect(() => {
    document.title = 'History & Timeline · Vishal Sharma | Portfolio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-shell" style={{ padding: 'clamp(24px, 4vw, 48px) 0' }}>
      <Timeline />
      <NodeNav
        prev={prev}
        next={next}
        currentNum={section.num}
        currentLabel={section.nodeLabel}
      />
    </div>
  );
}
