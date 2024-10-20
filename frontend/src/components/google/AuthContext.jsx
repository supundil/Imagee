import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const loginData = localStorage.getItem("loginData");
  const parsedLoginData = loginData ? JSON.parse(loginData) : null;

  const [isLoggedIn, setIsLoggedIn] = useState(!!parsedLoginData);

  const currentUser = parsedLoginData
    ? {
        id: parsedLoginData.id,
        displayName: parsedLoginData.displayName,
      }
    : null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
