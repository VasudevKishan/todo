import React, { useState } from 'react';
import styles from './styles.module.css';
import FilterTitle from '../components/FilterTitle';
import Toggle from '../components/Toggle';
import { useTheme } from '../hooks/useTheme';
import { useSidebar } from '../hooks/useSidebar';
import { useTasksSlice } from '../hooks/useTasksSlice';

type filterTypes = 'All' | 'Starred';

const SideBar: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const [activeFilter, setActiveFilter] = useState<filterTypes>('All');
  // const { clearFilter, filterByStarred } = useTasks();

  const { clearFilter, filterByStarred } = useTasksSlice();

  const handleFilterClick = (filterName: filterTypes) => {
    setActiveFilter(filterName);
    switch (filterName) {
      case 'All':
        clearFilter();
        break;
      case 'Starred':
        filterByStarred();
    }
    toggleSidebar();
  };
  return (
    <aside
      className={`${styles.container} ${
        isSidebarVisible ? styles.visible : styles.hidden
      }`}
    >
      <div className={styles.filters}>
        <div className={styles.filterTitleGroup}>
          <h2>
            <span className={styles.highlight}>F</span>ilters
          </h2>
          <Toggle
            action={toggleTheme}
            selected={theme === 'dark' ? false : true}
          />
        </div>
        <div className={styles.filterList}>
          <FilterTitle
            filterName='All'
            onClickHandler={() => handleFilterClick('All')}
            icon='all_inbox'
            isActive={activeFilter === 'All'}
          />
          <FilterTitle
            filterName='Starred'
            onClickHandler={() => handleFilterClick('Starred')}
            icon='star'
            isActive={activeFilter === 'Starred'}
          />
        </div>
      </div>
      <div className={styles.profileLinks}>
        <a
          href='https://github.com/VasudevKishan/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='/github-mark.svg'
            alt='GitHub'
            className={styles.githubIcon}
          />
        </a>
      </div>
    </aside>
  );
};

export default SideBar;
