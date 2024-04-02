import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Student from './Pages/Student';
import Faculty from './Pages/Faculty';
import Account from './Pages/Account';
import Technician from './Pages/Technician';
import Error404 from './Pages/Error404';
import Login from './Pages/Login';

const allRoutes = createBrowserRouter([
  {
    path: '/home',
    element: <App/>
  },
  {
    path: '/tech',
    element: <Technician/>
  },
  {
    path: '/student',
    element: <Student/>
  },
  {
    path: '/acc',
    element: <Account/>
  },
  {
    path: '/faculty',
    element: <Faculty/>
  },
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '*',
    element: <Error404/>
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={allRoutes}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
