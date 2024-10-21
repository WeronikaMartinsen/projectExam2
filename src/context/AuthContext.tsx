import React, { createContext, useState, ReactNode } from "react";
import { LoginResponse } from "../service/ApiCalls/Interfaces/loginResponse";
import { getUser, setUser, deleteUser } from "../service/Utils/userUtils";

// Define the context type
interface AuthContextType {
  user: LoginResponse | null;
  isLoggedIn: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<LoginResponse | null>(getUser());

  // Check if the user is logged in
  const isLoggedIn = !!user;

  // Handle user login and set the user in localStorage
  const login = (userData: LoginResponse) => {
    setUserState(userData);
    setUser(userData); // Store user in localStorage
  };

  // Handle user logout and remove the user from localStorage
  const logout = () => {
    setUserState(null);
    deleteUser();
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
