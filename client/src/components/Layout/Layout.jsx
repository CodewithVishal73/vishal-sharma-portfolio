import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Beam } from '../Beam/Beam';
import { RouteTransition } from '../RouteTransition/RouteTransition';
import styles from './Layout.module.css';

export function Layout({ children }) {
  return (
    <div className={styles.layoutRoot}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Beam />
      <Header />
      <main id="main-content" className={styles.mainContent}>
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
