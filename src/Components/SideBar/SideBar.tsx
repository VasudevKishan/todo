const SideBar: React.FC<{className?: string}> = ({className = ""}) => {
    return (
        <aside className={`sidebar roundedBorder ${className}`} id="sidebar">
            SideBar
        </aside>
    );
};

export default SideBar;
