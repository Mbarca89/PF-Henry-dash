import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import { store } from "./store"
import axios from 'axios';

const token = localStorage.getItem('token')

axios.interceptors.request.use(
  (config) => {
     config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error: any) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>

);
