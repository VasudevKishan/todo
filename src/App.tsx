import './App.css';
import Header from './header';
import ContentContainer from './content-container';
import { ThemeProvider } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <TaskProvider>
          <>
            <Header />
            <ContentContainer />
          </>
        </TaskProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
