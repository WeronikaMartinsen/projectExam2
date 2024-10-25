import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";

const USER_KEY = "user";
const ACCESS_TOKEN_KEY = "accessToken"; 

// Function to set user and token in localStorage
export const setUser = (user: RegisterUserData | LoginResponse) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  // Check if the user object has an access token, and store it
  if ("accessToken" in user) {
    localStorage.setItem(ACCESS_TOKEN_KEY, user.accessToken);
  }
};

// Retrieve user data from localStorage
export const getUser = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

// Delete user data and access token from localStorage
export const deleteUser = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

// Check if a user is logged in by verifying the access token
export const isLoggedIn = () => {
  return !!localStorage.getItem(ACCESS_TOKEN_KEY);
};
