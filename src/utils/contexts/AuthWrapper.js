import React, { createContext, useState } from 'react'

export const authContext = createContext();

function AuthWrapper({children}) {
  // state to maintain the loading screen 
  // we'll show spinner until user loads
  const [loading, setLoading] = useState(false);

  // state to maintain user 
  const [authUser, setUser] = useState(null);



  const authOptions = {}
  return (
    <authContext.Provider value={authOptions}>
      {!loading ? children : <div>user loading</div>}
    </authContext.Provider>
  )
}

export default AuthWrapper