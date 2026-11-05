import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SpeechProvider } from './SpeechContext';
import { AudioProvider } from './audio';
import { AccountProvider } from './account';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SpeechProvider>
      <AudioProvider>
        <AccountProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AccountProvider>
      </AudioProvider>
    </SpeechProvider>
  </React.StrictMode>
);