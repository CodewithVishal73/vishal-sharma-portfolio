/**
 * TechIcon: Vector iconography for technologies and developer tools.
 * Renders recognizable silhouettes with consistent sizing and dual-theme compatibility.
 */

export function TechIcon({ iconId, className = '', size = 22, ariaHidden = true }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className,
    'aria-hidden': ariaHidden ? 'true' : undefined,
    style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 },
  };

  switch (iconId) {
    case 'java':
      return (
        <svg {...commonProps}>
          {/* Coffee cup with steam */}
          <path
            d="M4 17h12a3 3 0 0 0 3-3v-1h1.5a2.5 2.5 0 0 0 0-5H19V7H4v7a3 3 0 0 0 3 3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M19 10h1.5a1 1 0 0 1 0 2H19v-2z"
            fill="currentColor"
            opacity="0.8"
          />
          <path
            d="M2 19.5h16"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M8 2.5c1 1.2-1 2.2 0 3.5M12 2c1 1.3-1 2.4 0 3.8"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'cpp':
      return (
        <svg {...commonProps}>
          {/* C++ Hexagonal badge with C and ++ */}
          <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M10 9a3 3 0 0 0-3 3 3 3 0 0 0 3 3"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13.5 11v2M12.5 12h2M17.5 11v2M16.5 12h2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'javascript':
      return (
        <svg {...commonProps}>
          {/* JavaScript badge */}
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 13v2.5a1.5 1.5 0 0 1-3 0"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M12.5 15.5c.6.7 1.4 1 2.3 1 1.2 0 2-.6 2-1.5 0-1-.8-1.4-2-1.7-1.3-.3-2.3-.8-2.3-1.9 0-1 .9-1.7 2.2-1.7.9 0 1.6.3 2.1.8"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'python':
      return (
        <svg {...commonProps}>
          {/* Python intertwined mark */}
          <path
            d="M11.5 3c-3 0-3 1.5-3 2.5v1.5h6v1H6.5c-2 0-3.5 1-3.5 3s1 3 3 3h1.5v-1.5c0-1.8 1.5-3 3-3h5c1.5 0 2.5-1 2.5-2.5V5.5c0-1.5-1.5-2.5-3-2.5h-3.5zm-1 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"
            fill="currentColor"
          />
          <path
            d="M12.5 21c3 0 3-1.5 3-2.5V17h-6v-1h8c2 0 3.5-1 3.5-3s-1-3-3-3h-1.5v1.5c0 1.8-1.5 3-3 3h-5c-1.5 0-2.5 1-2.5 2.5v3.5c0 1.5 1.5 2.5 3 2.5h3.5zm1-1.5a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
            fill="var(--accent, #FF6A3A)"
          />
        </svg>
      );

    case 'sql':
      return (
        <svg {...commonProps}>
          {/* Relational database cylinder stack */}
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M4 6v5c0 1.66 3.58 3 8 3s8-1.34 8-3V6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4 11v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
          />
        </svg>
      );

    case 'html5':
      return (
        <svg {...commonProps}>
          {/* HTML5 shield */}
          <path
            d="M4 3l1.5 17 6.5 2 6.5-2L20 3H4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M7 7h10l-.8 8.5L12 17l-4.2-1.5-.3-3.5h2.2l.2 1.8 2.1.7 2.1-.7.2-2.3H7.5L7 7z"
            fill="var(--accent, #FF6A3A)"
          />
        </svg>
      );

    case 'css3':
      return (
        <svg {...commonProps}>
          {/* CSS3 shield */}
          <path
            d="M4 3l1.5 17 6.5 2 6.5-2L20 3H4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M17 7H7l.3 4h8.4l-.5 4.5L12 17l-3.2-1.5-.2-2H6.4l.4 3.7L12 19l5.2-1.8L17 7z"
            fill="var(--accent, #FF6A3A)"
          />
        </svg>
      );

    case 'spring-boot':
      return (
        <svg {...commonProps}>
          {/* Spring Leaf mark */}
          <path
            d="M19.5 4.5C14 4.5 5 8 4.5 19.5c5.5 0 15-4 15-15z"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <path
            d="M5 19c3-4 7-8 14-14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 13c2-1 4-1 6-2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'nodejs':
      return (
        <svg {...commonProps}>
          {/* Node.js Hexagon mark */}
          <path
            d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.5 15.5V11a2.5 2.5 0 0 1 5 0v4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="7.5" r="1.2" fill="currentColor" />
        </svg>
      );

    case 'express':
      return (
        <svg {...commonProps}>
          {/* Express.js mark */}
          <path
            d="M4 14.5c.8 1.5 2.2 2.5 4 2.5 2.5 0 4-1.8 4-4.5s-1.5-4.5-4-4.5c-2.4 0-4 2-4 4.5M12 12.5h-8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M14 8l6 8M20 8l-6 8"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'rest-apis':
      return (
        <svg {...commonProps}>
          {/* REST API connected endpoints */}
          <circle cx="5" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="19" cy="6" r="3" stroke="var(--accent, #FF6A3A)" strokeWidth="1.6" />
          <circle cx="19" cy="18" r="3" stroke="var(--accent, #FF6A3A)" strokeWidth="1.6" />
          <path
            d="M8 12h3c2 0 3-1 4-3l1-1.5M11 12c2 0 3 1 4 3l1 1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'postgresql':
      return (
        <svg {...commonProps}>
          {/* Slonik elephant silhouette */}
          <path
            d="M18.5 14c-.5-3.5-3-6-7-6-3 0-5.5 1.5-6.5 4-1 2.5-.5 5.5 1.5 7h4v-3h2v3h3c1.5 0 2.5-1.5 3-5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M6 12c-1.5 1-2.5 3-2.5 5 0 2 1.5 3 2.5 3s1-2 1-4"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="14.5" cy="11.5" r="1" fill="currentColor" />
        </svg>
      );

    case 'mysql':
      return (
        <svg {...commonProps}>
          {/* MySQL dolphin curve mark */}
          <path
            d="M4 16c2-4 5-8 10-9 3-.5 6 1 6 3 0 3-4 6-8 7l-4 2 2-3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M14 7c1-2 3-3 5-3-1 2-1 4 0 5"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="17.5" cy="8.5" r="1" fill="currentColor" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg {...commonProps}>
          {/* MongoDB leaf flame */}
          <path
            d="M12 2C10.5 4.5 6 8.5 6 14c0 4 2.5 7.5 6 8 3.5-.5 6-4 6-8 0-5.5-4.5-9.5-6-12z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 3v17"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'mongoose':
      return (
        <svg {...commonProps}>
          {/* Mongoose ODM Schema Document mark */}
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 8h8M8 12h5M8 16h8"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'jwt':
      return (
        <svg {...commonProps}>
          {/* JWT token emblem */}
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 3a9 9 0 0 1 8 5l-8 4-8-4a9 9 0 0 1 8-5z"
            fill="var(--accent, #FF6A3A)"
            opacity="0.3"
          />
          <path
            d="M12 3v9l8-4M12 12l-8-4M12 12v9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'spring-security':
      return (
        <svg {...commonProps}>
          {/* Security Shield with Lock */}
          <path
            d="M12 2.5l7 3.5v5.5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="11.5"
            r="1.75"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.5"
          />
          <path
            d="M12 13.25V15"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'react':
      return (
        <svg {...commonProps}>
          {/* React atom */}
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(60 12 12)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="3.6"
            transform="rotate(120 12 12)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="1.5" fill="var(--accent, #FF6A3A)" />
        </svg>
      );

    case 'tailwind':
      return (
        <svg {...commonProps}>
          {/* Tailwind twin waves */}
          <path
            d="M7 9.5c1.5-3 3.5-3.5 6-1.5 2 1.6 3 2 5.5 1.5 2-.4 3.5-1.5 4.5-3.5-1.5 3-3.5 3.5-6 1.5-2-1.6-3-2-5.5-1.5-2 .4-3.5 1.5-4.5 3.5z"
            fill="var(--accent, #FF6A3A)"
          />
          <path
            d="M2.5 16.5c1.5-3 3.5-3.5 6-1.5 2 1.6 3 2 5.5 1.5 2-.4 3.5-1.5 4.5-3.5-1.5 3-3.5 3.5-6 1.5-2-1.6-3-2-5.5-1.5-2 .4-3.5 1.5-4.5 3.5z"
            fill="currentColor"
          />
        </svg>
      );

    case 'git':
      return (
        <svg {...commonProps}>
          {/* Git branching diamond */}
          <rect
            x="3"
            y="3"
            width="12.5"
            height="12.5"
            rx="2"
            transform="rotate(-45 3 3)"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="8" cy="12" r="1.5" fill="var(--accent, #FF6A3A)" />
          <circle cx="16" cy="8" r="1.5" fill="var(--accent, #FF6A3A)" />
          <circle cx="16" cy="16" r="1.5" fill="var(--accent, #FF6A3A)" />
          <path
            d="M8 12h4a4 4 0 0 0 4-4M12 12v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'github':
      return (
        <svg {...commonProps}>
          {/* GitHub Invertocat */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
            fill="currentColor"
          />
        </svg>
      );

    case 'maven':
      return (
        <svg {...commonProps}>
          {/* Apache Maven folding wings */}
          <path
            d="M4 17l8-13 8 13-8-4-8 4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 4v9"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'postman':
      return (
        <svg {...commonProps}>
          {/* Postman astronaut mark */}
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M8 12a4 4 0 0 1 7-2.6l2-2M16 12a4 4 0 0 1-7 2.6l-2 2"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'ai-integration':
      return (
        <svg {...commonProps}>
          {/* Neural nodes & spark */}
          <circle cx="6" cy="12" r="2" fill="currentColor" />
          <circle cx="18" cy="7" r="2" fill="currentColor" />
          <circle cx="18" cy="17" r="2" fill="currentColor" />
          <circle cx="12" cy="12" r="2.5" fill="var(--accent, #FF6A3A)" />
          <path
            d="M6 12l6 0M12 12l6-5M12 12l6 5"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.6"
          />
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return (
        <svg {...commonProps}>
          {/* Clean terminal mark fallback */}
          <path
            d="M7 8l4 4-4 4M13 16h4"
            stroke="var(--accent, #FF6A3A)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default TechIcon;
