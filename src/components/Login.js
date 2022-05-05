//jshint esversion:6

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './firebase';
import db from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Avatar from '@material-ui/core/Avatar';
import ReactTooltip from 'react-tooltip';
import "./Login.css";
import Aos from "aos";
import "aos/dist/aos.css";


function Login() {
    const navigate = useNavigate();
    // state for inputs which control the form.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // function to handle all login process through email and password.
    const handleLogin = (e) => {
        e.preventDefault();
        //  using firebase for login
        // auth.signInWithEmailAndPassword(email,password)
        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // only pushing client to home page.
                navigate('/');
            })
            .catch(error => alert(error.message));
    };
    // register by google account.
    const signIn = () => {
        // auth.signInWithPopup(provider)
        signInWithPopup(auth, provider)
        .then((auth) => {
            // console.log(auth);
            const docRef = doc(db, 'users', auth.user.uid);
            setDoc(docRef, {
                email: auth.user.email,
                photo: auth.user.photoURL,
                fullname: auth.user.displayName                   
            }).then(() => {
                console.log('data updated');
                navigate('/');
            });

        }).catch((error) => alert(error.message));
    };
    // using basic login form and google login used for make it easily for new or old user to user there google accounts.

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

    return (
        <div className="login">
            <div data-aos="fade-up-right" className="login_main">
                <div className="details">
                    <img alt="logo" src={process.env.PUBLIC_URL + "images/MyLogo.png"}/>
                    <h3>Welcome Back</h3>
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
                        <input id="login_btn" type="submit" value="LOGIN" onClick={(e) => handleLogin(e)}/>
                    </div>
                </form>
                <div className="login_google">
                    <Avatar alt="Google Login" src="https://img.utdstc.com/icon/207/754/20775446e3be597100aec56474bea69fc9e64d29e5cb3aa84d93f50462cc108c:200" onClick={signIn} data-tip="LOGIN WITH GOOGLE"/>
                    <ReactTooltip place="top" type="light" effect="float" multiline={true}/>
                    <div className="newUser">
                        <h3 onClick={() => navigate('/register')}>Register With Email</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
