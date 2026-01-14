import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
if (import.meta.env.VITE_ENV === 'production') {
  disableReactDevTools();
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
