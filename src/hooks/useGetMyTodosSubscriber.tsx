import { useGetMyTodosQuery } from '../app/todo/todoApiSlice';

type GetMyTodosQueryParams = {
  filterBy?: string;
  value?: string;
};

export const useGetMyTodosSubscriber = (queryParams: GetMyTodosQueryParams) => {
  return useGetMyTodosQuery(queryParams, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
};
