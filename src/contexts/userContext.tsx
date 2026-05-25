import { createContext, useState, useEffect } from "react";

import type {
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase";

import type { User } from "firebase/auth";


type UserContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {


  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(
      async (user: User | null) => {
     if (user?.emailVerified) {
          console.log("User signed in:", user);

          await createUserDocumentFromAuth(user);
           setCurrentUser(user);
        }

       
     
      }
    );

    return unsubscribe;
  }, []);
  

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};