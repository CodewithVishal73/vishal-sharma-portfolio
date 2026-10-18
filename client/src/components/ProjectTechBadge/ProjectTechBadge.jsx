import React from 'react';
import {
  SiJavascript,
  SiReact,
  SiCplusplus,
  SiPython,
  SiSpringboot,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiApachemaven,
  SiPostman,
  SiJsonwebtokens,
  SiTypescript,
  SiTailwindcss,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi, TbDatabase, TbSql } from 'react-icons/tb';
import { FiMic } from 'react-icons/fi';
import styles from './ProjectTechBadge.module.css';

const ICON_MAP = {
  javascript: SiJavascript,
  react: SiReact,
  java: FaJava,
  'spring boot': SiSpringboot,
  'c++': SiCplusplus,
  python: SiPython,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  sql: TbSql,
  'rest apis': TbApi,
  jwt: SiJsonwebtokens,
  git: SiGit,
  github: SiGithub,
  maven: SiApachemaven,
  postman: SiPostman,
  'node.js': SiNodedotjs,
  node: SiNodedotjs,
  express: SiExpress,
  'express.js': SiExpress,
  typescript: SiTypescript,
  'tailwind css': SiTailwindcss,
  'lovable cloud db': TbDatabase,
  'lovable cloud database': TbDatabase,
  'voice ai': FiMic,
};

export default function ProjectTechBadge({ tech, size = 14, onClick, className = '' }) {
  const normalizedKey = tech.toLowerCase().trim();
  const IconComponent = ICON_MAP[normalizedKey];

  if (onClick) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick(tech);
        }}
        className={`${styles.badge} ${styles.clickableBadge} ${className}`}
        title={`Filter projects by ${tech}`}
      >
        {IconComponent && (
          <span className={styles.icon}>
            <IconComponent size={size} aria-hidden="true" />
          </span>
        )}
        <span className={styles.label}>{tech}</span>
      </button>
    );
  }

  return (
    <span className={`${styles.badge} ${className}`}>
      {IconComponent && (
        <span className={styles.icon}>
          <IconComponent size={size} aria-hidden="true" />
        </span>
      )}
      <span className={styles.label}>{tech}</span>
    </span>
  );
}
