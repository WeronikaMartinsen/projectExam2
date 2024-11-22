import { createContext, useState, ReactNode, useEffect } from "react";
import { LoginResponse } from "../service/ApiCalls/Interfaces/loginResponse";
import { getUser, setUser, deleteUser } from "../service/Utils/userUtils";

interface AuthContextType {
  user: LoginResponse | null;
  isLoggedIn: boolean;
  loadingAuth: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<LoginResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUserState(storedUser);
      setIsLoggedIn(true);
    }
    setLoadingAuth(false);
  }, []);

  const login = (userData: LoginResponse) => {
    setUserState(userData);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserState(null);
    deleteUser();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loadingAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
