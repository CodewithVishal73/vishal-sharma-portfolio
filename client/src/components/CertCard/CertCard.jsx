import React from 'react';
import { FiExternalLink, FiCheckCircle } from 'react-icons/fi';
import Button from '../primitives/Button.jsx';
import IssuerLogo from './IssuerLogo.jsx';
import styles from './CertCard.module.css';

export default function CertCard({ cert }) {
  const isVerifiedBadge = cert.destinationType === 'badge';
  const isCredential = cert.destinationType === 'credential';

  return (
    <article
      className={styles.card}
      tabIndex={0}
      aria-labelledby={`cert-title-${cert.id}`}
    >
      {/* Port indicator on left edge (spine motif) */}
      <span className={styles.port} aria-hidden="true" />

      {/* Header: Issuer identity & Credential Type */}
      <header className={styles.header}>
        <div className={styles.issuerArea}>
          <IssuerLogo issuerId={cert.issuerId} issuerName={cert.issuer} height={22} />
        </div>
        <span className={styles.typeBadge}>{cert.credentialType}</span>
      </header>

      {/* Body: Title, Description, Skills */}
      <div className={styles.bodyArea}>
        <h3 id={`cert-title-${cert.id}`} className={styles.title}>
          {cert.title}
        </h3>

        <p className={styles.description}>{cert.description}</p>

        {cert.skills && cert.skills.length > 0 && (
          <div className={styles.skillsRow} aria-label="Credential Topics">
            {cert.skills.map((skill) => (
              <span key={skill} className={styles.skillPill}>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Destination Type & Working Action */}
      <footer className={styles.footer}>
        <span className={styles.destinationLabel}>
          {isCredential
            ? 'Coursera Accomplishment'
            : isVerifiedBadge
            ? 'Credly Public Badge'
            : 'Course Overview'}
        </span>

        <Button
          variant="secondary"
          size="sm"
          href={cert.verifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cert.actionLabel} for ${cert.title} (opens in a new tab)`}
        >
          {isCredential || isVerifiedBadge ? (
            <FiCheckCircle aria-hidden="true" size={13} color="var(--signal)" />
          ) : (
            <FiExternalLink aria-hidden="true" size={13} />
          )}
          <span>{cert.actionLabel}</span>
        </Button>
      </footer>
    </article>
  );
}
