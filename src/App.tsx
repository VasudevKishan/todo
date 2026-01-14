import './App.css';
import Header from './header';
import ContentContainer from './content-container';
import { ThemeProvider } from './context/ThemeContext';

import { SidebarProvider } from './context/SidebarContext';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';
import TodoContainer from './pages';
import AddTaskForm from './pages/add-task';
import TaskDetail from './pages/task-detail';
import TasksList from './pages/tasks';
import RegisterPage from './pages/registerPage';
import AddProjectForm from './pages/add-project';
import EditTaskForm from './pages/edit-task';
import useTitle from './hooks/useTitle';
import PersistLogin from './pages/auth/persistLogin';
import Prefetch from './pages/auth/prefetch';
import RequireAuth from './pages/auth/RequireAuth';

function App() {
  useTitle('Todo');
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Routes>
              {/* Public Routes */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              {/* Protected Routes */}
              <Route element={<PersistLogin />}>
                <Route
                  element={<RequireAuth allowedRoles={['User', 'Admin']} />}
                >
                  <Route path='/' element={<ContentContainer />}>
                    <Route element={<Prefetch />}>
                      <Route element={<TodoContainer />}>
                        <Route path='/' element={<TasksList />} />
                        <Route path='/new-task' element={<AddTaskForm />} />
                        <Route
                          path='/new-project'
                          element={<AddProjectForm />}
                        />

                        <Route
                          path='/detail/:taskId'
                          element={<TaskDetail />}
                        />
                        <Route
                          path='/edit/:taskId'
                          element={<EditTaskForm />}
                        />
                        <Route
                          path='*'
                          element={<Navigate to='/login' replace />}
                        />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
              {/*End Protected Routes */}
            </Routes>
          </BrowserRouter>
        </Provider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
