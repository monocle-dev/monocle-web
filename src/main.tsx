import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import CurrentUserContextProvider from './context/CurrentUserContextProvider.tsx';
import setupAxios from './utils/axios.ts';

setupAxios();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentUserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentUserContextProvider>
  </StrictMode>
);
