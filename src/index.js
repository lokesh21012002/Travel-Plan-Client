import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Demo from './components/Demo';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import Protected from './components/Protected';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <App/>
     {/* <BrowserRouter>
     <Routes>
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Demo />} />
          <Route path='/user/*'
                element={
                  <Protected isLoggedIn={false}>
                    <UserHome />
                  </Protected>
          }/>
           <Route path='/admin/*'
                element={
                  <Protected isLoggedIn={false}>
                    <AdminHome />
                  </Protected>
          }/>
          
    </Routes>
    
  </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
