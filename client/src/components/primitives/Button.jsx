import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const buttonClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClass} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={buttonClass} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...rest}
    >
      {children}
    </button>
  );
}
