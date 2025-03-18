import React from "react";
import styles from "./styles.module.css";

interface ToggleProps {
    checkboxLabel?: string;
    action: () => void;
}

const Toggle: React.FC<ToggleProps> = ({checkboxLabel = "", action}) => {
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
            <span>{checkboxLabel}</span>
        </div>
    );
};

export default Toggle;
