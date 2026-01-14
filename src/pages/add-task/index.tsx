import { useState } from 'react';
import { ActionButton } from '../../components/ActionButton/ActionButton.tsx';
import styles from '../styles.module.css';

import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown/Dropdown.tsx';
import { useForm, Controller } from 'react-hook-form';
import {
  createTodoBodyType,
  useCreateTodoMutation,
} from '../../app/todo/todoApiSlice.ts';
import { useGetMyProjectsQuery } from '../../app/project/projectsApiSlice.ts';
import useTitle from '../../hooks/useTitle.tsx';
import Loader from '../../components/Loader/index.tsx';

const AddTaskForm = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  const [taskStarred, setTaskStarred] = useState<boolean>(false);

  const navigate = useNavigate();

  const [createTodo, { isLoading, isError }] = useCreateTodoMutation();

  const { data, isLoading: isProjectsLoading } = useGetMyProjectsQuery(
    undefined,
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  useTitle('Todo | New Todo');

  const {
    register,
    handleSubmit,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<createTodoBodyType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const handleFormSubmit = async (data: createTodoBodyType) => {
    // handle form data here, e.g., send to API or update state

    await createTodo(data).unwrap();
    if (!isError) navigate('/');
  };

  let content;

  if (isLoading) content = <Loader />;
  else if (data?.projects.length === 0) {
    content = (
      <div className={styles.loaderContainer}>
        <ActionButton
          varient='primary'
          onClick={() => navigate('/new-project')}
        >
          Add Project
        </ActionButton>
      </div>
    );
  } else
    content = (
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={styles.taskForm}>
          <div>
            <input
              type='text'
              id='taskTitle'
              placeholder='Title'
              {...register('title', {
                required: 'Title is Required',
                minLength: {
                  value: 4,
                  message: 'Minimum 4 characters required',
                },
                maxLength: {
                  value: 50,
                  message: 'Maximum 50 characters allowed',
                },
                onChange: () => {
                  if (errors.title) {
                    clearErrors('title');
                  }
                },
              })}
              maxLength={51}
            />
            <label htmlFor='taskTitle' style={{ display: 'none' }}>
              Title
            </label>

            <Controller
              name='starred'
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <span
                  className={`material-icons ${styles.formStarBtn} ${
                    animate ? styles.rotateOnClick : ''
                  }`}
                  role='checkbox'
                  onClick={() => {
                    field.onChange(!taskStarred);
                    setAnimate(true);
                    setTaskStarred(!taskStarred);
                  }}
                  onAnimationEnd={() => {
                    setAnimate(false);
                  }}
                  title='star'
                >
                  {taskStarred ? 'star' : 'star_border'}
                </span>
              )}
            />
          </div>
          {typeof errors.title?.message === 'string' && (
            <>
              <p className={styles.errorMessage}>{errors.title.message}</p>
            </>
          )}
          <br />
          <label htmlFor='taskDescription'>Note</label>
          <textarea
            id='taskDescription'
            placeholder='Description...'
            spellCheck='false'
            {...register('description', {
              required: 'Description is Required',
              maxLength: {
                value: 100,
                message: 'Maximum 100 characters allowed',
              },
              onChange: () => {
                if (errors.description) {
                  clearErrors('description');
                }
              },
            })}
            maxLength={101}
          />
          {typeof errors.description?.message === 'string' && (
            <>
              <p className={styles.errorMessage}>
                {errors.description.message}
              </p>
            </>
          )}
          <br />

          <label>Project</label>
          <Controller
            name='projectId'
            control={control}
            rules={{
              required: 'Project is required',
            }}
            render={({ field }) =>
              isProjectsLoading || data === undefined ? (
                <Loader />
              ) : (
                <Dropdown value={field.value} onChange={field.onChange}>
                  <Dropdown.Button>Select</Dropdown.Button>
                  <Dropdown.Menu>
                    <Dropdown.DefaultItem>Select</Dropdown.DefaultItem>
                    {data?.projects.map((project) => (
                      <Dropdown.Item key={project._id} value={project._id}>
                        {project.projectName}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )
            }
          />

          {typeof errors.projectId?.message === 'string' && (
            <>
              <p className={styles.errorMessage}>{errors.projectId.message}</p>
            </>
          )}
          <br />
        </div>
        <div className={styles.editFooter}>
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
            Add
          </ActionButton>
        </div>
      </form>
    );

  return (
    <div className={` ${styles.slide} ${styles.todoForm}`}>
      <h2 className={styles.title}>Add Task</h2>
      {content}
    </div>
  );
};

export default AddTaskForm;
