import { useDispatch, useSelector } from 'react-redux';
import {
  currentSelectedTask,
  filteredTaskList,
  allTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
  filterTasks,
  selectTask,
  updateTask,
} from '../state/taskList/taskListSlice';
import { Task } from '../context/helper';

export const useTasksSlice = () => {
  const dispatch = useDispatch();
  const tasks: Task[] = useSelector(allTasks);

  const filteredTasks: Task[] = useSelector(filteredTaskList);

  const selectedTask = useSelector(currentSelectedTask);

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

  const selectTaskByID = (id: number) => dispatch(selectTask(id));

  return {
    // tasks,
    filteredTasks,
    selectedTask,
    generateUniqueId,
    addTask: addNewTask,
    removeTask,
    filterByStarred,
    clearFilter,
    selectTask: selectTaskByID,
    toggleTaskCompletion: updateTaskStatus,
    updateTask: updateTaskDetails,
  };
};
