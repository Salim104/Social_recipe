import React from 'react';
import { auth } from '../config/firebase';
import {signOut} from "firebase/auth"
import { Link } from 'react-router-dom';
import { useAuthState} from "react-firebase-hooks/auth"
import { async } from '@firebase/util';

function Navbar() {
 const [user] = useAuthState(auth);

 const signUserOut = async () => {
     await signOut(auth);
 }


  return (
    <div className='navbar'>
    <div className='links'>
      <Link to="/">Home</Link>
      {!user ? <Link to="/login">Login</Link> :
          <Link to="/createpost">Create Post</Link>
      }
      
      
    </div>
      <div className='user'>
        {user &&
          <>
          <p>{user?.displayName}</p>
          <img src={user?.photoURL || ""} width="30" height="30"></img>
          <button onClick={signUserOut}>Log Out</button>
          </>
        }
      </div>
  </div>
  )
}

export default Navbar