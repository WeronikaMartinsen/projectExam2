// SuccessMessage.tsx
import React from "react";

interface SuccessMessageProps {
  message: string;
  duration?: number;
  onClose?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  duration = 3000,
  onClose,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-4 right-4 p-4 bg-green-500 text-white rounded shadow-md">
      {message}
    </div>
  );
};

export default SuccessMessage;
