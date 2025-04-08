import React, {useRef} from "react";
import styles from "./styles.module.css";

interface HamburgerMenuProps {
    onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({onClick}) => {
    const menu = useRef<HTMLButtonElement>(null);
    //Todo: remove this function below
    const handleClick = () => {
        menu.current?.classList.toggle(styles.active);
        onClick();
    };
    return (
        <button className={styles.icon} ref={menu} onClick={handleClick}>
            <div className={`${styles.line} ${styles.line1}`}></div>
            <div className={`${styles.line} ${styles.line2}`}></div>
        </button>
    );
};

export default HamburgerMenu;
