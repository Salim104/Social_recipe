import React from 'react';
import {auth,provider} from "../config/firebase";
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';

function Login() {
  const  navigate = useNavigate();
  
  const signWithGoogle = async () => {
    const results = await signInWithPopup(auth,provider)
    console.log(results)
    navigate("/")
  }
  return (
    <div>
      <p>Sign in with Google</p>
      <button onClick={signWithGoogle}>Sign with Google</button>
    </div>
  )
}

export default Login