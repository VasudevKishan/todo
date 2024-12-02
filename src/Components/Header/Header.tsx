interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({onToggleSidebar}) => {
    return (
        <nav className="header">
            <span>
                to<span className="logo-do">do.</span>
            </span>
            <button className="sidebarToggleButton" onClick={onToggleSidebar}>
                Menu
            </button>
        </nav>
    );
};

export default Header;
