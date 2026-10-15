import { Component } from 'react';

/**
 * SkillsErrorBoundary
 * Properly scoped React class-based ErrorBoundary around the animated 3D stack.
 * If 3D transforms or motion values encounter an error, it gracefully falls back
 * to a clean static representation of the 3 layers using design tokens.
 */
export class SkillsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Skills 3D Stack encountered an error, falling back to static presentation:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          aria-hidden="true"
          style={{
            position: 'sticky',
            top: '16svh',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            width: '100%',
            maxWidth: '320px',
            margin: '0 auto',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 106, 58, 0.04)',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
            }}
          >
            System Layers // Static View
          </div>

          {/* Layer 3 */}
          <div
            style={{
              padding: 'var(--space-3)',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              backgroundColor: 'var(--bg)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)' }}>
              LAYER 03 // INTERFACE
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
              React · Tailwind CSS · Build Tools
            </div>
          </div>

          {/* Layer 2 */}
          <div
            style={{
              padding: 'var(--space-3)',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              backgroundColor: 'var(--bg)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)' }}>
              LAYER 02 // SERVICE
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
              Spring Boot · Express · PostgreSQL · Mongo
            </div>
          </div>

          {/* Layer 1 */}
          <div
            style={{
              padding: 'var(--space-3)',
              border: '1px solid var(--line)',
              borderRadius: '6px',
              backgroundColor: 'var(--bg)',
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--fg)' }}>
              LAYER 01 // FOUNDATION
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>
              Java · C++ · JavaScript · Python · SQL
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SkillsErrorBoundary;
