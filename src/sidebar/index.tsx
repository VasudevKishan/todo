import React, {useState} from "react";
import styles from "./styles.module.css";
import FilterTitle from "../components/FilterTitle";
import Toggle from "../components/Toggle";
import {useTheme} from "../hooks/useTheme";

type filterTypes = "All" | "Starred";

const SideBar: React.FC = () => {
    const {toggleTheme, isSidebarVisible} = useTheme();
    const [activeFilter, setActiveFilter] = useState<filterTypes>("All");

    const handleFilterClick = (filterName: filterTypes) => {
        setActiveFilter(filterName);
        console.log("All todos");
    };
    return (
        <aside
            className={`${styles.container} ${
                isSidebarVisible ? styles.visible : styles.hidden
            }`}
        >
            <div className={styles.filters}>
                <div className={styles.filterTitleGroup}>
                    <h2>Filters</h2>
                    <Toggle action={toggleTheme} />
                </div>
                <div className={styles.filterList}>
                    <FilterTitle
                        filterName="All"
                        onClickHandler={() => handleFilterClick("All")}
                        icon="all_inbox"
                        isActive={activeFilter === "All"}
                    />
                    <FilterTitle
                        filterName="Starred"
                        onClickHandler={() => handleFilterClick("Starred")}
                        icon="star"
                        isActive={activeFilter === "Starred"}
                    />
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
