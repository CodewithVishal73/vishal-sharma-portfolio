import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { submitContact } from '../../lib/api.js';
import styles from './ContactForm.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWaking, setIsWaking] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const statusRef = useRef(null);
  const wakingTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
    };
  }, []);

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value || value.trim().length === 0) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 80) return 'Name cannot exceed 80 characters';
        return null;
      case 'email':
        if (!value || value.trim().length === 0) return 'Email is required';
        if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address';
        return null;
      case 'message':
        if (!value || value.trim().length === 0) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 2000) return 'Message cannot exceed 2000 characters';
        return null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setTouched({ name: true, email: true, message: true });

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setIsWaking(false);

    // Free-tier cold start timer (2.5s)
    wakingTimerRef.current = setTimeout(() => {
      setIsWaking(true);
    }, 2500);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        website: formData.website, // honeypot
      };

      const result = await submitContact(payload);

      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
      setIsWaking(false);
      setIsSubmitting(false);

      if (result.ok) {
        setSubmitSuccess(true);
        setResponseData({
          id: result.id,
          createdAt: result.createdAt || new Date().toISOString(),
          status: result.httpStatus || 201,
        });

        // Clear form only on verified success
        setFormData({ name: '', email: '', message: '', website: '' });
        setErrors({});
        setTouched({});

        // Shift focus to status message as required
        setTimeout(() => {
          statusRef.current?.focus();
        }, 100);
      } else {
        // Specific friendly messages for rate limit, validation, network
        if (result.httpStatus === 429) {
          setSubmitError('Rate limit reached (5 requests / 15 minutes). Please wait a moment before sending another transmission.');
        } else if (result.error?.fields) {
          setErrors(result.error.fields);
          setSubmitError(result.error.message || 'Please fix the highlighted fields above.');
        } else {
          setSubmitError(result.error?.message || 'Transmission failed. Your message text has been preserved. Please try again.');
        }
      }
    } catch (err) {
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
      setIsWaking(false);
      setIsSubmitting(false);
      setSubmitError(err.message || 'Network error occurred. Your message has been saved. Please retry.');
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setResponseData(null);
    setSubmitError(null);
  };

  return (
    <div className={styles.formContainer}>
      {/* Live Region for Screen Readers */}
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className={styles.statusRegion}
      >
        {submitSuccess && (
          <div className={styles.successCard}>
            <div className={styles.successHeader}>
              <FiCheck className={styles.successIcon} aria-hidden="true" />
              <div>
                <h4 className={styles.successTitle}>Message Sent Successfully</h4>
                <p className={styles.successRef}>
                  Message received. Reference: <span className={styles.refId}>{responseData?.id}</span>
                </p>
              </div>
            </div>

            {/* Optional Collapsed Technical Details */}
            <details className={styles.techDetails}>
              <summary className={styles.techSummary}>Technical details</summary>
              <pre className={styles.techPre}>
                <code>
                  {JSON.stringify(
                    {
                      statusCode: responseData?.status || 201,
                      referenceId: responseData?.id,
                      timestamp: responseData?.createdAt,
                    },
                    null,
                    2
                  )}
                </code>
              </pre>
            </details>

            <button
              type="button"
              onClick={handleReset}
              className={styles.resetBtn}
            >
              Send Another Message
            </button>
          </div>
        )}
      </div>

      {!submitSuccess && (
        <form onSubmit={handleSubmit} noValidate className={styles.form} aria-label="Contact transmission form">
          {/* Honeypot field (hidden from real users, caught by bots) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="website-field">Website</label>
            <input
              id="website-field"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="name-input" className={styles.label}>
              Name <span className={styles.requiredMark}>*</span>
            </label>
            <input
              id="name-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your name or company"
              disabled={isSubmitting}
              className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ''}`}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
              required
            />
            {touched.name && errors.name && (
              <span id="name-error" className={styles.fieldError} role="alert">
                <FiAlertCircle aria-hidden="true" />
                <span>{errors.name}</span>
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.fieldGroup}>
            <label htmlFor="email-input" className={styles.label}>
              Email <span className={styles.requiredMark}>*</span>
            </label>
            <input
              id="email-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@domain.com"
              disabled={isSubmitting}
              className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ''}`}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
              required
            />
            {touched.email && errors.email && (
              <span id="email-error" className={styles.fieldError} role="alert">
                <FiAlertCircle aria-hidden="true" />
                <span>{errors.email}</span>
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className={styles.fieldGroup}>
            <div className={styles.messageLabelRow}>
              <label htmlFor="message-input" className={styles.label}>
                Message <span className={styles.requiredMark}>*</span>
              </label>
              <span className={styles.charCount}>
                {formData.message.length} / 2000
              </span>
            </div>
            <textarea
              id="message-input"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Discuss a software engineering role, collaborative project, or technical question..."
              disabled={isSubmitting}
              className={`${styles.textarea} ${touched.message && errors.message ? styles.inputError : ''}`}
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
              required
            />
            {touched.message && errors.message && (
              <span id="message-error" className={styles.fieldError} role="alert">
                <FiAlertCircle aria-hidden="true" />
                <span>{errors.message}</span>
              </span>
            )}
          </div>

          {/* Free-tier cold start message */}
          {isWaking && (
            <div className={styles.wakingNotice} role="status">
              <span className={styles.wakingDot} />
              <span>The server is waking up (free hosting). Still sending...</span>
            </div>
          )}

          {/* General error message */}
          {submitError && (
            <div className={styles.submitErrorAlert} role="alert">
              <FiAlertCircle className={styles.alertIcon} aria-hidden="true" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? (
              <>
                <FiLoader className={styles.spinner} aria-hidden="true" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <FiSend aria-hidden="true" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
