import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiMail, FiCopy, FiCheck } from 'react-icons/fi';
import SectionShell from '../../components/SectionShell/SectionShell.jsx';
import ContactForm from './ContactForm.jsx';
import Port from '../../components/primitives/Port.jsx';
import DownloadCvButton from '../../components/DownloadCvButton/DownloadCvButton.jsx';
import { profile } from '../../data/profile.js';
import { getSectionById } from '../../data/sections.js';
import { warmUp } from '../../lib/api.js';
import styles from './Contact.module.css';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const sectionMeta = getSectionById('response');
  const sectionRef = useRef(null);

  // Email copy state
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Silent warm-up request when contact section nears viewport (no UI)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          warmUp();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <SectionShell
      id="response"
      nodeNumber={sectionMeta.num}
      nodeLabel={sectionMeta.nodeLabel}
      title="Contact"
      subtitle="Establish a connection. Send a direct transmission to my verified inbox."
    >
      <div className={styles.container} ref={sectionRef}>
        {/* Left Column: Direct Invitation & Verified Links */}
        <motion.div
          className={styles.infoCol}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className={styles.introCard}>
            <div className={styles.cardHeader}>
              <span className={styles.metaLabel}>COMMUNICATION CHANNEL</span>
              <Port active className={styles.signalPort} />
            </div>

            <h3 className={styles.infoHeading}>Let&apos;s Connect</h3>
            <p className={styles.infoDesc}>
              Have an engineering role, collaborative project, or technical question? Send a message directly to my inbox.
            </p>

            {/* Email link with copy action */}
            {profile.email && (
              <div className={styles.emailRow}>
                <a
                  href={`mailto:${profile.email}`}
                  className={styles.emailLink}
                  aria-label={`Send email to ${profile.email}`}
                >
                  <FiMail className={styles.emailIcon} aria-hidden="true" />
                  <span>{profile.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.copyBtn}
                  aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
                >
                  {copied ? <FiCheck className={styles.copiedIcon} /> : <FiCopy />}
                  <span className={styles.copyText}>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            )}

            {/* Social links ONLY if present and non-empty in profile */}
            {profile.socials && Object.keys(profile.socials).length > 0 && (
              <div className={styles.socialsRow}>
                {Object.entries(profile.socials).map(([key, url]) => {
                  if (!url || typeof url !== 'string' || url.trim() === '') return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      {key.toUpperCase()}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Verified CV Downloads */}
            <div className={styles.cvSection}>
              <span className={styles.cvLabel}>VERIFIED RESUME</span>
              <DownloadCvButton className={styles.cvButton} variant="primary" />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Clean Form with Inline Validation & Post-Submission Details */}
        <motion.div
          className={styles.formCol}
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8%' }}
          transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </SectionShell>
  );
}
