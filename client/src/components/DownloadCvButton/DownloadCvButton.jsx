import React, { useState, useRef, useEffect } from 'react';
import { FiDownload, FiChevronDown, FiFileText, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { downloadCv, buildApiUrl } from '../../lib/api.js';
import styles from './DownloadCvButton.module.css';

export default function DownloadCvButton({ className = '', variant = 'primary' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState(null); // 'pdf' | 'docx' | null
  const [isWaking, setIsWaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [fallbackUrl, setFallbackUrl] = useState(null);

  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const mainBtnRef = useRef(null);

  const handleDownload = async (format) => {
    setDownloadingFormat(format);
    setIsWaking(false);
    setErrorMessage(null);
    setFallbackUrl(null);
    const formatLabel = format.toUpperCase();
    setStatusMessage(`Preparing ${formatLabel} CV...`);

    const result = await downloadCv(format, {
      onWaking: (waking) => setIsWaking(waking),
    });

    setDownloadingFormat(null);
    setIsWaking(false);

    if (result.ok) {
      setStatusMessage(`${formatLabel} CV downloaded successfully.`);
      setTimeout(() => setStatusMessage(''), 4000);
      setIsOpen(false);
    } else {
      setErrorMessage(result.error || 'Failed to download CV file from server.');
      setFallbackUrl(result.fallbackUrl || buildApiUrl(`/api/cv/${format}`));
      setStatusMessage(`Error: ${result.error || 'Download failed'}`);
    }
  };

  // Close on Outside Click or Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isPreparing = Boolean(downloadingFormat);

  return (
    <div
      className={`${styles.splitWrapper} ${styles[variant] || styles.primary} ${className}`}
      ref={menuRef}
    >
      {/* Aria-live screen reader announcement */}
      <span className={styles.srOnly} role="status" aria-live="polite">
        {statusMessage}
      </span>

      {/* Primary Download Button (PDF default) */}
      <button
        ref={mainBtnRef}
        type="button"
        disabled={isPreparing}
        onClick={() => handleDownload('pdf')}
        className={styles.mainBtn}
        aria-label={
          isPreparing
            ? 'Preparing CV download from server'
            : 'Download CV in PDF format - Vishal Sharma'
        }
      >
        {isPreparing ? (
          <FiLoader aria-hidden="true" className={styles.downloadIcon} style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <FiDownload aria-hidden="true" className={styles.downloadIcon} />
        )}
        <span>{isPreparing ? 'Preparing…' : 'Download CV'}</span>
        <span className={styles.badgeFormat}>PDF</span>
      </button>

      {/* Split Menu Toggle */}
      <button
        ref={triggerRef}
        type="button"
        disabled={isPreparing}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${styles.toggleBtn} ${isOpen ? styles.toggleOpen : ''}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Select CV download format (PDF or Word DOCX)"
      >
        <FiChevronDown aria-hidden="true" className={styles.chevronIcon} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdownMenu} role="menu" aria-orientation="vertical">
          <div className={styles.menuHeader}>
            <span className="mono-label">VERIFIED CV FORMATS</span>
          </div>

          {/* Calm line when server is cold starting */}
          {isWaking && (
            <div className={styles.wakingNotice} role="status">
              <FiLoader aria-hidden="true" />
              <span>The server is waking up (free hosting)...</span>
            </div>
          )}

          {/* Error Banner with Direct Fallback Anchor */}
          {errorMessage && (
            <div className={styles.errorNotice} role="alert">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FiAlertCircle color="var(--err)" />
                <strong>Download issue:</strong>
              </div>
              <span>{errorMessage}</span>
              {fallbackUrl && (
                <a
                  href={fallbackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fallbackAnchor}
                >
                  Open directly in browser ↗
                </a>
              )}
            </div>
          )}

          {/* Option 1: PDF */}
          <button
            type="button"
            role="menuitem"
            disabled={isPreparing}
            onClick={() => handleDownload('pdf')}
            className={`${styles.menuItem} ${styles.menuItemBtn}`}
            aria-label="Download CV in PDF format"
          >
            <div className={styles.itemInfo}>
              <FiFileText className={styles.itemIcon} aria-hidden="true" />
              <div>
                <div className={styles.itemTitle}>Adobe PDF (.pdf)</div>
                <div className={styles.itemMeta}>1-Page ATS-formatted layout</div>
              </div>
            </div>
            <span className={styles.badgePdf}>PDF</span>
          </button>

          {/* Option 2: DOCX */}
          <button
            type="button"
            role="menuitem"
            disabled={isPreparing}
            onClick={() => handleDownload('docx')}
            className={`${styles.menuItem} ${styles.menuItemBtn}`}
            aria-label="Download CV in Microsoft Word DOCX format"
          >
            <div className={styles.itemInfo}>
              <FiFileText className={styles.itemIcon} aria-hidden="true" />
              <div>
                <div className={styles.itemTitle}>Microsoft Word (.docx)</div>
                <div className={styles.itemMeta}>Editable ATS document structure</div>
              </div>
            </div>
            <span className={styles.badgeDocx}>DOCX</span>
          </button>
        </div>
      )}
    </div>
  );
}
