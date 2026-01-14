import { ActionButton } from '../../components/ActionButton/ActionButton.tsx';
import { TaskItem } from '../../components/TaskItem.tsx/index.tsx';
import styles from '../styles.module.css';
import { useNavigate } from 'react-router-dom';
import {
  useDeleteTodoMutation,
  useGetMyTodosQuery,
  useUpdateTodoMutation,
} from '../../app/todo/todoApiSlice.ts';
import { useSelector } from 'react-redux';
import { getCurrentFilter } from '../../app/todo/todoSlice.ts';
import { Task } from '../../context/helper.tsx';
import useTitle from '../../hooks/useTitle.tsx';
import Loader from '../../components/Loader/index.tsx';

// Todo: Portals for error messages
const TasksList = () => {
  const filters = useSelector(getCurrentFilter);
  // const [errMsg, setErrMsg] = useState<string>('');
  // const filterObj: getTodosQueryParams = {
  //   filterBy: filterBy ?? undefined,
  //   value: value ?? undefined,
  // };
  // console.log(filterObj);
  const [updateTodo, { isLoading: isUpdateTodoLoading }] =
    useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading }] =
    useDeleteTodoMutation();

  const queryParams = {
    filterBy: filters.filterBy ?? undefined,
    value: filters.value ?? undefined,
  };
  // console.log(queryParams);
  const {
    data: myTodos,
    isLoading,
    isError,
    error,
  } = useGetMyTodosQuery(queryParams, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useTitle('Todo');
  const navigate = useNavigate();

  const toggleTaskCompletion = async (task: Task) => {
    // const { message } =
    await updateTodo({
      todoId: task.id,
      data: { completed: !task.completed },
    }).unwrap();

    // console.log(message);
  };
  const deleteTask = async (task: Task) => {
    // const { message } =
    await deleteTodo({ todoId: task.id }).unwrap();

    // console.log(message);
  };

  let content;

  if (isError) {
    console.log(error);
    content = <div className={styles.loaderContainer}>No Tasks found!</div>;
  } else if (isLoading || isDeleteTodoLoading || isUpdateTodoLoading)
    content = <Loader />;
  else {
    content = (
      <ul className={styles.TaskList}>
        {myTodos?.todos.map((task) => (
          <li key={task.id}>
            <TaskItem
              task={task}
              onChecked={() => {
                toggleTaskCompletion(task);
              }}
              onEdit={() => {
                navigate(`/edit/${task.id}`);
              }}
              onDelete={() => {
                deleteTask(task);
              }}
              onDetail={() => {
                navigate(`/detail/${task.id}`);
              }}
            />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={`${styles.slide} ${styles['view-task']}`}>
      <h2 className={styles.title}>Tasks</h2>
      {content}

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
