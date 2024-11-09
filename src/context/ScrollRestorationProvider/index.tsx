import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollRestorationProviderProps {
  children: React.ReactNode;
}

export const ScrollRestorationProvider: React.FC<
  ScrollRestorationProviderProps
> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const storedScrollPosition = sessionStorage.getItem(location.key);

    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      sessionStorage.setItem(location.key, window.scrollY.toString());
    };
  }, [location]);

  return <>{children}</>;
};
