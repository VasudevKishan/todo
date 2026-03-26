import { useGetMyTodosQuery } from '../app/todo/todoApiSlice';

export const useGetMyTodosSubscriber = () => {
  return useGetMyTodosQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
};
