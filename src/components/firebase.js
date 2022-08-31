//jshint esversion:6

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/storage';
// require('firebase/auth');

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "control-your-money-spend.firebaseapp.com",
  projectId: "control-your-money-spend",
  storageBucket: "control-your-money-spend.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-K7FR2HZLC0",
};

// New firebase config
// initialize the app
// initializeApp(firebaseConfig);
// adding it to variable to can use it for firebase storage for images.
const firebaseApp = initializeApp(firebaseConfig);

// init services don't forget to activate it on firebase itself.
const db = getFirestore(); // connection is on with the firestore.

// Firebase Auth ---> getAuth() to activate the auth in the front end.
// NOTE when use signup with email and password you need to notify the client that min pass will be 6 characters.
const auth = getAuth();

// Getting google as ap Provider for login Methods.
const provider = new GoogleAuthProvider();

// initialze our app & database and activate auth system with provider which will handle login and register process.
// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) :  firebase.app();
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });

export { auth, provider, firebaseApp };

export default db;
