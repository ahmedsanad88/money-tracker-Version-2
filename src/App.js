//jshint esversion:6

import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { auth } from './components/firebase';
import {
  BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { login, logout } from "./features/userSlice";
import UserSidebar from "./components/UserSidebar";
import Data from "./components/Data";
import UpdateData from "./components/UpdateData";
import Calculator from "./components/Calculator";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Login from "./components/Login";
import './App.css';

function App() {
  // user state handler.
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  // check if user is authurized then will update the state.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          id: authUser.uid,
          email: authUser.email,
          photo: null,
          fullname: null,
          mobile: null,
          gender: null,
          country: null,
          totalEarn: 0,
          totalSpend: 0
        })
        );
        // console.log(authUser);
      } else {
        // logout if process filed for register or login.
        dispatch(logout());  
      }
    });
  }, [dispatch]);

  // console.log(user);

  return (
    // using react router dom which will handle all react components along with user login or out.
    // <Router>
    //   <div className="app">
    //     <Routes>
    //       {user ? (<>
    //         <Route exact path="/updateData" element={ [<UserSidebar />, <UpdateData />] }/>
    //         <Route exact path="/calculator" element={ [<UserSidebar />, <Calculator />] }/>
    //         <Route exact path="/profile" element={ [<UserSidebar />, <Profile />] } />
    //         <Route exact path="/" element={ [<UserSidebar />, <Data />] } /> 
    //         <Route exact path="/register" element={ <Navigate replace to='/' /> } />
    //         <Route exact path="/login" element={ <Navigate replace to='/' /> }/>
    //       </>) : (<>
    //           <Route exact path="/register" element={ <Register /> } />
    //           <Route exact path="/login" element={ <Login /> }/>
    //           <Route exact path="/" element={ <Navigate replace to='/login' /> } />
    //       </>)}
    //     </Routes>
    //   </div>
    // </Router>
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/updateData" element={user ? [<UserSidebar />, <UpdateData />] : <Navigate replace to='/login' />}/>
          <Route exact path="/calculator" element={user ? [<UserSidebar />, <Calculator />] : <Navigate replace to='/login' />}/>
          <Route exact path="/profile" element={user ? [<UserSidebar />, <Profile />] : <Navigate replace to='/login' />} />
          <Route exact path="/" element={user ? [<UserSidebar />, <Data />] : <Navigate replace to='/login' />} /> 
          <Route exact path="/register" element={user === null ? <Register /> : <Navigate replace to='/' />} />
          <Route exact path="/login" element={user === null ? <Login /> : <Navigate replace to='/' />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
