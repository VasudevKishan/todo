import styles from "./styles.module.css";
import HamburgerMenu from "../components/HamburgerMenu";
import {useTheme} from "../hooks/useTheme";

const Header: React.FC = () => {
    const {toggleSidebar} = useTheme();
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
