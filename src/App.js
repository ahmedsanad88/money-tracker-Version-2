//jshint esversion:6
import React, { useLayoutEffect, Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "./components/firebase";
import { signOut } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { login, logout } from "./features/userSlice";

import "./App.css";
import Loader from "./components/loader/Loader";
import Data from "./components/Data";
import UserSidebar from "./components/UserSidebar";
import Login from "./components/Login";
import NotFound from "./components/notFound/NotFound";
import ErrorFallback from "./components/ErrorBoundary/ErrorFallback";

// lazy loading.
const UpdateData = lazy(() => import("./components/UpdateData"));
const Calculator = lazy(() => import("./components/Calculator"));
const Profile = lazy(() => import("./components/Profile"));
const Register = lazy(() => import("./components/Register"));

function App() {
  const dispatch = useDispatch();
  // check if the user is authorized or not.
  useLayoutEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("isLoggedIn", true);
        dispatch(
          login({
            ...user,
            id: authUser.uid,
            email: authUser.email,
          })
        );
        // console.log(authUser);
      } else {
        // logout if process failed for register or login.
        signOut(auth)
          .then(() => {
            dispatch(logout());
            localStorage.removeItem("isLoggedIn");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [dispatch]);

  // user state handler.
  let user = useSelector((state) => state.user.user);

  const isAuth = localStorage.getItem("isLoggedIn") || "";

  return (
    // using react router dom which will handle all react routes and components.
    // Error Boundary will improve the user experience by catching error that
    // effect on the state change and handle it.
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Router>
        <div className="app">
          <Suspense fallback={<Loader />}>
            <Routes>
              {isAuth ? (
                <>
                  <Route path="/" element={<UserSidebar />}>
                    <Route index element={<Data />} />
                    <Route exact path="updateData" element={<UpdateData />} />
                    <Route exact path="calculator" element={<Calculator />} />
                    <Route exact path="profile" element={<Profile />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                  </Route>
                </>
              ) : (
                <>
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate replace to="/login" />} />
                </>
              )}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
