import React from "react";
import styles from "./styles.module.css";

interface ButtonProps {
    varient?: "primary" | "secondary";
    onClick?: () => void;
    children: React.ReactNode;
}

export const ActionButton: React.FC<ButtonProps> = ({
    varient = "primary",
    onClick,
    children,
}) => {
    return (
        <button
            className={`${styles.btn} ${
                varient === "primary"
                    ? styles["btn-primary"]
                    : styles["btn-secondary"]
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
