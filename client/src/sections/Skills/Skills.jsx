import React, { useState, useRef, useMemo } from 'react';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import SkillPanel, { SkillSubSection } from '../../components/SkillPanel/SkillPanel.jsx';
import TechCard from '../../components/TechCard/TechCard.jsx';
import RelationLines from '../../components/RelationLines/RelationLines.jsx';
import { skills, getRelatedSkillIds } from '../../data/skills.js';
import styles from './Skills.module.css';

export default function Skills() {
  const [activeSkillId, setActiveSkillId] = useState(null);
  const containerRef = useRef(null);
  const cardRefs = useRef({});

  const relatedSkillIds = useMemo(() => {
    return getRelatedSkillIds(activeSkillId);
  }, [activeSkillId]);

  const registerCardRef = (id, el) => {
    if (el) {
      cardRefs.current[id] = el;
    }
  };

  const isCardRelated = (id) => relatedSkillIds.includes(id);
  const isCardDimmed = (id) =>
    Boolean(activeSkillId && activeSkillId !== id && !relatedSkillIds.includes(id));

  return (
    <SectionShell
      id="stack"
      nodeNumber="03"
      nodeLabel="STACK"
      title="Skills & Architecture"
      subtitle="Verified proficiencies grouped across client, server runtime, and toolchain."
    >
      <div ref={containerRef} className={styles.panelsContainer}>
        {/* SVG connector lines between related skills on desktop */}
        <RelationLines
          activeSkillId={activeSkillId}
          relatedSkillIds={relatedSkillIds}
          cardRefs={cardRefs}
          containerRef={containerRef}
        />

        {/* Panel 1: Frontend */}
        <SkillPanel
          title="Frontend"
          nodeLabel="03.1 / CLIENT"
          description="Client-side engineering, responsive component hierarchy, and reactive state systems."
        >
          <div className={styles.cardsGrid}>
            {skills.frontend.map((skill, index) => (
              <TechCard
                key={skill.id}
                ref={(el) => registerCardRef(skill.id, el)}
                skill={skill}
                delay={index * 0.06}
                isHovered={activeSkillId === skill.id}
                isRelated={isCardRelated(skill.id)}
                isDimmed={isCardDimmed(skill.id)}
                onHover={setActiveSkillId}
                onLeave={() => setActiveSkillId(null)}
              />
            ))}
          </div>
        </SkillPanel>

        {/* Panel 2: Backend */}
        <SkillPanel
          title="Backend"
          nodeLabel="03.2 / SERVER & RUNTIME"
          description="Distributed system foundations, REST API architectures, and relational & document persistence."
        >
          <div className={styles.backendSubRows}>
            <SkillSubSection heading="Languages">
              {skills.backend.languages.map((skill, index) => (
                <TechCard
                  key={skill.id}
                  ref={(el) => registerCardRef(skill.id, el)}
                  skill={skill}
                  delay={index * 0.06}
                  isHovered={activeSkillId === skill.id}
                  isRelated={isCardRelated(skill.id)}
                  isDimmed={isCardDimmed(skill.id)}
                  onHover={setActiveSkillId}
                  onLeave={() => setActiveSkillId(null)}
                />
              ))}
            </SkillSubSection>

            <SkillSubSection heading="Frameworks & APIs">
              {skills.backend.frameworks.map((skill, index) => (
                <TechCard
                  key={skill.id}
                  ref={(el) => registerCardRef(skill.id, el)}
                  skill={skill}
                  delay={(index + 3) * 0.06}
                  isHovered={activeSkillId === skill.id}
                  isRelated={isCardRelated(skill.id)}
                  isDimmed={isCardDimmed(skill.id)}
                  onHover={setActiveSkillId}
                  onLeave={() => setActiveSkillId(null)}
                />
              ))}
            </SkillSubSection>

            <SkillSubSection heading="Databases">
              {skills.backend.databases.map((skill, index) => (
                <TechCard
                  key={skill.id}
                  ref={(el) => registerCardRef(skill.id, el)}
                  skill={skill}
                  delay={(index + 7) * 0.06}
                  isHovered={activeSkillId === skill.id}
                  isRelated={isCardRelated(skill.id)}
                  isDimmed={isCardDimmed(skill.id)}
                  onHover={setActiveSkillId}
                  onLeave={() => setActiveSkillId(null)}
                />
              ))}
            </SkillSubSection>
          </div>
        </SkillPanel>

        {/* Panel 3: Tools & Technologies */}
        <SkillPanel
          title="Tools & Technologies"
          nodeLabel="03.3 / TOOLCHAIN"
          description="Version control workflows, build lifecycle automation, and API contract verification."
        >
          <div className={styles.cardsGrid}>
            {skills.tools.map((skill, index) => (
              <TechCard
                key={skill.id}
                ref={(el) => registerCardRef(skill.id, el)}
                skill={skill}
                delay={index * 0.06}
                isHovered={activeSkillId === skill.id}
                isRelated={isCardRelated(skill.id)}
                isDimmed={isCardDimmed(skill.id)}
                onHover={setActiveSkillId}
                onLeave={() => setActiveSkillId(null)}
              />
            ))}
          </div>
        </SkillPanel>
      </div>
    </SectionShell>
  );
}
