import { useState, useEffect, useRef } from 'react';
import { profile } from '../data/profile';
import { sendMessage } from '../lib/contact';
import useReducedMotion from '../hooks/useReducedMotion';
import styles from './Contact.module.css';

/**
 * Contact Route: Technical Collaboration & Direct Inquiries
 * Accessible, production-ready frontend contact form and profile details.
 * Honestly reports integration status without faking delivery or APIs.
 */
export default function Contact() {
  const sectionRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const prefersReducedMotion = useReducedMotion();
  const [isRevealed, setIsRevealed] = useState(
    prefersReducedMotion || typeof IntersectionObserver === 'undefined'
  );

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field for bot suppression
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'submitting' | 'error' | 'success'
  const [statusMessage, setStatusMessage] = useState('');

  // Entrance reveal with failsafe
  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') return;

    const el = sectionRef.current;
    if (!el) return;

    let revealed = false;
    const failsafe = setTimeout(() => {
      if (!revealed) {
        revealed = true;
        setIsRevealed(true);
      }
    }, 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !revealed) {
          revealed = true;
          setIsRevealed(true);
          observer.disconnect();
          clearTimeout(failsafe);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [prefersReducedMotion]);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error upon user edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation routine
  const validateForm = () => {
    const newErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Please provide your name.';
    } else if (trimmedName.length > 80) {
      newErrors.name = 'Name must be 80 characters or fewer.';
    }

    const trimmedEmail = formData.email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      newErrors.email = 'Please provide an email address.';
    } else if (!emailPattern.test(trimmedEmail)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Please provide a message.';
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    } else if (trimmedMessage.length > 2000) {
      newErrors.message = 'Message must be 2000 characters or fewer.';
    }

    setErrors(newErrors);

    // Focus the first invalid field for keyboard & screen reader accessibility
    if (newErrors.name && nameInputRef.current) {
      nameInputRef.current.focus();
    } else if (newErrors.email && emailInputRef.current) {
      emailInputRef.current.focus();
    } else if (newErrors.message && messageInputRef.current) {
      messageInputRef.current.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: silently disregard automated bot submissions
    if (formData.website) {
      setSubmissionStatus('error');
      setStatusMessage('Submission could not be processed.');
      return;
    }

    if (!validateForm()) {
      setSubmissionStatus('error');
      setStatusMessage('Please correct the highlighted fields before sending.');
      return;
    }

    setSubmissionStatus('submitting');
    setStatusMessage('');

    try {
      const response = await sendMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setStatusMessage(
          `Received. Thank you — I will write back to ${formData.email.trim()}.`
        );
        setFormData({ name: '', email: '', message: '', website: '' });
      } else {
        // Honest reporting when backend delivery endpoint is not connected
        setSubmissionStatus('error');
        setStatusMessage(
          response.error ||
            'Message delivery is not yet connected. Please download my CV for direct verified contact details.'
        );
      }
    } catch {
      setSubmissionStatus('error');
      setStatusMessage(
        'A connection error occurred. Please download my CV for direct contact details.'
      );
    }
  };

  // External profile link helper (only render if non-empty in profile data)
  const hasGitHub = Boolean(profile?.links?.github);
  const hasLinkedIn = Boolean(profile?.links?.linkedin);
  const hasEmail = Boolean(profile?.email);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-tone="deep"
      className={styles.contactSection}
      aria-labelledby="contact-heading"
    >
      <div className={styles.innerContainer}>
        {/* Editorial Introduction */}
        <header
          className={`${styles.pageHeader} ${
            isRevealed ? styles.revealed : styles.hidden
          }`}
        >
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            <span>04 / Inquiries & Dialogue</span>
          </div>

          <h1 id="contact-heading" className={styles.title}>
            Let&rsquo;s build something meaningful.
          </h1>

          <p className={styles.subtitle}>
            Have an opportunity, an interesting engineering problem, or an idea
            worth exploring? I&rsquo;d be glad to hear from you.
          </p>
        </header>

        {/* 2-Column Responsive Layout */}
        <div
          className={`${styles.contentGrid} ${
            isRevealed ? styles.revealed : styles.hidden
          }`}
        >
          {/* Left Column: Direct Information & Verified Channels */}
          <aside
            className={styles.infoColumn}
            aria-label="Direct Contact Information and Resources"
          >
            <div className={styles.infoCard}>
              <h2 className={styles.infoSectionTitle}>Direct Channels</h2>
              <p className={styles.infoSectionLead}>
                Feel free to review my academic credentials, location context,
                and downloadable resumes.
              </p>

              <dl className={styles.infoList}>
                {/* Location */}
                <div className={styles.infoItem}>
                  <dt className={styles.infoTerm}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.infoIcon}
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Location</span>
                  </dt>
                  <dd className={styles.infoValue}>
                    {profile.location || 'Jaipur, Rajasthan, India'}
                    <span className={styles.infoHint}>
                      Open to remote engineering collaborations & local roles.
                    </span>
                  </dd>
                </div>

                {/* Academic Status */}
                <div className={styles.infoItem}>
                  <dt className={styles.infoTerm}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.infoIcon}
                      aria-hidden="true"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                    <span>Academic & Role</span>
                  </dt>
                  <dd className={styles.infoValue}>
                    {profile.role || 'Computer Science Undergraduate'}
                    <span className={styles.infoHint}>
                      {profile.designation ||
                        'BTech Computer Science · JK Lakshmipat University'}
                    </span>
                  </dd>
                </div>

                {/* Optional Email if configured */}
                {hasEmail && (
                  <div className={styles.infoItem}>
                    <dt className={styles.infoTerm}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.infoIcon}
                        aria-hidden="true"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span>Email</span>
                    </dt>
                    <dd className={styles.infoValue}>
                      <a
                        href={`mailto:${profile.email}`}
                        className={styles.infoLink}
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                )}

                {/* Optional Social Profiles if configured */}
                {(hasGitHub || hasLinkedIn) && (
                  <div className={styles.infoItem}>
                    <dt className={styles.infoTerm}>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.infoIcon}
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                      <span>Profiles</span>
                    </dt>
                    <dd className={styles.infoValue}>
                      <div className={styles.profilesList}>
                        {hasGitHub && (
                          <a
                            href={profile.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.infoLink}
                          >
                            GitHub &rarr;
                          </a>
                        )}
                        {hasLinkedIn && (
                          <a
                            href={profile.links.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.infoLink}
                          >
                            LinkedIn &rarr;
                          </a>
                        )}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>

              {/* CV Downloads Section */}
              <div className={styles.cvDownloadBlock}>
                <div className={styles.cvHeadingRow}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.infoIcon}
                    aria-hidden="true"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  <span className={styles.cvTitle}>Verified Curriculum Vitae</span>
                </div>

                <p className={styles.cvDescription}>
                  Download an up-to-date copy of my resume detailing academic
                  coursework, projects, and technical skills.
                </p>

                <div className={styles.cvActions}>
                  <a
                    href={profile?.cv?.pdf || '/cv/Vishal_Sharma_CV.pdf'}
                    download="Vishal_Sharma_CV.pdf"
                    className={styles.cvButtonPrimary}
                  >
                    <span>Download CV (PDF)</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </a>

                  <a
                    href={profile?.cv?.docx || '/cv/Vishal_Sharma_CV.docx'}
                    download="Vishal_Sharma_CV.docx"
                    className={styles.cvButtonSecondary}
                  >
                    <span>Word (.docx)</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column: Functional Frontend Form */}
          <main className={styles.formColumn}>
            <div className={styles.formContainer}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formDescription}>
                  Fields marked with an asterisk (
                  <span className={styles.requiredAsterisk}>*</span>) are
                  required.
                </p>
              </div>

              {/* Status Banner */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className={styles.statusRegion}
              >
                {statusMessage && (
                  <div
                    className={`${styles.statusAlert} ${
                      submissionStatus === 'success'
                        ? styles.statusSuccess
                        : styles.statusError
                    }`}
                    role="alert"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.statusIcon}
                      aria-hidden="true"
                    >
                      {submissionStatus === 'success' ? (
                        <polyline points="20 6 9 17 4 12" />
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </>
                      )}
                    </svg>
                    <span>{statusMessage}</span>
                  </div>
                )}
              </div>

              <form
                noValidate
                onSubmit={handleSubmit}
                className={styles.contactForm}
              >
                {/* Honeypot anti-bot input */}
                <div className={styles.honeypotField} aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    type="text"
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Name Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-name" className={styles.fieldLabel}>
                    Your Name <span className={styles.requiredAsterisk}>*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    maxLength={80}
                    autoComplete="name"
                    placeholder="e.g. Maya Lin"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    disabled={submissionStatus === 'submitting'}
                    className={`${styles.textInput} ${
                      errors.name ? styles.inputError : ''
                    }`}
                  />
                  {errors.name && (
                    <span
                      id="contact-name-error"
                      className={styles.fieldErrorMessage}
                      role="alert"
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-email" className={styles.fieldLabel}>
                    Email Address{' '}
                    <span className={styles.requiredAsterisk}>*</span>
                  </label>
                  <input
                    ref={emailInputRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? 'contact-email-error' : undefined
                    }
                    disabled={submissionStatus === 'submitting'}
                    className={`${styles.textInput} ${
                      errors.email ? styles.inputError : ''
                    }`}
                  />
                  {errors.email && (
                    <span
                      id="contact-email-error"
                      className={styles.fieldErrorMessage}
                      role="alert"
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className={styles.fieldGroup}>
                  <div className={styles.labelRow}>
                    <label
                      htmlFor="contact-message"
                      className={styles.fieldLabel}
                    >
                      Message <span className={styles.requiredAsterisk}>*</span>
                    </label>
                    <span className={styles.characterCounter}>
                      {formData.message.length} / 2000
                    </span>
                  </div>

                  <textarea
                    ref={messageInputRef}
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="Describe your project, role, or technical conversation topic..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    disabled={submissionStatus === 'submitting'}
                    className={`${styles.textareaInput} ${
                      errors.message ? styles.inputError : ''
                    }`}
                  />
                  {errors.message && (
                    <span
                      id="contact-message-error"
                      className={styles.fieldErrorMessage}
                      role="alert"
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Form Submit Button */}
                <div className={styles.submitRow}>
                  <button
                    type="submit"
                    disabled={submissionStatus === 'submitting'}
                    aria-busy={submissionStatus === 'submitting'}
                    className={styles.submitButton}
                  >
                    <span>
                      {submissionStatus === 'submitting'
                        ? 'Sending message...'
                        : 'Send Request'}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.submitIcon}
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>

                  <span className={styles.integrationNotice}>
                    Honest delivery state · No third-party tracking
                  </span>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
