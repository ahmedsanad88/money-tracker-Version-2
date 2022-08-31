//jshint esversion:6

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import db from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Aos from "aos";
import "aos/dist/aos.css";

import "./Register.css";
import logo from "../images/logo.png";

// Helper function to add line through text for password validate
function checkLine(id, isAdded) {
  if (isAdded) {
    document.getElementById(id).classList.remove("line");
  } else {
    document.getElementById(id).classList.add("line");
  }
  return;
}

function Register() {
  const navigate = useNavigate();
  // state for register form.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Contorl AOS animation..
  useEffect(() => {
    // initailize Aos
    Aos.init({
      duration: 1000,
    });
    // make sure it's applying only one
    Aos.init({
      once: true,
      disable: "phone",
    });
  }, []);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      checkLine("eight", false);
    } else {
      checkLine("eight", true);
    }
    if (/[a-z]+/.test(e.target.value)) {
      checkLine("lowercase", false);
    } else {
      checkLine("lowercase", true);
    }
    if (/[A-Z]+/.test(e.target.value)) {
      checkLine("uppercase", false);
    } else {
      checkLine("uppercase", true);
    }
    if (/\d+/.test(e.target.value)) {
      checkLine("numeric", false);
    } else {
      checkLine("numeric", true);
    }
    if (/[!@#$%^&*]+/.test(e.target.value)) {
      checkLine("special", false);
    } else {
      checkLine("special", true);
    }
  };

  // function which handle new client register..
  const handleRegister = (e) => {
    e.preventDefault();
    // Handle validate the email and password.
    const emailRegexp =
      /^[a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-zA-Z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-.]{0,1}([a-zA-Z][-.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([.-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i;

    let passwordRegExp =
      /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/g;

    // Validation for email
    if (emailRegexp.test(email)) {
      // validate the password
      if (passwordRegExp.test(password)) {
        //  using firebase register through auth customer.
        createUserWithEmailAndPassword(auth, email, password)
          .then((auth) => {
            // when it's successfully done (created)
            if (auth) {
              const docRef = doc(db, "users", auth.user.uid);
              setDoc(docRef, {
                email: auth.user.email,
              }).then(() => {
                console.log("data updated");
                navigate("/");
              });
            }
          })
          .catch((error) => alert(error.message));
      } else {
        alert("Please use a secure password as shown below.");
      }
    } else {
      alert("Please use a valid email format");
    }
  };
  // using basic form with two inputs for new clients as additional option for register.
  return (
    <div className="register">
      <div data-aos="fade-up-left" className="register_main">
        <div className="details">
          <img alt="logo" src={logo} />
          <h3>Welcome to our money control app</h3>
        </div>
        <form>
          <div>
            <label htmlFor="emailInput">Email</label>
            <input
              id="emailInput"
              type="email"
              name="email"
              autoComplete="false"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="abc@mail.com"
            />
          </div>
          <div>
            <label htmlFor="passwordInput">Password</label>
            <input
              id="passwordInput"
              type="password"
              name="password"
              onChange={(e) => handlePassword(e)}
              value={password}
              placeholder="password"
            />
            <ul className="password_info__container">
              <li id="lowercase" className="password__info">
                The password must contain at least 1 lowercase alphabetical
                character.
              </li>
              <li id="uppercase" className="password__info">
                The password must contain at least 1 uppercase alphabetical
                character.
              </li>
              <li id="numeric" className="password__info">
                The password must contain at least 1 numeric character
              </li>
              <li id="special" className="password__info">
                The password must contain at least one special character
              </li>
              <li id="eight" className="password__info">
                The password must be eight characters or longer
              </li>
            </ul>
          </div>
          <div>
            <input
              id="register_btn"
              type="submit"
              value="REGISTER"
              onClick={(e) => handleRegister(e)}
            />
          </div>
        </form>
        <div className="loginPage">
          <h3 onClick={() => navigate("/login")}>Back To Login</h3>
        </div>
      </div>
    </div>
  );
}

export default Register;
