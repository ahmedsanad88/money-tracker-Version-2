//jshint esversion:6

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import db from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./Register.css";
import Aos from "aos";
import "aos/dist/aos.css";


function Register() {
    const navigate = useNavigate();
    // state for register form.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Contorl AOS animation..
    useEffect(() => {
        // initailize Aos
        Aos.init({
            duration: 2000
        });
        // make sure it's applying only one
        Aos.init({
            once: true,
            disable: 'phone'
        });
    }, []);

    // function which handle new client register..
    const handleRegister = (e) => {
        e.preventDefault();
        //  using firebase register through auth customer.
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // when it's successfully done (created)
                if(auth) {
                    const docRef = doc(db, 'users', auth.user.uid);
                    setDoc(docRef, {
                        email: auth.user.email                     
                    })
                    .then(() => {
                        console.log('data updated');
                        navigate('/');
                    });

                    // db.collection('users').doc(auth.user.uid && auth.user.uid).set({
                    //     email: auth.user.email,
                    //     photo: '',
                    //     fullname: '',
                    //     mobile: '',
                    //     gender: '',
                    //     country: '',
                    //     totalEarn: 0,
                    //     totalSpend: 0
                    // }, { merge: true });
                }
            })
            .catch(error => alert(error.message));
    };
    // using basic form with two inputs for new clients as additional option for register.
    return (
        <div className="register">
            <div data-aos="fade-up-left" className="register_main">
                <div className="details">
                    <img alt="logo" src={process.env.PUBLIC_URL + "images/MyLogo.png"}/>
                    <h3>Welcome to our money control app</h3>
                </div>
                <form>
                    <div>
                        <label htmlFor="emailInput"></label>
                        <input id="emailInput" type="email" name="email" autoComplete="false" autoFocus onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div>
                        <label htmlFor="passwordInput"></label>
                        <input id="passwordInput" type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </div>
                    <div>
                        <input id="register_btn" type="submit" value="REGISTER" onClick={(e) => handleRegister(e)}/>
                    </div>
                </form>
                <div className="loginPage">
                    <h3 onClick={() => navigate('/login')}>Back To Login</h3>
                </div>
            </div>
        </div>
    )
}

export default Register;
