import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Task } from '../../context/helper';
import { RootState } from '../store';

// type Filters = 'all' | 'starred';

interface TasksState {
  tasks: Task[];
  userState: 'new' | 'edit';
  selectedTaskId: number;
  filterQuery: 'all' | 'starred';
}

// Modify below for fetching Tasks from DB
function fetchTasks(): Task[] {
  try {
    const stored = localStorage.getItem('tasks');
    return stored ? (JSON.parse(stored) as Task[]) : [];
  } catch (e) {
    console.error('Error loading from localStorage', e);
    return [];
  }
}

const initialState: TasksState = {
  tasks: fetchTasks(),
  userState: 'new',
  selectedTaskId: 0,
  filterQuery: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveToLocalStorage(state.tasks);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload; // Immer allows direct assignment
        console.log(state.tasks[index]);
      }
      saveToLocalStorage(state.tasks);
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const myTask = state.tasks.find((task) => task.id === action.payload);
      if (myTask) {
        myTask.completed = !myTask.completed;
        saveToLocalStorage(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveToLocalStorage(state.tasks);
    },

    filterTasks: (state, action: PayloadAction<'all' | 'starred'>) => {
      state.filterQuery = action.payload;
    },
  },
});

function saveToLocalStorage(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {
    console.error(e);
  }
}

export const allTasks = (state: RootState): Task[] => {
  return state.taskList.tasks;
};

export const filteredTaskList = createSelector(
  (state: RootState) => state.taskList.tasks,
  (state: RootState) => state.taskList.filterQuery,
  (tasks, filterQuery) => {
    if (filterQuery === 'starred') {
      return tasks.filter((task) => task.starred);
    }
    return tasks;
  }
);

export const currentSelectedTask = (state: RootState): Task | null => {
  return (
    state.taskList.tasks.find(
      (task) => task.id === state.taskList.selectedTaskId
    ) || null
  );
};

export const getTask = (state: RootState, taskId: number) => {
  return state.taskList.tasks.find((task) => task.id === taskId);
};
export const {
  addTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
  filterTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
