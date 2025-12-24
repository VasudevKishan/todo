import React, { forwardRef } from 'react';
import styles from './styles.module.css';
import { useSidebar } from '../hooks/useSidebar.tsx';
import TasksList from './tasks/index.tsx';
import AddTaskForm from './add-task/index.tsx';
import TaskDetail from './task-detail/index.tsx';
import { Routes, Route, Navigate } from 'react-router-dom';

const TodoContainer: React.FC = forwardRef<HTMLDivElement>((_, ref) => {
  const { isSidebarVisible } = useSidebar();

  return (
    <main
      className={`${styles.container} ${
        isSidebarVisible ? styles.blurred : ''
      }`}
      ref={ref}
    >
      <Routes>
        <Route path='/' element={<TasksList />} />
        <Route path='/new-task' element={<AddTaskForm />} />
        <Route path='/detail/:taskId' element={<TaskDetail />} />
        <Route path='/edit/:taskId' element={<AddTaskForm />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </main>
  );
});

export default TodoContainer;
