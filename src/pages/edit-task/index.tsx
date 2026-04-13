import { useEffect, useState } from 'react';
import { ActionButton } from '../../components/ActionButton/ActionButton.tsx';
import styles from '../styles.module.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateTodoMutation,
  useGetTodoByIdQuery,
  updateTodoBodyType,
} from '../../app/todo/todoApiSlice.ts';

import Dropdown2 from '../../components/Dropdown2/Dropdown2.tsx';
import useTitle from '../../hooks/useTitle.tsx';
import Loader from '../../components/Loader/index.tsx';
import { useGetMyProjectsQuery } from '../../app/project/projectsApiSlice.ts';

interface EditTodoFormValues {
  title: string;
  description?: string;
  starred: boolean;
  projectId: string | null;
}

const EditTaskForm = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  const navigate = useNavigate();

  useTitle('Todo | Edit Todo');

  const { taskId } = useParams<string>();
  const {
    data: todo,
    isLoading: isGetTodoLoading,
    isSuccess,
  } = useGetTodoByIdQuery({
    todoId: taskId ?? '',
  });
  const [taskStarred, setTaskStarred] = useState<boolean>(
    todo?.starred || false,
  );

  const [updateTodo, { isLoading, isError, error }] = useUpdateTodoMutation();

  // const { data, isLoading: isProjectsLoading } = useGetMyProjectSubscriber();
  const { data, isLoading: isProjectsLoading } = useGetMyProjectsQuery(
    undefined,
    {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: true,
    },
  );

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<EditTodoFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      starred: false,
      projectId: undefined,
    },
  });

  const handleFormSubmit = async (data: EditTodoFormValues) => {
    try {
      // handle form data here, e.g., send to API or update state
      // console.log(data);
      if (!taskId) {
        // console.log('Error, no parama');
      } else {
        const reqBody: updateTodoBodyType = {};
        if (data.title !== todo?.title) reqBody.title = data.title;
        if (data.description !== todo?.description)
          reqBody.description = data.description;
        if (data.starred !== todo?.starred) reqBody.starred = data.starred;
        if (data.projectId !== todo?.projectId)
          reqBody.projectId = data.projectId || undefined;

        await updateTodo({
          todoId: taskId,
          data: reqBody,
        }).unwrap();
      }

      if (!isError) navigate('/');
    } catch (err) {
      const errorObj = err as { data: { message: string } };
      console.error(errorObj.data.message);
    }
  };

  useEffect(() => {
    if (isSuccess && todo) {
      reset({
        title: todo.title,
        description: todo.description ?? '',
        starred: todo.starred,
        projectId: todo.projectId,
      });
    }
  }, [isSuccess, todo, reset]);

  const projectOptions = data?.projects.map((project) => {
    return { value: project._id, label: project.projectName };
  });

  let content;

  if (isLoading || isGetTodoLoading) content = <Loader />;
  else
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
                  value: 3,
                  message: 'Minimum 3 characters required',
                },
                maxLength: {
                  value: 40,
                  message: 'Maximum 40 characters allowed',
                },
                onChange: () => {
                  if (errors.title) {
                    clearErrors('title');
                  }
                },
              })}
              maxLength={40}
            />
            <label htmlFor='taskTitle' style={{ display: 'none' }}>
              Title
            </label>

            <Controller
              name='starred'
              control={control}
              defaultValue={todo?.starred}
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
              // required: 'Description is Required',
              maxLength: {
                value: 200,
                message: 'Maximum 200 characters allowed',
              },
              onChange: () => {
                if (errors.description) {
                  clearErrors('description');
                }
              },
            })}
            maxLength={200}
          />
          {typeof errors.description?.message === 'string' && (
            <>
              <p className={styles.errorMessage}>
                {errors.description.message}
              </p>
            </>
          )}
          <br />

          <label htmlFor='projectId'>Project</label>
          <Controller
            name='projectId'
            control={control}
            defaultValue={todo?.projectId}
            rules={{
              required: 'Project is required',
            }}
            render={({ field }) =>
              isProjectsLoading || data === undefined ? (
                <Loader />
              ) : (
                <Dropdown2
                  value={field.value}
                  onChange={field.onChange}
                  options={projectOptions || []}
                />
              )
            }
          />

          {typeof errors.projectId?.message === 'string' && (
            <>
              <p className={styles.errorMessage}>{errors.projectId.message}</p>
            </>
          )}
          <br />
          {isError && (
            <div className={styles.errorBox}>
              {(error as { data: { message: string } }).data.message}
            </div>
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
            Save
          </ActionButton>
        </div>
      </form>
    );

  return (
    <div className={` ${styles.slide} ${styles.todoForm}`}>
      <h2 className={styles.title}>Edit Task</h2>
      {content}
    </div>
  );
};

export default EditTaskForm;
