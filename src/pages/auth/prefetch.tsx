import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { projectsApiSlice } from '../../app/project/projectsApiSlice';
import { store } from '../../app/store';
import { todoApiSlice } from '../../app/todo/todoApiSlice';

const Prefetch = () => {
  useEffect(() => {
    console.log('Subscribing');
    const todo = store.dispatch(todoApiSlice.endpoints.getMyTodos.initiate());

    const projects = store.dispatch(
      projectsApiSlice.endpoints.getMyProjects.initiate(),
    );

    return () => {
      console.log('Unsubscribing');
      todo.unsubscribe();
      projects.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
