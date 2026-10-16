import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';
import Button from '../components/primitives/Button.jsx';
import Badge from '../components/primitives/Badge.jsx';
import styles from './Home.module.css';

export default function NotFound() {
  return (
    <div style={{ padding: 'clamp(64px, 12vw, 128px) 0', textAlign: 'center' }}>
      <div className={styles.card} style={{ maxWidth: '580px', margin: '0 auto', alignItems: 'center' }}>
        <Badge variant="signal">404 · ROUTE NOT FOUND</Badge>
        <FiAlertTriangle size={48} style={{ color: 'var(--err)', margin: '16px 0' }} />
        <h1 className="section-heading">404 — Route Not Found</h1>
        <p className={styles.cardDesc}>
          The requested node or endpoint does not exist on this pipeline.
        </p>
        <Link to="/" style={{ marginTop: '16px' }}>
          <Button variant="primary">
            <FiHome aria-hidden="true" />
            <span>Return to Pipeline Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
