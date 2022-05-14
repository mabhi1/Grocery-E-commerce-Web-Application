import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import "./Firebase";

const auth = getAuth();
console.log(auth.currentUser);
export const AuthContext = React.createContext(null);
 
export function useAuth() {
    return useContext(AuthContext);
  }

export const AuthProvider = ({ children }) => {
    const [pending, setPending] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        
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
