import { Component } from 'react';

/**
 * SkillsErrorBoundary
 * React class-based ErrorBoundary around the technology cards stack.
 * If any card component encounters an unexpected runtime error,
 * it gracefully falls back to a clean semantic presentation using design tokens.
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
      console.warn('Skills component encountered an error, falling back to static presentation:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="region"
          aria-label="Technology Stack Fallback"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            padding: 'var(--space-6)',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 106, 58, 0.04)',
          }}
        >
          <div
            style={{
              fontSize: '0.8125rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              fontWeight: 600,
            }}
          >
            Engineering Stack // Core Technologies
          </div>

          <div style={{ fontSize: '0.9375rem', color: 'var(--fg)', lineHeight: 1.6 }}>
            Java · C++ · JavaScript · Python · SQL · React · HTML5 · CSS3 · Tailwind CSS ·
            Spring Boot · Node.js · Express.js · REST APIs · PostgreSQL · MySQL · MongoDB ·
            Mongoose · Spring Security · JWT · Git · GitHub · Maven · Postman · AI Integration
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SkillsErrorBoundary;
