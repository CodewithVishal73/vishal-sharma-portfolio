import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { warmUp } from './lib/api.js';
import './styles/tokens.css';
import './styles/base.css';
import './styles/motion.css';

// Fire-and-forget backend warm-up
warmUp();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
