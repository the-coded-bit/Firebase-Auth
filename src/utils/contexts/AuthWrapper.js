import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

export const authContext = createContext();

function AuthWrapper({ children }) {
  // state to maintain the loading screen 
  // we'll show spinner until user loads
  const [loading, setLoading] = useState(false);

  // state to maintain user 
  const [authUser, setUser] = useState(null);

  //default use Effect
  useEffect(() => {
    console.log('use effect of authwrapper');
    onAuthStateChanged(auth, async (user) => {
      console.log('on auth state changed triggered');
      if (!user) {
        setUser(null);
        setLoading(false);
      }
      else {
        setUser(user);
        setLoading(false);
      }
    });
  }, []);

  //authOptions

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }


  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }


  function logout() {
    return signOut(auth);
  }


   //creating authOptions with functionalities of signin, signout, login
   const authOptions = {
    signup,
    login,
    logout,
    setUser,
    authUser,
    loading,
    setLoading
}

  return (
    <authContext.Provider value={authOptions}>
      {!loading ? children : <div>user loading</div>}
    </authContext.Provider>
  )
}

export default AuthWrapper