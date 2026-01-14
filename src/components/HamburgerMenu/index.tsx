import React, { useRef } from 'react';
import styles from './styles.module.css';

interface HamburgerMenuProps {
  isActive?: boolean;
  onClick: () => void;
}
// TODO:Bug - refactor this - when click on a filter then the lines stay as crossed even when sidebar is closed
const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onClick, isActive }) => {
  const menu = useRef<HTMLButtonElement>(null);
  //Todo: remove this function below
  const handleClick = () => {
    // menu.current?.classList.toggle(styles.active);
    onClick();
  };

  if (isActive) {
    menu.current?.classList.add(styles.active);
  } else {
    menu.current?.classList.remove(styles.active);
  }

  return (
    <button className={styles.icon} ref={menu} onClick={handleClick}>
      <div className={`${styles.line} ${styles.line1}`}></div>
      <div className={`${styles.line} ${styles.line2}`}></div>
    </button>
  );
};

export default HamburgerMenu;
