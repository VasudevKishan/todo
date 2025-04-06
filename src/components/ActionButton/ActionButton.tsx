import React from "react";
import styles from "./styles.module.css";

interface ButtonProps {
    varient?: "primary" | "secondary";
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
}

export const ActionButton: React.FC<ButtonProps> = ({
    varient = "primary",
    onClick,
    children,
    className = "",
    type,
}) => {
    return (
        <button
            type={type || "button"}
            className={`${styles.btn} ${
                varient === "primary"
                    ? styles["btn-primary"]
                    : styles["btn-secondary"]
            }
                ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
