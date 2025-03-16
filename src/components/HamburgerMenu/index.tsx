import React, {useRef} from "react";
import styles from "./styles.module.css";

const HamburgerMenu: React.FC = () => {
    const menu = useRef<HTMLButtonElement>(null);
    //Todo: remove this function below
    const toggleSidebar = () => {
        menu.current?.classList.toggle(styles.active);
    };
    return (
        <button className={styles.icon} ref={menu} onClick={toggleSidebar}>
            <div className={`${styles.line} ${styles.line1}`}></div>
            <div className={`${styles.line} ${styles.line2}`}></div>
        </button>
    );
};

export default HamburgerMenu;
