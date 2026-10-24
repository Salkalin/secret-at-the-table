import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SpeechProvider } from './SpeechContext';
import { AudioProvider } from './audio';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SpeechProvider>
      <AudioProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AudioProvider>
    </SpeechProvider>
  </React.StrictMode>
);