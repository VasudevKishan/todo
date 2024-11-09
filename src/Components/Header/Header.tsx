const Header = () => {
    // const sidebar: HTMLElement | null = document.getElementById("sidebar");
    // function toggleSideBar(): void {
    //     sidebar?.classList.toggle("show");
    // }
    return (
        <nav className="header">
            <span>
                to<span className="logo-do">do.</span>
            </span>
            <button className="sidebarToggleButton">Menu</button>
        </nav>
    );
};

export default Header;
