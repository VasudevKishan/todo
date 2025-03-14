import "./styles.css";
import HamburgerMenu from "../components/HamburgerMenu";

const Header: React.FC = () => {
    return (
        <nav>
            <div>
                to<span>do.</span>
            </div>
            <HamburgerMenu />
        </nav>
    );
};

export default Header;
