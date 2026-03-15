import { useGetMyProjectsQuery } from '../app/project/projectsApiSlice';

export const useGetMyProjectSubscriber = () => {
  return useGetMyProjectsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: false,
    refetchOnMountOrArgChange: true,
  });
};
