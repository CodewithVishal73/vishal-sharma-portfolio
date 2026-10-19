import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import TimelinePage from './pages/TimelinePage.jsx';
import CertificationsPage from './pages/CertificationsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import NotFound from './pages/NotFound.jsx';

// Route-level code splitting for ProjectDetail
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));

function Root() {
  return (
    <Layout>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Outlet />
    </Layout>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // 01 / CLIENT alias
      {
        path: 'client',
        element: <Home />,
      },
      // 02 / IDENTITY — About
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'identity',
        element: <AboutPage />,
      },
      // 03 / STACK — Skills
      {
        path: 'skills',
        element: <SkillsPage />,
      },
      {
        path: 'stack',
        element: <SkillsPage />,
      },
      // 04 / SERVICES — Projects
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'services',
        element: <ProjectsPage />,
      },
      // 05 / HISTORY — Timeline & Experience
      {
        path: 'timeline',
        element: <TimelinePage />,
      },
      {
        path: 'history',
        element: <TimelinePage />,
      },
      {
        path: 'experience',
        element: <TimelinePage />,
      },
      // 06 / PROOF — Certifications
      {
        path: 'certifications',
        element: <CertificationsPage />,
      },
      {
        path: 'proof',
        element: <CertificationsPage />,
      },
      // 07 / RESPONSE — Contact
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'response',
        element: <ContactPage />,
      },
      // Project Details Route
      {
        path: 'projects/:slug',
        element: (
          <Suspense
            fallback={
              <div
                style={{
                  padding: 'clamp(64px, 12vw, 128px) 0',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  color: 'var(--ink-muted)',
                }}
              >
                Resolving system architecture...
              </div>
            }
          >
            <ProjectDetail />
          </Suspense>
        ),
      },
      // Catch-all 404
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
