import { useEffect, useState } from 'react';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import styles from '../styles.module.css';

import { useCurrentAction } from '../../hooks/useCurrentAction';
import { Task } from '../../context/helper';
import { useTasksSlice } from '../../hooks/useTasksSlice.tsx';

const AddTaskForm = () => {
  const [animate, setAnimate] = useState<boolean>(false);
  const { addTask, selectedTask, generateUniqueId, updateTask } =
    useTasksSlice();
  const { changeAction } = useCurrentAction();
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskStarred, setTaskStarred] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTask) {
      setTaskTitle(selectedTask.title || '');
      setTaskDescription(selectedTask.description || '');
      setTaskStarred(selectedTask.starred);
    }
  }, [selectedTask]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      console.log('title is required');
      return;
    }

    if (selectedTask) {
      const currentTask: Task = {
        id: selectedTask.id,
        title: taskTitle,
        description: taskDescription,
        starred: taskStarred,
        completed: false,
      };
      updateTask(currentTask);
      console.log('Task updated : ', currentTask);
    } else {
      const newTask: Task = {
        id: generateUniqueId(),
        title: taskTitle,
        description: taskDescription,
        starred: taskStarred,
        completed: false,
      };
      addTask(newTask);
      console.log('Task added : ', newTask);
    }

    changeAction('view');
  };
  return (
    <div className={` ${styles.slide} ${styles['add-task']}`}>
      <h2 className={styles.title}>Add Task</h2>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.taskForm}>
          <div>
            <input
              type='text'
              name='taskTitle'
              id='taskTitle'
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <label htmlFor='taskTitle' style={{ display: 'none' }}>
              Title
            </label>
            <span
              className={`material-icons ${styles.formStarBtn} ${
                animate ? styles.rotateOnClick : ''
              }`}
              onClick={() => {
                setAnimate(true);
                setTaskStarred(!taskStarred);
              }}
              onAnimationEnd={() => {
                setAnimate(false);
              }}
            >
              {taskStarred ? 'star' : 'star_border'}
            </span>
          </div>
          <br />
          <label htmlFor='taskDescription'>Note</label>
          <textarea
            name='taskDescription'
            id='taskDescription'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder='Type here...'
            spellCheck='false'
          />
        </div>
        <div className={styles.editFooter}>
          <ActionButton
            className={styles.backBtn}
            varient='secondary'
            onClick={() => {
              console.log('selected task: ', selectedTask);
              changeAction('view');
            }}
          >
            <span className='material-icons'>arrow_back_ios</span>
          </ActionButton>
          <ActionButton
            className={styles.addBtn}
            varient='primary'
            type='submit'
          >
            {selectedTask ? 'Update' : 'Add'}
          </ActionButton>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
