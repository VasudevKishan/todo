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
            />
            <label htmlFor={styles.toggle} className="label">
                <div className={styles.ball}></div>
            </label>
            <span>{checkboxLabel}</span>
        </div>
    );
};

export default Toggle;
