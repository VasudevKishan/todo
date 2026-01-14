import styles from './styles.module.css';

interface TabButtonProps {
  filterName: string;
  onClickHandler: () => void;
  icon: string;
  isActive: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
  filterName,
  onClickHandler,
  icon,
  isActive,
}) => {
  return (
    <button
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      onClick={onClickHandler}
    >
      <span className={`material-icons ${styles.icon}`}>{icon}</span>
      {filterName}
    </button>
  );
};

export default TabButton;
