import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Firebase";

const auth = getAuth();
console.log(auth._currentUser);
export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, setCurrentUser);
    }, []);

    return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
