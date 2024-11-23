import React, { useEffect } from "react";

interface ErrorMessageProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  duration,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 bg-danger text-white p-4 rounded-lg shadow-lg">
      {message}
    </div>
  );
};

export default ErrorMessage;
