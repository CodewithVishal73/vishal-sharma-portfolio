import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiCheck, FiAlertCircle, FiLoader, FiRotateCcw } from 'react-icons/fi';
import { submitContact } from '../../lib/api.js';
import styles from './ContactForm.module.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({
  onStateChange,
  onRequestPayload,
  onResponseResult,
  onWakingChange,
  onElapsed,
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // honeypot
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [lifecycleState, setLifecycleState] = useState('idle'); // 'idle' | 'validating' | 'sending' | 'waking' | 'success' | 'fieldError' | 'rateLimited' | 'networkError' | 'serverError'
  const [statusMessage, setStatusMessage] = useState('');
  const [isWaking, setIsWaking] = useState(false);

  const wakingTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Sync state upward
  const updateState = (newState, payload, result, waking = false, elapsed = null) => {
    setLifecycleState(newState);
    if (onStateChange) onStateChange(newState);
    if (payload !== undefined && onRequestPayload) onRequestPayload(payload);
    if (result !== undefined && onResponseResult) onResponseResult(result);
    if (onWakingChange) onWakingChange(waking);
    if (elapsed !== null && onElapsed) onElapsed(elapsed);
  };

  useEffect(() => {
    return () => {
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
    };
  }, []);

  // Validation logic matching server's Zod schema
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

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time error clearance if valid
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    const cleanErrors = {};
    let isValid = true;
    for (const [key, err] of Object.entries(newErrors)) {
      if (err) {
        cleanErrors[key] = err;
        isValid = false;
      }
    }

    setErrors(cleanErrors);
    setTouched({ name: true, email: true, message: true });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate in-flight submissions
    if (lifecycleState === 'sending' || lifecycleState === 'waking') {
      return;
    }

    updateState('validating', null, null, false);

    // Client-side validation check
    const isValid = validateAll();
    if (!isValid) {
      updateState('fieldError', null, {
        ok: false,
        status: 400,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please resolve form validation errors below.',
          fields: errors,
        },
      });
      setStatusMessage('Please fix the highlighted errors before submitting.');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
      website: formData.website || '',
    };

    // Begin sending
    startTimeRef.current = performance.now();
    updateState('sending', payload, null, false);
    setStatusMessage('Transmitting message to Express gateway…');
    setIsWaking(false);

    // 2.5 second cold start waking detector
    wakingTimerRef.current = setTimeout(() => {
      setIsWaking(true);
      if (onWakingChange) onWakingChange(true);
      setStatusMessage('Connecting to the server… this may take a moment.');
    }, 2500);

    try {
      const response = await submitContact(payload);
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
      setIsWaking(false);
      const elapsed = Math.round(performance.now() - startTimeRef.current);

      if (response && response.ok && response.status === 201) {
        // Confirmation from MongoDB Atlas persistence
        updateState('success', payload, response, false, elapsed);
        setStatusMessage('Your message has been saved to MongoDB Atlas.');

        // Clear the form strictly on verified success
        setFormData({
          name: '',
          email: '',
          message: '',
          website: '',
        });
        setTouched({});
        setErrors({});
      } else {
        // Handle specific server response statuses
        const status = response?.status;
        const errCode = response?.error?.code;

        if (status === 429 || errCode === 'RATE_LIMITED') {
          updateState('rateLimited', payload, response, false, elapsed);
          setStatusMessage(
            response?.error?.message ||
              'Too many requests from this IP. Please wait before retrying.'
          );
        } else if (status === 400 || errCode === 'VALIDATION_ERROR') {
          if (response?.error?.fields) {
            setErrors((prev) => ({ ...prev, ...response.error.fields }));
          }
          updateState('fieldError', payload, response, false, elapsed);
          setStatusMessage('Server rejected submission due to invalid input fields.');
        } else {
          updateState('serverError', payload, response, false, elapsed);
          setStatusMessage(
            response?.error?.message || 'Server encountered an issue saving your message.'
          );
        }
      }
    } catch (err) {
      if (wakingTimerRef.current) clearTimeout(wakingTimerRef.current);
      setIsWaking(false);
      const elapsed = Math.round(performance.now() - (startTimeRef.current || performance.now()));

      updateState(
        'networkError',
        payload,
        {
          ok: false,
          status: 0,
          error: {
            code: 'NETWORK_ERROR',
            message: 'Network connection failure. Server is unreachable.',
          },
        },
        false,
        elapsed
      );
      setStatusMessage('Network connection failed. Your message is preserved—please try again.');
    }
  };

  const handleResetSuccess = () => {
    updateState('idle', null, null, false);
    setStatusMessage('');
  };

  const isSubmitting = lifecycleState === 'sending' || lifecycleState === 'waking';
  const charCount = formData.message.length;
  const isCharCountWarning = charCount > 1900;
  const isCharCountExceeded = charCount > 2000;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Honeypot field (hidden from legitimate users) */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website (Leave blank)</label>
        <input
          type="text"
          id="contact-website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name Input */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-name" className={styles.label}>
            Name <span className={styles.required}>*</span>
          </label>
          <span className={styles.fieldHint}>2–80 characters</span>
        </div>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          disabled={isSubmitting}
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="e.g. Elena Rostova"
        />
        {errors.name && (
          <div id="contact-name-error" className={styles.errorText} role="alert">
            <FiAlertCircle className={styles.errorIcon} />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Email Input */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-email" className={styles.label}>
            Email <span className={styles.required}>*</span>
          </label>
          <span className={styles.fieldHint}>Valid reply address</span>
        </div>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
          disabled={isSubmitting}
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="name@example.com"
        />
        {errors.email && (
          <div id="contact-email-error" className={styles.errorText} role="alert">
            <FiAlertCircle className={styles.errorIcon} />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      {/* Message Textarea */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="contact-message" className={styles.label}>
            Message <span className={styles.required}>*</span>
          </label>
          <span
            className={`${styles.charCounter} ${isCharCountWarning ? styles.charWarning : ''} ${
              isCharCountExceeded ? styles.charExceeded : ''
            }`}
            aria-live="polite"
          >
            {charCount} / 2000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          placeholder="Describe your engineering inquiry, project requirements, or opportunity..."
        />
        {errors.message && (
          <div id="contact-message-error" className={styles.errorText} role="alert">
            <FiAlertCircle className={styles.errorIcon} />
            <span>{errors.message}</span>
          </div>
        )}
      </div>

      {/* Accessible aria-live status announcement region */}
      <div className={styles.liveRegion} role="status" aria-live="polite">
        {statusMessage}
      </div>

      {/* Action button row */}
      <div className={styles.actionRow}>
        {lifecycleState === 'success' ? (
          <div className={styles.successRow}>
            <div className={styles.successTag}>
              <FiCheck className={styles.successIcon} />
              <span>Persisted to MongoDB Atlas</span>
            </div>
            <button
              type="button"
              onClick={handleResetSuccess}
              className={styles.resetButton}
            >
              <FiRotateCcw className={styles.resetIcon} />
              <span>Send Another Message</span>
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting || isCharCountExceeded}
            className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          >
            {isSubmitting ? (
              <>
                <FiLoader className={styles.spinIcon} />
                <span>Dispatching Request…</span>
              </>
            ) : (
              <>
                <FiSend className={styles.btnIcon} />
                <span>Send Request (POST)</span>
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
