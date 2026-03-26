import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface filterState {
  filterBy?: string;
  value?: string;
}

const initialState: filterState = {
  filterBy: undefined,
  value: undefined,
};

const todoSlice = createSlice({
  name: 'todoFilter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<filterState>) => {
      state.filterBy = action.payload.filterBy;
      state.value = action.payload.value;
    },
    clearTodosFilter: (state) => {
      state.filterBy = undefined;
      state.value = undefined;
    },
  },
});

export const { setFilter, clearTodosFilter } = todoSlice.actions;

export default todoSlice.reducer;

export const getCurrentFilter = (state: RootState) => {
  return state.todoFilter;
};
