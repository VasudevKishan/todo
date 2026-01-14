//TODO: Needs Refactoring  -  Shouldnt need a context for a sidebar

import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import TabButton from '../components/TabButton';
import Toggle from '../components/Toggle';
import { useTheme } from '../hooks/useTheme';
import { useSidebar } from '../hooks/useSidebar';

import { useSendLogoutMutation } from '../app/auth/authApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useGetMyProjectsQuery } from '../app/project/projectsApiSlice';
import { setFilter, clearTodosFilter } from '../app/todo/todoSlice';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';

type filterTypes = 'All' | 'Starred' | 'Project';

const SideBar: React.FC = () => {
  const [sendLogout, { isLoading, isSuccess }] = useSendLogoutMutation();
  const { data, isLoading: isProjectsLoading } = useGetMyProjectsQuery(
    undefined,
    {
      pollingInterval: 15000,
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const [activeFilter, setActiveFilter] = useState<filterTypes>('All');
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  const handleFilterClick = (filterName: filterTypes) => {
    navigate('/');
    setActiveFilter(filterName);
    switch (filterName) {
      case 'All':
        dispatch(clearTodosFilter());

        setActiveFilter('All');
        setActiveProject(null);
        break;
      case 'Starred':
        dispatch(setFilter({ filterBy: 'starred', value: 'true' }));

        setActiveFilter('Starred');
    }
    toggleSidebar();
  };

  const handleProjectFilterClick = (projectId: string) => {
    navigate('/');
    if (activeProject === projectId) {
      setActiveProject(null);
      dispatch(clearTodosFilter());
      setActiveFilter('All');
    } else {
      setActiveProject(projectId);
      dispatch(setFilter({ filterBy: 'project', value: projectId }));
      setActiveFilter('Project');
    }
    toggleSidebar();

    // console.log(`Filtered by projectID - ${projectId}`);
  };

  const handleAddProjectClick = () => {
    navigate('/new-project');
  };
  const projectList = data ? (
    data.projects?.map(({ _id, projectName }) => (
      <TabButton
        key={_id}
        filterName={projectName}
        onClickHandler={() => handleProjectFilterClick(_id)}
        icon='all_inbox'
        isActive={activeProject === _id}
      />
    ))
  ) : (
    <p>'No Projects Found'</p>
  );

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
          <TabButton
            filterName='All'
            onClickHandler={() => handleFilterClick('All')}
            icon='all_inbox'
            isActive={activeFilter === 'All'}
          />
          <TabButton
            filterName='Starred'
            onClickHandler={() => handleFilterClick('Starred')}
            icon='star'
            isActive={activeFilter === 'Starred'}
          />
        </div>

        <div className={styles.filterTitleGroup}>
          <h2>
            <span className={styles.highlight}>P</span>rojects
          </h2>
          {/* create on click handler to add project */}
          <button
            className={`material-icons ${styles.icon} ${styles.button}`}
            onClick={handleAddProjectClick}
          >
            add
          </button>
        </div>
        <div
          className={`${styles.filterList} ${styles['filterList-scrollable']}`}
        >
          {/* GEt project names and display */}
          {isProjectsLoading ? <Loader /> : projectList}
        </div>
      </div>
      <div className={styles.profileLinks}>
        {/* <div className={styles.sidebarFooter}>
          <ActionButton varient='secondary'>Logout</ActionButton>
        </div> */}
        <div className={styles.filterTitleGroup}>
          <Link to='/login' className={styles.logoutBtn}>
            <h2 onClick={sendLogout} className={styles.logout}>
              <span className={styles.highlight}>L</span>ogout
            </h2>
          </Link>
          {isLoading && <p>Logout loading</p>}
        </div>
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
