import React from "react";
import styles from "./styles.module.css";

interface ToggleProps {
    action: () => void;
}

const Toggle: React.FC<ToggleProps> = ({action}) => {
    return (
        <div className={styles.toggleContainer}>
            <input
                type="checkbox"
                className={styles.toggle}
                onChange={action}
                id="toggle"
            />
            <label htmlFor="toggle" className={styles.label}>
                <div className={`${styles.ball} ${styles.dark}`}></div>
            </label>
        </div>
    );
};

export default Toggle;
