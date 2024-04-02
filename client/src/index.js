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
import Login from './Pages/Login';
import AddDevices from './Pages/Faculty_AddElements/AddDevices';
import AddStaff from './Pages/Faculty_AddElements/AddStaff';
import Pay from './Pages/Pay';
import UpdateDevies from './Pages/Faculty_AddElements/UpdateDevices';
import UpdateStaff from './Pages/Faculty_AddElements/UpdateStaff';


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
    path : '/acc/pay',
    element : <Pay/>
  },
  {
    path : '/faculty',
    element : <Faculty/>
  },
  {
    path : '/adddevices',
    element : <AddDevices/>
  },
  {
    path : '/addstaff',
    element : <AddStaff/>
  },
  {
    path : '/updatedevices',
    element : <UpdateDevies/>
  },
  {
    path : '/updatestaff',
    element : <UpdateStaff/>
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
    path : '/login',
    element : <Login/>
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
