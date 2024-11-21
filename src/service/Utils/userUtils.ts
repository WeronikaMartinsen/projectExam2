import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";
import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { useAuthStore } from "../Store/authStore";

export const setUser = (user: RegisterUserData | LoginResponse) => {
  const store = useAuthStore.getState();
  store.setUser(user);
};

export const getUser = () => {
  const store = useAuthStore.getState();
  const user = store.user;
  if (user && "accessToken" in user) {
    return user;
  }
  return null;
};

export const deleteUser = () => {
  const store = useAuthStore.getState();
  store.clearUser();
};

export const isLoggedIn = () => {
  const store = useAuthStore.getState();
  return store.isTokenValid();
};
