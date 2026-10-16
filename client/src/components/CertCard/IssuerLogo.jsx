import React from 'react';

export default function IssuerLogo({ issuerId, issuerName, height = 22, className = '' }) {
  const normalized = (issuerId || '').toLowerCase();

  if (normalized === 'ibm') {
    return (
      <img
        src="/ibm.svg"
        alt={issuerName || 'IBM'}
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
        className={className}
      />
    );
  }

  if (normalized === 'mckinsey') {
    return (
      <img
        src="/mckinsey.svg"
        alt={issuerName || 'McKinsey & Company'}
        height={height - 2}
        style={{
          height: `${height - 2}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          color: 'var(--ink)',
        }}
        className={className}
      />
    );
  }

  if (normalized === 'google') {
    return (
      <img
        src="/google.svg"
        alt={issuerName || 'Google'}
        height={height}
        style={{
          height: `${height}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
        }}
        className={className}
      />
    );
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        fontSize: '0.75rem',
        color: 'var(--ink)',
        backgroundColor: 'var(--surface-3)',
        borderRadius: 4,
        padding: '3px 8px',
      }}
    >
      {issuerName}
    </span>
  );
}
