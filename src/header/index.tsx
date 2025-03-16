import styles from "./styles.module.css";
import HamburgerMenu from "../components/HamburgerMenu";

const Header: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <div>
                to<span className={styles.highlight}>do.</span>
            </div>
            <HamburgerMenu />
        </nav>
    );
};

export default Header;
