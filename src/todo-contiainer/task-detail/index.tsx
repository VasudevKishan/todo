import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { useCurrentAction } from '../../hooks/useCurrentAction';
import { useTasksSlice } from '../../hooks/useTasksSlice';
import styles from '../styles.module.css';

const TaskDetail = () => {
  const { changeAction } = useCurrentAction();
  const { getTaskbyID } = useTasksSlice();
  const navigate = useNavigate();
  const { taskId } = useParams();

  const selectedTask = getTaskbyID(Number(taskId));

  return (
    <div
      className={`${styles.slide} ${styles.taskDetail} ${styles['task-detail']}`}
    >
      <div className={styles.expandTitle}>
        <h2 className={styles.title}>Task Details</h2>
      </div>

      <div className={styles.detailHeader}>
        <h2 className={styles.taskTitle}>{selectedTask?.title}</h2>
        <div className={styles.icons}>
          {selectedTask?.starred ? (
            <span className={`material-icons`}>star</span>
          ) : (
            ''
          )}

          {selectedTask?.completed ? (
            <span className={`material-icons `}>check_circle</span>
          ) : (
            ''
          )}
        </div>
      </div>

      <div className={styles.detailContent}>
        <hr className={styles.divider}></hr>
        <p className={styles.taskDescription}>
          {selectedTask?.description ? (
            selectedTask?.description
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

      <div className={styles.expandFooter}>
        <ActionButton
          className={styles.backBtn}
          varient='secondary'
          onClick={() => {
            navigate('/');
            changeAction('view');
          }}
        >
          <span className='material-icons'>arrow_back_ios</span>
        </ActionButton>
      </div>
    </div>
  );
};

export default TaskDetail;
