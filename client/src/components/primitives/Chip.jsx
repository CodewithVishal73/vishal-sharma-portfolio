import React from 'react';
import Port from './Port.jsx';
import styles from './Chip.module.css';

export default function Chip({
  children,
  active = false,
  onClick,
  showPort = true,
  className = '',
}) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`${styles.chip} ${active ? styles.active : ''} ${className}`}
    >
      {showPort && <Port active={active} className={styles.chipPort} />}
      <span>{children}</span>
    </Component>
  );
}
