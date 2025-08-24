import './App.css';
import Header from './header';
import ContentContainer from './content-container';
import { ThemeProvider } from './context/ThemeContext';

import { SidebarProvider } from './context/SidebarContext';
import { Provider } from 'react-redux';
import { store } from './state/store';

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Provider store={store}>
          <>
            <Header />
            <ContentContainer />
          </>
        </Provider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
