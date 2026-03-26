import { useMemo } from 'react';
import { useGetMyTodosQuery } from '../app/todo/todoApiSlice';

export const useFilteredTodos = (filter?: { type: string; value: string }) => {
  const {
    data: myTodos,
    isError,
    error,
  } = useGetMyTodosQuery(undefined, {
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  });
  const filteredTodos = useMemo(() => {
    if (!myTodos) return [];

    switch (filter?.type) {
      case 'starred':
        return myTodos.todos.filter((t) => t.starred);
      case 'completed':
        return myTodos.todos.filter((t) => t.completed);
      case 'project':
        return myTodos.todos.filter((t) => t.projectId === filter.value);
      default:
        return myTodos.todos;
    }
  }, [myTodos, filter]);

  return { data: filteredTodos, isError, error };
};
