import styles from './styles.module.css';
import HamburgerMenu from '../components/HamburgerMenu';
import { useSidebar } from '../hooks/useSidebar';

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className={styles.nav}>
      <div>
        to<span className={styles.highlight}>do.</span>
      </div>
      <HamburgerMenu onClick={toggleSidebar} />
    </nav>
  );
};

export default Header;
