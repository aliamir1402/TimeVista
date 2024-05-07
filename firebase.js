// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_SNgfIEr7BsanjUS2wF47XdN8aUSHjzM",
  authDomain: "timevista-login.firebaseapp.com",
  projectId: "timevista-login",
  storageBucket: "timevista-login.appspot.com",
  messagingSenderId: "443581953338",
  appId: "1:443581953338:web:fd92eb14b9154d61298c03",
  measurementId: "G-16Q5PKG0N8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, facebookProvider };
