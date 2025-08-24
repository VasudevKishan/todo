import { useDispatch, useSelector } from 'react-redux';
import {
  currentSelectedTask,
  filteredTaskList,
  allTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
  filterTasks,
  updateTask,
  getTask,
} from '../state/taskList/taskListSlice';
import { Task } from '../context/helper';
// import RootState from your store definition
import { RootState } from '../state/store';

export const useTasksSlice = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(allTasks);

  const filteredTasks: Task[] = useSelector(filteredTaskList);

  const selectedTask = useSelector(currentSelectedTask);
  function getTaskbyID(taskId: number) {
    const task: Task | undefined = useSelector((state: RootState) =>
      getTask(state, taskId)
    );
    return task;
  }

  const generateUniqueId = (): number => {
    return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
  };

  const addNewTask = (task: Task) => dispatch(addTask(task));

  const updateTaskStatus = (taskId: number) =>
    dispatch(toggleTaskCompletion(taskId));

  const updateTaskDetails = (task: Task) => dispatch(updateTask(task));

  const removeTask = (taskId: number) => dispatch(deleteTask(taskId));

  const filterByStarred = () => dispatch(filterTasks('starred'));

  const clearFilter = () => dispatch(filterTasks('all'));

  return {
    // tasks,
    filteredTasks,
    selectedTask,
    generateUniqueId,
    addTask: addNewTask,
    removeTask,
    filterByStarred,
    clearFilter,
    toggleTaskCompletion: updateTaskStatus,
    updateTask: updateTaskDetails,
    getTaskbyID,
  };
};
