import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";

const USER_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken";

export const setUser = (user: RegisterUserData | LoginResponse) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  if ("accessToken" in user) {
    localStorage.setItem(ACCESS_TOKEN_KEY, user.accessToken);
  }
};

export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const isLoggedIn = () => {
  const user = getUser();
  if (!user || !user.accessToken) return false;

  const tokenPayload = JSON.parse(atob(user.accessToken.split(".")[1]));
  const isTokenExpired = tokenPayload.exp * 1000 < Date.now();
  return !isTokenExpired;
};
