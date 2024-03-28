import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Student from './Pages/Student'
import Faculty from './Pages/Faculty'
import Account from './Pages/Account'
import Chat from './Pages/Chat'
import AboutUs from './Pages/AboutUs'
import Technician from './Pages/Technician'
import Error404 from './Pages/Error404';


const root = ReactDOM.createRoot(document.getElementById('root'));
const allRoutes=createBrowserRouter([
  {
    path : '/',
    element : <App/>
  },
  {
    path : '/tech',
    element : <Technician/>
  },
  {
    path : '/student',
    element : <Student/>
  },
  {
    path : '/acc',
    element : <Account/>
  },
  {
    path : '/faculty',
    element : <Faculty/>
  },
  {
    path: "/chat",
     element:<Chat/> 
  },
  {
    path: "/about",
     element:<AboutUs/> 
  },
  {
    path : '*',
    element : <Error404/>
  }
  
])



root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <RouterProvider router={allRoutes}/> */}
    <RouterProvider router={allRoutes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
