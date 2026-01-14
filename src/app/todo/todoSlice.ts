import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface filterState {
  filterBy: string | null;
  value: string | null;
}

const initialState: filterState = {
  filterBy: null,
  value: null,
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
      state.filterBy = null;
      state.value = null;
    },
  },
});

export const { setFilter, clearTodosFilter } = todoSlice.actions;

export default todoSlice.reducer;

export const getCurrentFilter = (state: RootState) => {
  return state.todoFilter;
};
