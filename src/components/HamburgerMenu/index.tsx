import React, {useRef} from "react";
import "./styles.css";

const HamburgerMenu: React.FC = () => {
    const menu = useRef<HTMLButtonElement>(null);
    //Todo: remove this function below
    const toggleSidebar = () => {
        menu.current?.classList.toggle("active");
    };
    return (
        <button className="icon" ref={menu} onClick={toggleSidebar}>
            <div className="line line1"></div>
            <div className="line line2"></div>
        </button>
    );
};

export default HamburgerMenu;
