// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZn1QThCdSBZz4EFmwz-dBumCJOvptQmo",
  authDomain: "social-recipe-19855.firebaseapp.com",
  projectId: "social-recipe-19855",
  storageBucket: "social-recipe-19855.appspot.com",
  messagingSenderId: "177348740669",
  appId: "1:177348740669:web:5034054217f261d7f6cc54",
  measurementId: "G-KKGCLK0FLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// config for the post
export const db = getFirestore(app);
