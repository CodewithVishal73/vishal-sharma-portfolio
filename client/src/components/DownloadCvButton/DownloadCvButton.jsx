import React, { useState, useRef, useEffect } from 'react';
import { FiDownload, FiChevronDown, FiFileText } from 'react-icons/fi';
import styles from './DownloadCvButton.module.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function DownloadCvButton({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const pdfUrl = `${API_BASE}/api/cv/pdf`;
  const docxUrl = `${API_BASE}/api/cv/docx`;

  const handleDownload = () => {
    setIsPreparing(true);
    setTimeout(() => setIsPreparing(false), 2000);
    setIsOpen(false);
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

  return (
    <div className={`${styles.splitWrapper} ${className}`} ref={menuRef}>
      {/* Primary Download Anchor (PDF) */}
      <a
        href={pdfUrl}
        download="Vishal_Sharma_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleDownload}
        className={styles.mainBtn}
        aria-label="Download CV (PDF) - Vishal Sharma"
      >
        <FiDownload aria-hidden="true" className={styles.downloadIcon} />
        <span>{isPreparing ? 'Preparing CV…' : 'Download CV'}</span>
        <span className={styles.badgeFormat}>PDF</span>
      </a>

      {/* Split Menu Toggle */}
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

          <a
            href={pdfUrl}
            download="Vishal_Sharma_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownload}
            role="menuitem"
            className={styles.menuItem}
          >
            <div className={styles.itemInfo}>
              <FiFileText className={styles.itemIcon} />
              <div>
                <div className={styles.itemTitle}>Adobe PDF (.pdf)</div>
                <div className={styles.itemMeta}>1-Page verified layout · 3.5 kB</div>
              </div>
            </div>
            <span className={styles.badgePdf}>RECOMMENDED</span>
          </a>

          <a
            href={docxUrl}
            download="Vishal_Sharma_CV.docx"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownload}
            role="menuitem"
            className={styles.menuItem}
          >
            <div className={styles.itemInfo}>
              <FiFileText className={styles.itemIcon} />
              <div>
                <div className={styles.itemTitle}>Microsoft Word (.docx)</div>
                <div className={styles.itemMeta}>Applicant Tracking System ready · 10.8 kB</div>
              </div>
            </div>
            <span className={styles.badgeDocx}>DOCX</span>
          </a>
        </div>
      )}
    </div>
  );
}
