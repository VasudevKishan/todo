import React, { forwardRef, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useSidebar } from '../hooks/useSidebar.tsx';
import TasksList from './tasks/index.tsx';
import AddTaskForm from './add-task/index.tsx';
import TaskDetail from './task-detail/index.tsx';

const TodoContainer: React.FC = forwardRef<HTMLDivElement>((_, ref) => {
  const { isSidebarVisible } = useSidebar();

  return (
    <main
      className={`${styles.container} ${
        isSidebarVisible ? styles.blurred : ''
      }`}
      ref={ref}
    >
      <AddTaskForm />
      <TasksList />
      <TaskDetail />
    </main>
  );
});

export default TodoContainer;
