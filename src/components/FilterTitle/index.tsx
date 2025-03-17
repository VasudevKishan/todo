import styles from "./styles.module.css";

interface filterTitleProps {
    filterName: string;
    onClickHandler: () => void;
    icon: string;
    isActive: boolean;
}

const FilterTitle: React.FC<filterTitleProps> = ({
    filterName,
    onClickHandler,
    icon,
    isActive,
}) => {
    return (
        <button
            className={`${styles.button} ${isActive ? styles.active : ""}`}
            onClick={onClickHandler}
        >
            <span className={`material-icons ${styles.icon}`}>{icon}</span>
            {filterName}
        </button>
    );
};

export default FilterTitle;
