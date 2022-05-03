import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import "./Firebase";

const auth = getAuth();
console.log(auth.currentUser);
export const AuthContext = React.createContext(null);

//new code 
export function useAuth() {
    return useContext(AuthContext);
  }

export const AuthProvider = ({ children }) => {
    const [pending, setPending] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
   // const [loading, setLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged(auth, setCurrentUser);
        // setCurrentUser(auth._currentUser);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setPending(false);
            setCurrentUser(user);
          });
          return unsubscribe;
    }, []);

    if(pending){
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={{ currentUser }}>{!pending && children}</AuthContext.Provider>;
};
