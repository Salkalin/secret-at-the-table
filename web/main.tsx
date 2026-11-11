import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AudioProvider } from './audio';
import { AccountProvider } from './account';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AudioProvider>
        <AccountProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AccountProvider>
      </AudioProvider>
  </React.StrictMode>
);