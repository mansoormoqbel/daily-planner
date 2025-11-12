
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebaseConfig";

const AuthContext = createContext();
const auth = getAuth(app);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // تسجيل المستخدم الجديد
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // تسجيل الدخول
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // تسجيل الخروج
  const logout = () => signOut(auth);

  // مراقبة حالة المستخدم في كل مرة تتغير
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
