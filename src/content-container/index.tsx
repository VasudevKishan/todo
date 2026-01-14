import React from 'react';
import styles from './styles.module.css';
import SideBar from '../sidebar';

import { Outlet } from 'react-router-dom';

const ContentContainer: React.FC = () => {
  return (
    <div className={styles.container}>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default ContentContainer;
