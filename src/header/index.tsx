import styles from './styles.module.css';
import HamburgerMenu from '../components/HamburgerMenu';
import { useSidebar } from '../hooks/useSidebar';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <div>
        to<span className={styles.highlight}>do.</span>
      </div>
      {pathname !== '/login' && pathname !== '/register' && (
        <HamburgerMenu onClick={toggleSidebar} isActive={isSidebarVisible} />
      )}
    </nav>
  );
};

export default Header;
