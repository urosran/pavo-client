import React, { useEffect, useState } from "react";
import app from "./base.js";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        app.auth().onAuthStateChanged(setCurrentUser);
    }, []);
    const provider = app.auth.GoogleAuthProvider;

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                provider
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};