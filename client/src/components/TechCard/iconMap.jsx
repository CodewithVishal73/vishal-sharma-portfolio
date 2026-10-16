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
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi, TbSql } from 'react-icons/tb';

export const TECH_ICONS = {
  javascript: SiJavascript,
  react: SiReact,
  java: FaJava,
  cpp: SiCplusplus,
  python: SiPython,
  'spring-boot': SiSpringboot,
  'rest-apis': TbApi,
  node: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgres: SiPostgresql,
  mysql: SiMysql,
  sql: TbSql,
  git: SiGit,
  github: SiGithub,
  maven: SiApachemaven,
  postman: SiPostman,
};

export function TechIcon({ id, className, style, size = 28 }) {
  const IconComponent = TECH_ICONS[id];
  if (IconComponent) {
    return <IconComponent className={className} style={style} size={size} aria-hidden="true" />;
  }

  // Graceful fallback to monogram tile
  const fallback = (id || '??').slice(0, 2).toUpperCase();
  return (
    <span
      className={className}
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        fontSize: '0.75rem',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        borderRadius: 4,
        background: 'var(--surface-3)',
        color: 'var(--ink)',
      }}
      aria-hidden="true"
    >
      {fallback}
    </span>
  );
}
