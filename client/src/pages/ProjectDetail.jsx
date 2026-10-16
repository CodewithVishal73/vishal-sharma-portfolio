import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '../components/primitives/Button.jsx';
import Badge from '../components/primitives/Badge.jsx';
import Port from '../components/primitives/Port.jsx';
import styles from './Home.module.css';

export default function ProjectDetail() {
  const { slug } = useParams();

  return (
    <div style={{ padding: 'clamp(48px, 8vw, 96px) 0' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <Button variant="ghost" size="sm">
          <FiArrowLeft aria-hidden="true" />
          <span>Back to Architecture</span>
        </Button>
      </Link>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Port active />
            <span className="mono-label">DEPLOYED SERVICE DETAIL</span>
          </div>
          <Badge variant="signal">{slug?.toUpperCase()}</Badge>
        </div>

        <h1 className="section-heading" style={{ marginTop: '12px' }}>
          Project: {slug}
        </h1>

        <p className={styles.cardDesc} style={{ fontSize: '17px', margin: '16px 0' }}>
          Detailed architectural breakdown, system sequence diagram, engineering decisions, and live link connections. Full details will be populated in Phase P3.
        </p>

        <div className={styles.badgeRow}>
          <Badge variant="signal">React</Badge>
          <Badge variant="signal">Node.js</Badge>
          <Badge variant="signal">Express</Badge>
          <Badge variant="signal">MongoDB</Badge>
        </div>
      </div>
    </div>
  );
}
