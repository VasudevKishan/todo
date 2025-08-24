import { ActionButton } from '../../components/ActionButton/ActionButton';
import { TaskItem } from '../../components/TaskItem.tsx';
import { useCurrentAction } from '../../hooks/useCurrentAction.tsx';
import styles from '../styles.module.css';
import { useTasksSlice } from '../../hooks/useTasksSlice.tsx';

const TasksList = () => {
  const {
    filteredTasks,
    toggleTaskCompletion,
    removeTask,
    selectTask,
    generateUniqueId,
  } = useTasksSlice();

  const { changeAction } = useCurrentAction();

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
                selectTask(task.id);
                changeAction('edit');
              }}
              onDelete={() => {
                removeTask(task.id);
              }}
              onDetail={() => {
                selectTask(task.id);
                changeAction('detail');
              }}
            />
          </li>
        ))}
      </ul>

      <ActionButton
        varient='primary'
        onClick={() => {
          const newTask = {
            id: generateUniqueId(),
            title: '',
            description: '',
            completed: false,
            starred: false,
          };
          selectTask(newTask.id);
          changeAction('edit');
        }}
        className={styles.addBtn}
      >
        Add Task
      </ActionButton>
    </div>
  );
};

export default TasksList;
