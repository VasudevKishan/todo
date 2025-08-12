import { configureStore } from '@reduxjs/toolkit';
import taskListReducer from './taskList/taskListSlice';

export const store = configureStore({
  reducer: {
    taskList: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
