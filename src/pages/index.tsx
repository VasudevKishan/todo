import React, { forwardRef } from 'react';
import styles from './styles.module.css';
import { useSidebar } from '../hooks/useSidebar.tsx';
import { Outlet } from 'react-router-dom';

const TodoContainer: React.FC = forwardRef<HTMLDivElement>((_, ref) => {
  const { isSidebarVisible } = useSidebar();

  return (
    <main
      className={`${styles.container} ${
        isSidebarVisible ? styles.blurred : ''
      }`}
      ref={ref}
    >
      <Outlet />
    </main>
  );
});

export default TodoContainer;
