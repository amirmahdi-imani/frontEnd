import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { Provider } from 'react-redux';
import { store } from './App/store';
import AuthProvider from './Providers/AuthProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AuthProvider>
        <App />  
    </AuthProvider>
  </Provider>
);

