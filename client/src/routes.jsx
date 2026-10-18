import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
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
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
