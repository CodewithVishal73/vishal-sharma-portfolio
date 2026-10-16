import React from 'react';
import { SiGoogle } from 'react-icons/si';

export default function IssuerLogo({ issuerId, issuerName, className = '', size = 24 }) {
  const normalized = (issuerId || '').toLowerCase();

  if (normalized === 'google') {
    return (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
        <SiGoogle size={size} color="#4285F4" aria-hidden="true" />
      </span>
    );
  }

  if (normalized === 'ibm') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: '0.95rem',
          letterSpacing: '0.12em',
          color: '#0F62FE',
          lineHeight: 1,
          padding: '2px 4px',
          borderRadius: 3,
          backgroundColor: 'rgba(15, 98, 254, 0.08)',
          border: '1px solid rgba(15, 98, 254, 0.25)',
        }}
        aria-hidden="true"
      >
        IBM
      </span>
    );
  }

  if (normalized === 'mckinsey') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.82rem',
          letterSpacing: '0.04em',
          color: '#1F40E6',
          lineHeight: 1,
          padding: '3px 6px',
          borderRadius: 3,
          backgroundColor: 'rgba(31, 64, 230, 0.08)',
          border: '1px solid rgba(31, 64, 230, 0.25)',
        }}
        aria-hidden="true"
      >
        McKinsey
      </span>
    );
  }

  // Graceful fallback to monogram
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
        padding: '2px 6px',
      }}
      aria-hidden="true"
    >
      {(issuerName || '??').slice(0, 3).toUpperCase()}
    </span>
  );
}
