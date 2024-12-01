import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";
import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { useAuthStore } from "../Store/authStore";

/**
 * Sets the user in the authentication store.
 *
 * This function sets the user (either a new registration or login response)
 * into the authentication store, enabling the application to track the
 * current authenticated user.
 *
 * @param {RegisterUserData | LoginResponse} user - The user data to be set in the store.
 */

export const setUser = (user: RegisterUserData | LoginResponse) => {
  const store = useAuthStore.getState();
  store.setUser(user);
};

/**
 * Retrieves the current authenticated user from the authentication store.
 *
 * This function returns the user data if the user is logged in and has a valid access token,
 * otherwise, it returns `null`.
 *
 * @returns {RegisterUserData | LoginResponse | null} The current user data or `null` if the user is not logged in.
 */

export const getUser = () => {
  const store = useAuthStore.getState();
  const user = store.user;
  if (user && "accessToken" in user) {
    return user;
  }
  return null;
};

/**
 * Deletes the current user from the authentication store.
 *
 * This function clears the user data from the authentication store, effectively logging the user out.
 */

export const deleteUser = () => {
  const store = useAuthStore.getState();
  store.clearUser();
};

/**
 * Checks whether the user is logged in by validating the token in the authentication store.
 *
 * This function checks if the user's token is valid, indicating whether the user is logged in or not.
 *
 * @returns {boolean} `true` if the user is logged in and the token is valid, `false` otherwise.
 */

export const isLoggedIn = () => {
  const store = useAuthStore.getState();
  return store.isTokenValid();
};
