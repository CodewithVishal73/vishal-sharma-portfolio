import React, { useState, useId } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({ text, children, position = 'top' }) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setVisible(false);
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={handleKeyDown}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible && text && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`${styles.tooltip} ${styles[position]}`}
        >
          {text}
        </div>
      )}
    </div>
  );
}
