import { ActionButton } from '../../components/ActionButton/ActionButton';
import { TaskItem } from '../../components/TaskItem.tsx';
import styles from '../styles.module.css';
import { useTasksSlice } from '../../hooks/useTasksSlice.tsx';
import { useNavigate } from 'react-router-dom';

const TasksList = () => {
  const { filteredTasks, toggleTaskCompletion, removeTask } = useTasksSlice();

  const navigate = useNavigate();

  return (
    <div className={`${styles.slide} ${styles['view-task']}`}>
      <h2 className={styles.title}>Tasks</h2>

      <ul className={styles.TaskList}>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onChecked={toggleTaskCompletion}
              onEdit={() => {
                navigate(`/edit/${task.id}`);
              }}
              onDelete={() => {
                removeTask(task.id);
              }}
              onDetail={() => {
                navigate(`/detail/${task.id}`);
              }}
            />
          </li>
        ))}
      </ul>

      <ActionButton
        varient='primary'
        onClick={() => {
          navigate('/new-task');
        }}
        className={styles.addBtn}
      >
        Add Task
      </ActionButton>
    </div>
  );
};

export default TasksList;
