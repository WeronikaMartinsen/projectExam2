import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

/**
 * Custom hook that provides access to the authentication context.
 *
 * This hook can be used to access the current user's authentication state
 * and any associated functions from the AuthContext. It ensures that the
 * hook is used within an `AuthProvider` context, otherwise it throws an error.
 *
 * @throws {Error} If `useAuth` is used outside of an `AuthProvider` context.
 * @returns {AuthContextType} The current authentication context value,
 * which typically includes user data, authentication state, and related methods.
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
