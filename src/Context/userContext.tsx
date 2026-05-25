import {createContext, useState, useEffect } from "react"
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
    CurrentUser: null,
    setCurrentUser: () => null,
});
export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    
    const value = { currentUser, setCurrentUser };
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                console.log("User signed in:", user);
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            navigate("/");
        });
        return unsubscribe;
    }, []);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
