import React, { useState, useRef, useEffect } from 'react';
import { FiDownload, FiChevronDown, FiFileText } from 'react-icons/fi';
import { buildApiUrl } from '../../lib/api.js';
import styles from './DownloadCvButton.module.css';

export default function DownloadCvButton({ className = '', variant = 'primary' }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef    = useRef(null);
  const triggerRef = useRef(null);

  // Close on outside click or Escape
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

  return (
    <div
      className={`${styles.splitWrapper} ${styles[variant] || styles.primary} ${className}`}
      ref={menuRef}
    >
      {/* Primary Download Button — PDF via Express backend */}
      <a
        href={buildApiUrl('/api/cv/pdf')}
        download="Vishal_Sharma_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.mainBtn}
        aria-label="Download CV in PDF format - Vishal Sharma"
        onClick={() => setIsOpen(false)}
      >
        <FiDownload aria-hidden="true" className={styles.downloadIcon} />
        <span>Download CV</span>
        <span className={styles.badgeFormat}>PDF</span>
      </a>

      {/* Split Chevron Toggle */}
      <button
        ref={triggerRef}
        type="button"
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

          {/* PDF Option */}
          <a
            href={buildApiUrl('/api/cv/pdf')}
            download="Vishal_Sharma_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className={`${styles.menuItem} ${styles.menuItemBtn}`}
            aria-label="Download CV in PDF format"
            onClick={() => setIsOpen(false)}
          >
            <div className={styles.itemInfo}>
              <FiFileText className={styles.itemIcon} aria-hidden="true" />
              <div>
                <div className={styles.itemTitle}>Adobe PDF (.pdf)</div>
                <div className={styles.itemMeta}>1-Page ATS-formatted layout</div>
              </div>
            </div>
            <span className={styles.badgePdf}>PDF</span>
          </a>

          {/* DOCX Option */}
          <a
            href={buildApiUrl('/api/cv/docx')}
            download="Vishal_Sharma_CV.docx"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            className={`${styles.menuItem} ${styles.menuItemBtn}`}
            aria-label="Download CV in Microsoft Word DOCX format"
            onClick={() => setIsOpen(false)}
          >
            <div className={styles.itemInfo}>
              <FiFileText className={styles.itemIcon} aria-hidden="true" />
              <div>
                <div className={styles.itemTitle}>Microsoft Word (.docx)</div>
                <div className={styles.itemMeta}>Editable ATS document structure</div>
              </div>
            </div>
            <span className={styles.badgeDocx}>DOCX</span>
          </a>
        </div>
      )}
    </div>
  );
}
