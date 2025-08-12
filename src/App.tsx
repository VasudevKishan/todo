import './App.css';
import Header from './header';
import ContentContainer from './content-container';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { SidebarProvider } from './context/SidebarContext';
import { Provider } from 'react-redux';
import { store } from './state/store';

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Provider store={store}>
          <TaskProvider>
            <>
              <Header />
              <ContentContainer />
            </>
          </TaskProvider>
        </Provider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
