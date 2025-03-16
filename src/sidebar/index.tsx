import React from "react";
import styles from "./styles.module.css";

const SideBar: React.FC = () => {
    return (
        <aside className={styles.container}>
            <div className={styles.filters}>
                <h2>Filters</h2>
            </div>
        </aside>
    );
};

export default SideBar;
