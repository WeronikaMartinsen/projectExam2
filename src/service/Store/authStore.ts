import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegisterUserData } from "../ApiCalls/Interfaces/userData";
import { LoginResponse } from "../ApiCalls/Interfaces/loginResponse";

type User = RegisterUserData | LoginResponse | null;

interface AuthState {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  updateUser: (updatedFields: Partial<RegisterUserData>) => void;
  clearUser: () => void;
  isTokenValid: () => boolean;
}

const isLoginResponse = (user: User): user is LoginResponse => {
  return (user as LoginResponse)?.accessToken !== undefined;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => {
        const loggedIn = isLoginResponse(user) && !!user.accessToken;
        set({
          user,
          isLoggedIn: loggedIn,
        });
      },
      updateUser: (updatedFields) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updatedFields } });
        }
      },
      clearUser: () => {
        set({ user: null, isLoggedIn: false });
      },
      isTokenValid: () => {
        const user = get().user;
        if (isLoginResponse(user) && user.accessToken) {
          try {
            const tokenPayload = JSON.parse(
              atob(user.accessToken.split(".")[1])
            );
            return tokenPayload.exp * 1000 > Date.now();
          } catch {
            return false;
          }
        }
        return false;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
