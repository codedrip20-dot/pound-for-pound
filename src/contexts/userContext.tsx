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
  loading: boolean;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
  loading: true,
});

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Global auth loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(
      async (user: User | null) => {
        try {
          // Only allow verified users
          if (user?.emailVerified) {
            console.log("User signed in:", user);

            // Create firestore document if user doesn't exist
            await createUserDocumentFromAuth(user);

            // Save authenticated user globally
            setCurrentUser(user);
          } else {
            // Unverified or signed out user
            setCurrentUser(null);
          }
        } catch (error) {
          console.log("Auth Listener Error:", error);
        } finally {
          // Firebase auth check completed
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};