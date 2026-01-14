import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import styles from '../styles.module.css';
import { useGetTodoByIdQuery } from '../../app/todo/todoApiSlice';
import { useSelector } from 'react-redux';
import { selectProjectNameById } from '../../app/project/projectsApiSlice';
import useTitle from '../../hooks/useTitle';
import Loader from '../../components/Loader';

const TaskDetail = () => {
  const { taskId } = useParams<string>();
  const {
    data: todo,
    isLoading,
    isError,
  } = useGetTodoByIdQuery(
    {
      todoId: taskId ?? '',
    },
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const projectName = useSelector(selectProjectNameById(todo?.projectId));
  const navigate = useNavigate();

  useTitle('Todo | Detail');

  let content;

  // console.log(todo);

  if (isLoading) content = <Loader />;
  else if (isError || !projectName)
    content = <p className={styles.errorMessage}>Error</p>;
  else
    content = (
      <>
        <div className={styles.detailHeader}>
          <h2 className={styles.taskTitle}>{todo?.title}</h2>
          <div className={styles.icons}>
            {todo?.starred ? (
              <span className={`material-icons`}>star</span>
            ) : (
              ''
            )}

            {todo?.completed ? (
              <span className={`material-icons `}>check_circle</span>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={styles.detailContent}>
          <hr className={styles.divider}></hr>
          <br />
          <p>
            Project :&nbsp;
            <span className={styles.taskDescription}>{projectName}</span>
          </p>
          <p className={styles.taskDescription}>
            {todo?.description ? (
              todo?.description
            ) : (
              <span
                style={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                No Note
              </span>
            )}
          </p>
        </div>
      </>
    );

  return (
    <div
      className={`${styles.slide} ${styles.taskDetail} ${styles['task-detail']}`}
    >
      <div className={styles.expandTitle}>
        <h2 className={styles.title}>Task Details</h2>
      </div>
      {content}
      <div className={styles.expandFooter}>
        <ActionButton
          className={styles.backBtn}
          varient='secondary'
          onClick={() => {
            navigate('/');
          }}
        >
          <span className='material-icons'>arrow_back_ios</span>
        </ActionButton>
      </div>
    </div>
  );
};

export default TaskDetail;
