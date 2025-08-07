import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import CurrentUserContextProvider from './context/CurrentUserContextProvider.tsx';
import axios from 'axios';

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrentUserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CurrentUserContextProvider>
  </StrictMode>
);
