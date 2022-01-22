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
    <Router>
      <div className="app">
      {user != null? 
      <Routes>
        <Route exact path="/updateData" element={<><UserSidebar /><UpdateData /></>}/>
        <Route exact path="/calculator" element={<><UserSidebar /><Calculator /></>}/>
        <Route exact path="/profile" element={[<UserSidebar />, <Profile />]} />
        <Route exact path="/login" element={user.id ? <Navigate to="/" /> : <Login />}/>
        <Route exact path="/" element={[<UserSidebar />, <Data />]} /> 
          
        {/* <Route exact path="/calculator">
          <UserSidebar />
          <Calculator />
        </Route> */}
        {/* <Route exact path="/register">
          <Register />
        </Route> */}
        {/* <Route exact path="/profile">
          <UserSidebar />
          <Profile />
        </Route> */}
        {/* <Route exact path="/login">
          {user.id ? <Redirect to="/" /> : <Login />}
        </Route> */}
        {/* <Route exact path="/">
          <UserSidebar />
          <Data />
        </Route> */}
      </Routes>
      :  
      <Routes>
        <Route exact path="/updateData" element={<Navigate to="/login" />} />
        <Route exact path="/calculator" element={<Navigate to="/login" />} />
        <Route exact path="/profile" element={<Navigate to="/login" />} />
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* <Route exact path="/">
          <Redirect to="/login" />
        </Route>         */}
        {/* <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route> */}
      </Routes>
      }
      </div>
    </Router>
  );
}

export default App;
