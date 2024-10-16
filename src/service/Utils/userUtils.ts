import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";

const USER_KEY = "user";

// Updated function to accept either RegisterUserData or LoginResponse
export const setUser = (user: RegisterUserData | LoginResponse) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => {
  return !!getUser();
};
