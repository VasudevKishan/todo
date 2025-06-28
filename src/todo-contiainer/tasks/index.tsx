import { ActionButton } from '../../components/ActionButton/ActionButton';
import { TaskItem } from '../../components/TaskItem.tsx';
import { useCurrentAction } from '../../hooks/useCurrentAction.tsx';
import { useTasks } from '../../hooks/useTasks.tsx';
import styles from '../styles.module.css';

const TasksList = () => {
  const {
    filteredTasks,
    toggleTaskCompletion,
    removeTask,
    selectTask,
    generateUniqueId,
    changeState,
  } = useTasks();
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
                selectTask(task);
                changeState('edit');
                changeAction('edit');
              }}
              onDelete={() => {
                removeTask(task.id);
              }}
              onDetail={() => {
                selectTask(task);
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
          selectTask(newTask);
          changeState('new');
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
