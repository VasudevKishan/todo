import { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.css';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { useCreateProjectMutation } from '../../app/project/projectsApiSlice';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Loader from '../../components/Loader';

const AddProjectForm = () => {
  const [projectName, setProjectName] = useState<string>('');
  const projectNameRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    projectNameRef.current?.focus();
  }, []);

  useTitle('Todo | New Project');

  const [createProject, { isLoading, isError }] = useCreateProjectMutation();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(projectName.length);
    if (projectName.length === 0) setErrMsg('Required');
    else if (projectName.length < 3 || projectName.length > 10) {
      setErrMsg('Project name must be 3 - 10 characters');
    } else
      try {
        // const { message } =
        await createProject({ projectName }).unwrap();
        // console.log(message);
        // Create a popup with success message
        navigate('/');
      } catch (err: any) {
        if (!err.status) setErrMsg('No Server Response');
        else if (err.status === 400) setErrMsg('Missing Project Name');
        else if (err.status === 409) setErrMsg('Duplicate Project Name');
        else setErrMsg('Error - ' + err.data?.message);
      }
  };

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = (
      <>
        <p className={styles.errorMessage}>Internal Server Error</p> <br />
      </>
    );
  } else {
    content = (
      <form onSubmit={handleFormSubmit}>
        <div className={styles.taskForm}>
          <br />
          <input
            type='text'
            name='projectName'
            ref={projectNameRef}
            id='projectName'
            maxLength={10}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder='Project Name'
          />
          <label htmlFor='projectName' style={{ display: 'none' }}>
            Title
          </label>
          {errMsg && <p className={styles.errorMessage}>{errMsg}</p>}
          <div>
            <ActionButton
              className={styles.backBtn}
              varient='secondary'
              onClick={() => {
                navigate('/');
              }}
            >
              <span className='material-icons'>arrow_back_ios</span>
            </ActionButton>
            <ActionButton
              className={styles.addBtn}
              varient='primary'
              type='submit'
            >
              Add Project
            </ActionButton>
          </div>
        </div>
      </form>
    );
  }

  return (
    <div className={`${styles.slide} ${styles.todoForm}`}>
      <h2 className={styles.title}>Create Project</h2>
      {content}
    </div>
  );
};

export default AddProjectForm;
