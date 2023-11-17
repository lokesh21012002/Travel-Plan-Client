
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { BrowserRouter,Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Demo from './components/Demo';
import Protected from './components/Protected';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import { useState } from 'react';
function App() {

   const [isLoggedIn, setIsLoggedIn] = useState(false);

 const handleLogin = (loggedIn) => {
  console.log("Logged",loggedIn);
    setIsLoggedIn(loggedIn)
    ;
 };
  return (
    <BrowserRouter>
     <Routes>
          <Route path="/signup" element={<Registration />} />
          <Route path="/login"   element={<Demo handleLogin={handleLogin} />} />
          <Route path='/user/*'
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <UserHome />
                   </Protected>
          }/>
        

              

         

           



          
           <Route path='/admin/*'
                element={
                  <Protected isLoggedIn={isLoggedIn}>
                    <AdminHome />
                   </Protected>
          }/>
          
    </Routes>
    
  </BrowserRouter>
  );
}

export default App;
