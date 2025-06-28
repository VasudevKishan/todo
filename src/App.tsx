import './App.css';
import Header from './header';
import ContentContainer from './content-container';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <SidebarProvider>
          <>
            <Header />
            <ContentContainer />
          </>
        </SidebarProvider>
      </ThemeProvider>
    </TaskProvider>
  );
}

export default App;
