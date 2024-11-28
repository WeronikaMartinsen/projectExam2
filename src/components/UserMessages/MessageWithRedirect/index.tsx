// MessageWithRedirect.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MessageWithRedirectProps {
  message: React.ReactNode;
  redirectTo: string;
  buttonText: string;
  autoRedirect?: boolean;
  delay?: number;
}

const MessageWithRedirect: React.FC<MessageWithRedirectProps> = ({
  message,
  redirectTo,
  buttonText,
  autoRedirect = false,
  delay = 2000,
}) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState<number>(delay / 1000);

  useEffect(() => {
    if (autoRedirect) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate(redirectTo);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [autoRedirect, countdown, delay, navigate, redirectTo]);

  return (
    <div className="text-center p-4">
      <p className="mt-10 mb-10">{message}</p>
      {autoRedirect && countdown > 0 && (
        <p className="text-sm text-gray-600">Redirecting in {countdown}s...</p>
      )}
      <Link to={redirectTo}>
        <button
          type="button"
          className="bg-accent p-3 rounded font-semibold text-sm mt-4 text-primary transition-all duration-300 ease-in-out transform hover:bg-accent-dark hover:scale-102 hover:shadow-md"
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default MessageWithRedirect;
