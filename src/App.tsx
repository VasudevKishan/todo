import './App.css';
import Header from './header';
import ContentContainer from './content-container';
import { ThemeProvider } from './context/ThemeContext';

import { SidebarProvider } from './context/SidebarContext';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
