import { storage } from "./storageUtils";
import { STORAGE_KEYS } from "../../Constants/storageKeys";
import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";

type UserType = RegisterUserData | LoginResponse;

export const setUser = (user: UserType) => {
  storage.set(STORAGE_KEYS.USER, user);
  if ("accessToken" in user) {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, user.accessToken);
  }
};

export const getUser = (): UserType | null => storage.get(STORAGE_KEYS.USER);

export const deleteUser = () => {
  storage.remove(STORAGE_KEYS.USER);
  storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
};

export const isLoggedIn = (): boolean => {
  const user = getUser();
  if (!user || !("accessToken" in user)) return false;

  try {
    const tokenPayload = JSON.parse(atob(user.accessToken.split(".")[1]));
    return tokenPayload.exp * 1000 > Date.now(); // Check if token has expired
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
