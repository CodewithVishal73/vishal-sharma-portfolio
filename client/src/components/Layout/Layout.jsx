import React from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import SpineRail from '../SpineRail/SpineRail.jsx';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.appShell}>
      {/* Accessible skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Header />
      <SpineRail />

      <main id="main-content" className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}
